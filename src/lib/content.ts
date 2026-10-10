export const eventCategories = [
  "Dance",
  "Technology",
  "Pageant",
  "Performance",
  "Music",
] as const;

export type EventCategory = (typeof eventCategories)[number];

export type SpectraEvent = {
  slug: string;
  name: string;
  category: EventCategory;
  tagline: string;
  description: string;
  image: string;
  cardImage: string;
  accent: string;
  format: string;
  highlights: string[];
  registrationFee?: string;
  registrationNotes?: string[];
  registrationUrl?: string;
};

// Keep event information and the official registration form together so every
// card, detail page, and registration action uses the same source of truth.
export const site = {
  name: "Spectra’26",
  organizer: "CESS",
  date: "28–29 October 2026",
  venue: "Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar",
};

export const events: SpectraEvent[] = [
  {
    slug: "dance-arena",
    name: "Dance Arena",
    category: "Dance",
    tagline: "Bring the movement. Own the moment.",
    description:
      "A dynamic dance competition where movement, style, and stage presence take focus. Bring a routine that turns rhythm into a story and makes the stage your own.",
    image: "/images/events/dance-arena.svg",
    cardImage: "/images/posters/dance-arena.webp",
    accent: "#d69474",
    format: "Dance competition",
    highlights: [
      "A stage for dance styles and creative expression",
      "Movement, coordination, and performance",
      "Competition details to be announced",
    ],
  },
  {
    slug: "hackerwrath-3",
    name: "HackerWrath 3.0",
    category: "Technology",
    tagline: "Think sharper. Build beyond.",
    description:
      "A team coding challenge for curious builders. Work through a technical problem, test your ideas, and turn a clear line of thinking into a working solution.",
    image: "/images/events/hackerwrath-3.svg",
    cardImage: "/images/posters/hackerwrath-3.webp",
    accent: "#54b4a8",
    format: "Team technology challenge",
    highlights: [
      "Problem solving and collaborative building",
      "A challenge for curious, hands-on thinkers",
      "Challenge details and team information to be announced",
    ],
  },
  {
    slug: "mr-and-ms-spectra",
    name: "Mr. & Ms. Spectra",
    category: "Pageant",
    tagline: "Confidence. Character. Your moment.",
    description:
      "Welcome to the Spectra 3.0 Fashion Show. Show off your charisma, design sense, and runway presence in front of a live audience and panel of judges.",
    image: "/images/events/mr-and-ms-spectra.svg",
    cardImage: "/images/posters/mr-and-ms-spectra.webp",
    accent: "#d6a364",
    format: "Fashion show and personality showcase",
    highlights: [
      "Showcase your charisma, design sense, and runway presence",
      "Perform in front of a live audience and panel of judges",
    ],
    registrationFee: "₹100",
    registrationNotes: [
      "Complete all required fields in the form and submit your payment receipt to complete registration.",
    ],
    registrationUrl: "https://forms.gle/CKgrkWueSndfMiXt7",
  },
  {
    slug: "salsa-night",
    name: "Salsa Night",
    category: "Dance",
    tagline: "Meet us where rhythm takes over.",
    description:
      "A night to remember. Dress to impress, step under the dazzling lights, and lose yourself in an evening straight out of a dream. Bring your finest western attire, your best moves, and your favorite people for a magical night of rhythm, romance, and unforgettable memories on the dance floor.",
    image: "/images/events/salsa-night.svg",
    cardImage: "/images/posters/salsa-night.webp",
    accent: "#df7550",
    format: "Salsa night",
    highlights: [
      "An evening of rhythm, dancing, and celebration",
    ],
    registrationFee: "₹600 per participant",
    registrationNotes: ["Dress code: Western"],
    registrationUrl: "https://forms.gle/QvSuxTca5ZnZmccH8",
  },
  {
    slug: "spectra-got-talent",
    name: "Spectra Got Talent",
    category: "Performance",
    tagline: "Your stage. Your story. Your moment.",
    description:
      "Your talent. Your stage. Your moment to shine! Spectra Got Talent is the ultimate platform for showcasing raw talent, creativity, and unapologetic self-expression. Whether it’s acting, stand-up comedy, open mic, rap, poetry, mimicry, or any unique skill you’ve got, this is your chance to step into the spotlight and let your talent speak for itself. No filters, no limits—just pure talent, bold performances, and unforgettable moments. Bring your confidence, own the stage, and show everyone what you’re capable of. The spotlight is yours. Are you ready to unleash your talent?",
    image: "/images/events/spectra-got-talent.svg",
    cardImage: "/images/posters/spectra-got-talent.webp",
    accent: "#92a8d3",
    format: "Open talent showcase",
    highlights: [
      "Acting, stand-up comedy, open mic, rap, poetry, mimicry, and more",
      "Bring your confidence, own the stage, and express yourself",
    ],
    registrationFee: "₹100",
    registrationUrl: "https://forms.gle/BQCy9KPc5xZZN6Hq8",
  },
  {
    slug: "voice-of-spectra",
    name: "Voice of Spectra",
    category: "Music",
    tagline: "Every voice deserves its moment.",
    description:
      "Welcome to SPECTRA 3.0! Get ready to showcase your voice on stage and light up the cultural fest. Fill out the details below to register for the vocal competition. We can’t wait to see your performance!",
    image: "/images/events/voice-of-spectra.svg",
    cardImage: "/images/posters/voice-of-spectra.webp",
    accent: "#c86661",
    format: "Vocal performance",
    highlights: [
      "Maximum performance time: 3 minutes",
      "Reporting time and performance slots will be shared before the event",
    ],
    registrationFee: "₹100 per entry",
    registrationUrl: "https://forms.gle/i5EeNyQAkkEreJuB7",
  },
];

export function externalFormUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}
