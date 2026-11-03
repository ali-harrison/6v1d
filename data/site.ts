// Placeholder copy for the concept — swap freely.

export const EMAIL = "hello@6v1d.studio";

export const NAV = [
  { id: "voices", label: "Voices" },
  { id: "approach", label: "Approach" },
  { id: "words", label: "Words" },
  { id: "principles", label: "Principles" },
  { id: "contact", label: "Contact" },
];

// One colour per voice for the accordion panels (bg + text that reads on it)
export const VOICE_TONES = [
  { bg: "bg-charcoal", text: "text-lilac" },
  { bg: "bg-forest", text: "text-lilac" },
  { bg: "bg-orchid", text: "text-charcoal" },
  { bg: "bg-lilac", text: "text-charcoal" },
  { bg: "bg-khaki", text: "text-charcoal" },
  { bg: "bg-smoke", text: "text-lilac" },
] as const;

export const APPROACH = [
  {
    title: "Collect the signal",
    body: "Notice what keeps pulling you back: a verse, a silhouette, a stance. Keep a record of it before you know why it matters.",
    icon: "signal",
  },
  {
    title: "Find the principle",
    body: "Look past the surface style to the decision underneath it. That decision is the part worth borrowing, not the look.",
    icon: "lens",
  },
  {
    title: "Make it your own",
    body: "Run the principle through your own place, people and context until it comes out as something only you could have made.",
    icon: "converge",
  },
] as const;

export const PRINCIPLES = [
  {
    title: "Find your voice",
    body: "Use it. Don't imitate. Taste is what you choose to keep, and the work gets sharper every time you leave something out.",
    from: "After Virgil Abloh",
    icon: "wave",
  },
  {
    title: "Keep moving",
    body: "Momentum beats polish. Ship it, learn from it, ship the next one. Standing still is how the dirt gets thrown on you.",
    from: "After Pharrell Williams",
    icon: "arrow",
  },
  {
    title: "Dare to hope",
    body: "Make work that leaves people a little better than it found them. Optimism is a design decision too.",
    from: "After Michael Jackson",
    icon: "spark",
  },
  {
    title: "Protect what matters",
    body: "Know where the work comes from and carry it with care. Some things are not raw material; they are responsibility.",
    from: "After Tame Iti",
    icon: "shield",
  },
] as const;
