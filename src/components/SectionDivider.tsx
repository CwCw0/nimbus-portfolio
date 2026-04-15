"use client";

export default function SectionDivider({
  from,
  to,
  className = "h-[8rem] md:h-[15rem]",
}: {
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}
