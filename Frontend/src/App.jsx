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
  const [isDark, setIsDark] = useState(true); // ← naya state, dark default hai

  const handleTranslate = async () => {
    if (!originalText.trim()) {
      alert("Pehle kuch text bol ya type kar!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
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

  // Theme ke hisaab se colors
  const theme = isDark
    ? {
        bg: "bg-[#1C1023]",
        text: "text-[#F5EFE6]",
        card: "bg-[#271730]",
        border: "border-[#F2A93B]/10",
        muted: "text-[#9C8AA5]",
      }
    : {
        bg: "bg-[#FDF6EC]",
        text: "text-[#2B1B14]",
        card: "bg-white",
        border: "border-[#F2A93B]/30",
        muted: "text-[#8A7563]",
      };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} relative overflow-hidden transition-colors duration-300`}>
      <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-[#F2A93B]/10 rounded-full blur-[130px]"></div>
      <div className="absolute bottom-[-15%] right-[5%] w-[450px] h-[450px] bg-[#2DD4A8]/10 rounded-full blur-[130px]"></div>

      <div className="relative max-w-2xl mx-auto px-4 py-10 sm:py-16">

        {/* Top pill + Theme Toggle */}
        <div className="flex justify-center items-center gap-3 mb-10">
          <div className={`flex items-center gap-2 ${theme.card} border ${theme.border} rounded-full px-4 py-2 text-sm ${theme.muted}`}>
            <span className="w-2 h-2 rounded-full bg-[#2DD4A8] animate-pulse"></span>
            Speak any language, understand instantly
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`${theme.card} border ${theme.border} rounded-full w-9 h-9 flex items-center justify-center text-lg`}
            title="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight ${theme.text}`}>
            Bhasha <span className="text-[#F2A93B]">Bridge</span>
          </h1>
          <p className={`${theme.muted} mt-3 text-base sm:text-lg max-w-md mx-auto`}>
            Talk to anyone, anywhere. Real-time translation built for travelers.
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["🎙️ Voice Input", "🌍 16+ Languages", "⚡ Instant Translate", "🕘 Saved History"].map((f) => (
            <span
              key={f}
              className={`text-xs sm:text-sm ${theme.card} border ${theme.border} ${theme.muted} rounded-full px-3 py-1.5`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Main card */}
        <div className={`${theme.card} border ${theme.border} rounded-2xl p-5 sm:p-7 shadow-2xl shadow-black/20`}>

          <LanguageSelector
            sourceLanguage={sourceLanguage}
            setSourceLanguage={setSourceLanguage}
            targetLanguage={targetLanguage}
            setTargetLanguage={setTargetLanguage}
            isDark={isDark}
          />

          <MicInput
            sourceLanguage={sourceLanguage}
            originalText={originalText}
            setOriginalText={setOriginalText}
            isDark={isDark}
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
            targetLanguage={targetLanguage}
            isDark={isDark}
          />
        </div>

        <p className={`text-center text-xs ${theme.muted}/70 mt-8`}>
          Built with MERN · Powered by free translation APIs
        </p>
      </div>
    </div>
  );
}

export default App;