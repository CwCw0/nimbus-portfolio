export default function MarqueeStrip() {
  const words = ["DESIGN", "DEVELOP", "DEPLOY", "AUTOMATE", "SCALE"];

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden py-6 max-md:py-4 max-md:gap-1">
      {/* Top row — filled text, scrolls left */}
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap max-md:gap-6">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`filled-${i}`} className="flex items-center gap-12 max-md:gap-6">
            <span className="font-display text-[48px] tracking-[6px] text-[var(--color-accent)] opacity-20 max-md:text-[28px] max-md:tracking-[3px]">
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-30 text-sm">&#x25C6;</span>
          </div>
        ))}
      </div>

      {/* Bottom row — outlined/stroke text, scrolls right */}
      <div className="marquee-track-reverse flex items-center gap-12 whitespace-nowrap max-md:gap-6">
        {[...words, ...words, ...words, ...words].map((word, i) => (
          <div key={`outlined-${i}`} className="flex items-center gap-12 max-md:gap-6">
            <span
              className="font-display text-[48px] tracking-[6px] max-md:text-[28px] max-md:tracking-[3px]"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-accent)",
                opacity: 0.15,
              }}
            >
              {word}
            </span>
            <span className="text-[var(--color-accent)] opacity-20 text-sm">&#x25C6;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
