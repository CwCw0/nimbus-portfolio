export default function MarqueeStrip() {
  const words = ["DESIGN", "DEVELOP", "DEPLOY", "AUTOMATE", "SCALE"];

  return (
    <div className="flex h-[100px] w-full items-center overflow-hidden bg-[var(--color-bg-primary)] max-md:h-[60px]">
      <div className="marquee-track flex items-center gap-[60px] whitespace-nowrap max-md:gap-[30px]">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center gap-[60px] max-md:gap-[30px]">
            <span className="font-poppins text-[64px] font-extralight tracking-[8px] text-[#1A1820] max-md:text-[32px] max-md:tracking-[4px]">
              {word}
            </span>
            <div className="h-2 w-2 rounded-full bg-[#7C5CFC30] max-md:h-1.5 max-md:w-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}
