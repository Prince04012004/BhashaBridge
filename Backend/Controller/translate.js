import axios from 'axios';
import Conversation from '../models/Conversation.js';
import dotenv from "dotenv";
dotenv.config();

const languageNames = {
  en: "English", hi: "Hindi", es: "Spanish", fr: "French",
  ja: "Japanese", ko: "Korean", bn: "Bengali", ta: "Tamil",
  te: "Telugu", ar: "Arabic", zh: "Chinese", ru: "Russian",
  pt: "Portuguese", de: "German",
};

export const translatetext = async (req, res) => {

    const { sourceLanguage, targetLanguage, originalText } = req.body;

    if (!sourceLanguage || !targetLanguage || !originalText) {
        return res.status(400).json({
            message: "Please provide all required fields"
        })
    }
    try {
        const sourceLangName = languageNames[sourceLanguage] || sourceLanguage;
        const targetLangName = languageNames[targetLanguage] || targetLanguage;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Translate the following text from ${sourceLangName} to ${targetLangName}. Only return the translated text, nothing else, no explanations, no quotes:\n\n${originalText}`
                            }
                        ]
                    }
                ]
            }
        );

        console.log("FULL GEMINI RESPONSE:", JSON.stringify(response.data, null, 2));

        const translatedtext = response.data.candidates[0].content.parts[0].text.trim();

        console.log("Final Translated Text:", translatedtext);

        const conversation = await Conversation.create({
            sourcelanguage: sourceLanguage,
            targetlanguage: targetLanguage,
            originaltext: originalText,
            translatetext: translatedtext
        });

        res.status(200).json({
            originalText,
            translatetext: translatedtext,
            conversation
        });

    }
    catch (error) {
        console.log("Translation error:", error.response?.data || error.message);
        res.status(500).json({ error: "Translation failed. Try again." });
    }
}

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