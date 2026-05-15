export interface ProcessStep {
  n: string;
  kicker: string;
  title: string;
  body: string;
}

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    kicker: '48hr turnaround · 1 call · No questionnaire',
    title: 'Five questions, not fifty.',
    body: "I send you 5 targeted questions about your business, your customers, and what success looks like. We do one 30-minute call. You leave knowing exactly what you're getting, what it costs, and when it ships.",
  },
  {
    n: '02',
    kicker: 'Weekly builds · Live previews · Real feedback',
    title: 'You see it every week.',
    body: "I design and build in the open. Every Friday you get a live link to the current state, not a PDF mockup. You see real progress every Friday. No surprises.",
  },
  {
    n: '03',
    kicker: 'Full deploy · 30-day support · No handoff drama',
    title: 'It ships. Then I stay.',
    body: "Launch day is a deploy, not a goodbye. I handle hosting, domain, and analytics setup. Your system goes live. Your customers can find you, buy from you, and reach you — all from one place.",
  },
];
