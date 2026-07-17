const languages = [
  { code: "en", name: "English" }, { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" }, { code: "fr", name: "French" },
  { code: "ja", name: "Japanese" }, { code: "ko", name: "Korean" },
  { code: "bn", name: "Bengali" }, { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" }, { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" }, { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" }, { code: "de", name: "German" },
  { code: "pa", name: "Punjabi" },
  { code: "bho", name: "Bhojpuri" },
  { code: "raj", name: "Rajasthani" },
  { code: "mr", name: "Marathi" },   // ← naya add kiya
];

function LanguageSelector({ sourceLanguage, setSourceLanguage, targetLanguage, setTargetLanguage }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1">
        <label className="block text-xs font-medium text-[#9C8AA5] mb-1.5">They speak</label>
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="w-full bg-[#1C1023] border border-[#F2A93B]/15 text-[#F5EFE6] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-transparent"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code} className="bg-[#271730]">{l.name}</option>
          ))}
        </select>
      </div>

      <div className="pt-5 text-[#2DD4A8]">→</div>

      <div className="flex-1">
        <label className="block text-xs font-medium text-[#9C8AA5] mb-1.5">You understand</label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full bg-[#1C1023] border border-[#F2A93B]/15 text-[#F5EFE6] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]/50 focus:border-transparent"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code} className="bg-[#271730]">{l.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;