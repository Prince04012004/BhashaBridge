import { useState } from "react";
import axios from "axios";
import LanguageSelector from "./components/LanguageSelector";
import MicInput from "./components/MicInput";
import TranslationDisplay from "./components/TranslationDisplay";

function App() {
  const [sourceLanguage, setSourceLanguage] = useState("es");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!originalText.trim()) {
      alert("Pehle kuch text bol ya type kar!");
      return;
    }
    setLoading(true);
    try {
      // ⚡ Yahan base URL ke aage endpoint (/api/translate) jod diya hai
      const response = await axios.post("https://bhashabridge-law0.onrender.com/api/translate", {
        originalText,
        sourceLanguage,
        targetLanguage,
      });
      setTranslatedText(response.data.translatetext);
    } catch (error) {
      console.log("Translation error:", error);
      alert("Translation failed, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1023] text-[#F5EFE6] relative overflow-hidden">
      <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-[#F2A93B]/10 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[-15%] right-[5%] w-[450px] h-[450px] bg-[#2DD4A8]/10 rounded-full blur-[130px]"></div>

      <div className="relative max-w-2xl mx-auto px-4 py-10 sm:py-16">

        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 bg-[#271730] border border-[#F2A93B]/20 rounded-full px-4 py-2 text-sm text-[#9C8AA5]">
            <span className="w-2 h-2 rounded-full bg-[#2DD4A8] animate-pulse"></span>
            Speak any language, understand instantly
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#F5EFE6]">
            Bhasha <span className="text-[#F2A93B]">Bridge</span>
          </h1>
          <p className="text-[#9C8AA5] mt-3 text-base sm:text-lg max-w-md mx-auto">
            Talk to anyone, anywhere. Real-time translation built for travelers.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["🎙️ Voice Input", "🌍 14+ Languages", "⚡ Instant Translate", "🕘 Saved History"].map((f) => (
            <span
              key={f}
              className="text-xs sm:text-sm bg-[#271730] border border-[#F2A93B]/15 text-[#9C8AA5] rounded-full px-3 py-1.5"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="bg-[#271730] border border-[#F2A93B]/10 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/40">

          <LanguageSelector
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
          />

          <MicInput
            sourceLanguage={sourceLanguage}
            originalText={originalText}
            setOriginalText={setOriginalText}
          />

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full mt-4 bg-[#F2A93B] hover:bg-[#e2992b] disabled:opacity-50 text-[#1C1023] font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-[#1C1023] border-t-transparent rounded-full"></span>
                Translating...
              </>
            ) : (
              "Translate →"
            )}
          </button>

          <TranslationDisplay
            originalText={originalText}
            translatedText={translatedText}
          />
        </div>

        <p className="text-center text-xs text-[#9C8AA5]/70 mt-8">
          Built with MERN · Powered by free translation APIs
        </p>
      </div>
    </div>
  );
}

export default App;