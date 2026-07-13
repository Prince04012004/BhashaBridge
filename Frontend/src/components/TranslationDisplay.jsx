function TranslationDisplay({ originalText, translatedText }) {
  return (
    <div className="mt-5 space-y-2.5">
      <div className="bg-[#1C1023] border border-[#F2A93B]/10 rounded-xl p-4">
        <p className="text-[10px] font-semibold text-[#9C8AA5] uppercase tracking-wider mb-1">Original</p>
        <p className="text-[#F5EFE6]/90 text-sm min-h-[1.25rem]">{originalText || "—"}</p>
      </div>

      <div className="bg-[#2DD4A8]/10 border border-[#2DD4A8]/25 rounded-xl p-4">
        <p className="text-[10px] font-semibold text-[#2DD4A8] uppercase tracking-wider mb-1">Translated</p>
        <p className="text-[#F5EFE6] font-medium text-sm min-h-[1.25rem]">{translatedText || "—"}</p>
      </div>
    </div>
  );
}

export default TranslationDisplay;