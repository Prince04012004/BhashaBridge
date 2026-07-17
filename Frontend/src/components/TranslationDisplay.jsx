function TranslationDisplay({ originalText, translatedText, targetLanguage }) {

  const localeMap = {
    es: "es-ES", fr: "fr-FR", ja: "ja-JP", ko: "ko-KR", en: "en-US",
    bn: "bn-IN", ta: "ta-IN", te: "te-IN", ar: "ar-SA", zh: "zh-CN",
    ru: "ru-RU", pt: "pt-PT", de: "de-DE", hi: "hi-IN",
  };

  const speakText = () => {
    if (!translatedText) return;

    // Purani koi speech chal rahi ho toh pehle cancel kar
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(translatedText);
    const targetLocale = localeMap[targetLanguage] || "en-US";
    utterance.lang = targetLocale;
    utterance.rate = 0.9;

    // Available voices mein se sahi language wali voice dhoondo
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang === targetLocale) 
                        || voices.find((v) => v.lang.startsWith(targetLanguage));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    } else {
      console.log(`Koi voice nahi mili ${targetLocale} ke liye, default use ho rahi hai`);
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-5 space-y-2.5">
      <div className="bg-[#1C1023] border border-[#F2A93B]/10 rounded-xl p-4">
        <p className="text-[10px] font-semibold text-[#9C8AA5] uppercase tracking-wider mb-1">Original</p>
        <p className="text-[#F5EFE6]/90 text-sm min-h-[1.25rem]">{originalText || "—"}</p>
      </div>

      <div className="bg-[#2DD4A8]/10 border border-[#2DD4A8]/25 rounded-xl p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-semibold text-[#2DD4A8] uppercase tracking-wider">Translated</p>
          {translatedText && (
            <button
              onClick={speakText}
              className="text-[#2DD4A8] hover:text-[#25b892] transition-colors text-sm"
              title="Sun (Listen)"
            >
              🔊
            </button>
          )}
        </div>
        <p className="text-[#F5EFE6] font-medium text-sm min-h-[1.25rem]">{translatedText || "—"}</p>
      </div>
    </div>
  );
}

export default TranslationDisplay;