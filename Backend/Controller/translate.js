import axios from 'axios';
import Conversation from '../models/Conversation.js';
import dotenv from "dotenv";
dotenv.config();


export const translatetext = async (req, res) => {

    const { sourceLanguage, targetLanguage, originalText } = req.body;

    if (!sourceLanguage || !targetLanguage || !originalText) {
        return res.status(400).json({
            message: "Please provide all required fields"
        })
    }
    try {

        const response = await axios.get(process.env.LIBRETRANSLATE_URL, {
            params: {
                q: originalText,
                langpair: `${sourceLanguage}|${targetLanguage}`,
            },
        });

        console.log("FULL RESPONSE:", JSON.stringify(response.data, null, 2));

        let translatedtext = response.data.responseData.translatedText;

        // Fallback logic: agar translation khaali hai ya original jaisa hi hai, matches array se better result dhoondo
        const isSameAsOriginal = translatedtext.trim().toLowerCase() === originalText.trim().toLowerCase();

        if (!translatedtext || translatedtext.trim() === "" || isSameAsOriginal) {
            const validMatch = response.data.matches.find(
                (m) => m.translation &&
                       m.translation.trim() !== "" &&
                       m.translation.trim().toLowerCase() !== originalText.trim().toLowerCase()
            );
            if (validMatch) {
                translatedtext = validMatch.translation;
                console.log("Fallback used, new translation:", translatedtext);
            }
        }

        console.log("Final Translated Text:", translatedtext);

        // save in db
        const conversation = await Conversation.create({
            sourcelanguage: sourceLanguage,
            targetlanguage: targetLanguage,
            originaltext: originalText,
            translatetext: translatedtext
        });
        console.log("mai yahan")

        res.status(200).json({
            originalText,
            translatetext: translatedtext,
            conversation
        });



    }
    catch (error) {
        console.log("Translation error:", error.message);
        res.status(500).json({ error: "Translation failed. Try again." });
    }
}

//history

export const gethistory = async (req, res) => {
    try {

        const history = await Conversation.find().sort({ createdAt: -1 }).limit(20);
        res.status(200).json({
            history
        })
    }
    catch (error) {
        res.status(500).json({ error: "Could not fetch history" });
    }
}