import { useState } from "react";

const localeMap = {
  es: "es-ES", fr: "fr-FR", ja: "ja-JP", ko: "ko-KR", en: "en-US",
  bn: "bn-IN", ta: "ta-IN", te: "te-IN", ar: "ar-SA", zh: "zh-CN",
  ru: "ru-RU", pt: "pt-PT", de: "de-DE", hi: "hi-IN",
  pa: "pa-IN",
  mr: "mr-IN",   // ← naya add kiya, Marathi ke liye full support hai
};

function MicInput({ sourceLanguage, originalText, setOriginalText }) {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Ye browser Speech Recognition support nahi karta. Chrome use kar.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = localeMap[sourceLanguage] || "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e) => setOriginalText(e.results[0][0].transcript);
    recognition.onerror = (e) => {
      console.log("Speech recognition error:", e.error);
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#9C8AA5] mb-1.5">Say or type something</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type kar ya mic se bol..."
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          className="flex-1 bg-[#1C1023] border border-[#F2A93B]/15 text-[#F5EFE6] placeholder-[#9C8AA5]/60 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-transparent"
        />
        <button
          onClick={startRecording}
          className={`w-11 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
            isRecording
              ? "bg-[#e05252] animate-pulse"
              : "bg-[#1C1023] border border-[#F2A93B]/15 hover:border-[#F2A93B]/40"
          }`}
        >
          {isRecording ? "🎙️" : "🎤"}
        </button>
      </div>
      {isRecording && <p className="text-xs text-[#e05252] mt-1.5">Listening...</p>}
    </div>
  );
}

export default MicInput;