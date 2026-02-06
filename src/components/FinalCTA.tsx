import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="snap-section relative h-[500px] w-full bg-[var(--color-bg-primary)] max-md:h-auto max-md:py-16">
      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute left-[420px] top-[50px] h-[400px] w-[600px] rounded-full opacity-80 max-md:hidden"
        style={{
          background:
            "radial-gradient(circle, #7C5CFC12 0%, transparent 100%)",
        }}
      />
      {/* Grid lines */}
      <div className="absolute left-[360px] top-0 h-[500px] w-px bg-[var(--color-grid)] opacity-15 max-md:hidden" />
      <div className="absolute left-[720px] top-0 h-[500px] w-px bg-[var(--color-grid)] opacity-15 max-md:hidden" />
      <div className="absolute left-[1080px] top-0 h-[500px] w-px bg-[var(--color-grid)] opacity-15 max-md:hidden" />
      {/* Rings */}
      <div className="animate-float absolute left-[100px] top-[150px] h-[180px] w-[180px] rounded-full border border-[#7C5CFC10] opacity-50 max-md:hidden" />
      <div className="animate-float absolute left-[1180px] top-[280px] h-[120px] w-[120px] rounded-full border border-[#7C5CFC0C] opacity-40 max-md:hidden" style={{ animationDelay: "1s" }} />
      {/* Dots */}
      <div className="absolute left-[190px] top-[148px] h-1.5 w-1.5 rounded-full bg-[#7C5CFC50] max-md:hidden" />
      <div className="absolute left-[1300px] top-[278px] h-1 w-1 rounded-full bg-[#7C5CFC40] max-md:hidden" />
      {/* Crosses */}
      <span className="absolute left-[365px] top-[40px] font-poppins text-sm font-extralight text-[#7C5CFC18] max-md:hidden">
        +
      </span>
      <span className="absolute left-[1085px] top-[440px] font-poppins text-sm font-extralight text-[#7C5CFC18] max-md:hidden">
        +
      </span>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-[1000px] flex-col items-center gap-8 pt-[100px] max-md:w-full max-md:px-6 max-md:pt-0">
        <h2 className="text-center font-space-grotesk text-[52px] font-bold leading-[1.1] tracking-[-2px] text-white max-md:text-[32px]">
          Ready to build
          <br />
          something remarkable?
        </h2>
        <p className="w-[600px] text-center font-inter text-lg leading-[1.6] text-[var(--color-text-dim)] max-md:w-full">
          Whether it&apos;s a single landing page or a long-term contract —
          <br />
          let&apos;s talk about what Nimbus can do for you.
        </p>
        <div className="flex items-center gap-4 max-md:flex-col max-md:w-full">
          <a
            href="#contact"
            className="flex items-center gap-2.5 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] px-9 py-[18px] font-inter text-base font-semibold text-[#0A0A0B] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_#7C5CFC20] max-md:w-full max-md:justify-center"
          >
            Start a Project
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </a>
          <a
            href="mailto:hello@nimbus.studio"
            className="flex items-center gap-2.5 border border-[var(--color-border-light)] px-9 py-[18px] font-inter text-sm tracking-[0.5px] text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent-border)] hover:text-white max-md:w-full max-md:justify-center"
          >
            hello@nimbus.studio
          </a>
        </div>
      </div>
    </section>
  );
}
