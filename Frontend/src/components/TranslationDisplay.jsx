import { useState } from "react";

function TranslationDisplay({ originalText, translatedText, targetLanguage, isDark }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const localeMap = {
    es: "es-ES", fr: "fr-FR", ja: "ja-JP", ko: "ko-KR", en: "en-US",
    bn: "bn-IN", ta: "ta-IN", te: "te-IN", ar: "ar-SA", zh: "zh-CN",
    ru: "ru-RU", pt: "pt-PT", de: "de-DE", hi: "hi-IN", pa: "pa-IN", mr: "mr-IN",
  };

  const speakText = () => {
    if (!translatedText) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translatedText);
    const targetLocale = localeMap[targetLanguage] || "en-US";
    utterance.lang = targetLocale;
    utterance.rate = 0.9;      // thoda slow - samajhna easy rahe
    utterance.pitch = 1;       // 0 (deep) se 2 (high) tak - 1 natural hai
    utterance.volume = 1;      // full volume

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang === targetLocale)
                        || voices.find((v) => v.lang.startsWith(targetLanguage));
    if (matchingVoice) utterance.voice = matchingVoice;
    window.speechSynthesis.speak(utterance);
  };

  const cardBg = isDark ? "bg-[#1C1023]" : "bg-[#FDF6EC]";
  const cardBorder = isDark ? "border-[#F2A93B]/10" : "border-[#F2A93B]/30";
  const textColor = isDark ? "text-[#F5EFE6]/90" : "text-[#2B1B14]";
  const labelColor = isDark ? "text-[#9C8AA5]" : "text-[#8A7563]";

  return (
    <>
      <div className="mt-5 space-y-2.5">
        <div className={`${cardBg} border ${cardBorder} rounded-xl p-4`}>
          <p className={`text-[10px] font-semibold ${labelColor} uppercase tracking-wider mb-1`}>Original</p>
          <p className={`${textColor} text-sm min-h-[1.25rem]`}>{originalText || "—"}</p>
        </div>

        <div
          onClick={() => translatedText && setIsExpanded(true)}
          className={`bg-[#2DD4A8]/10 border border-[#2DD4A8]/25 rounded-xl p-4 ${translatedText ? "cursor-pointer hover:bg-[#2DD4A8]/15" : ""} transition-colors`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-semibold text-[#2DD4A8] uppercase tracking-wider">
              Translated {translatedText && <span className="normal-case text-[9px] opacity-60">(tap to enlarge)</span>}
            </p>
            {translatedText && (
              <button
                onClick={(e) => { e.stopPropagation(); speakText(); }}
                className="text-[#2DD4A8] hover:text-[#25b892] transition-colors text-sm"
                title="Sun (Listen)"
              >
                🔊
              </button>
            )}
          </div>
          <p className={`${isDark ? "text-[#F5EFE6]" : "text-[#2B1B14]"} font-medium text-sm min-h-[1.25rem]`}>
            {translatedText || "—"}
          </p>
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${isDark ? "bg-[#271730]" : "bg-white"} rounded-2xl p-8 max-w-lg w-full shadow-2xl relative`}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className={`absolute top-4 right-4 ${isDark ? "text-[#9C8AA5]" : "text-[#8A7563]"} hover:text-[#F2A93B] text-xl`}
            >
              ✕
            </button>
            <p className="text-[10px] font-semibold text-[#2DD4A8] uppercase tracking-wider mb-3">Translated</p>
            <p className={`${isDark ? "text-[#F5EFE6]" : "text-[#2B1B14]"} text-2xl font-medium leading-relaxed`}>
              {translatedText}
            </p>
            <button
              onClick={speakText}
              className="mt-6 flex items-center gap-2 bg-[#F2A93B] text-[#1C1023] px-4 py-2 rounded-xl font-medium hover:bg-[#e2992b] transition-colors"
            >
              🔊 Listen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TranslationDisplay;