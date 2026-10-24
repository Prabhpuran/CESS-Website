export type EventCategory =
  | "Dance"
  | "Technology"
  | "Pageant"
  | "Performance"
  | "Music";

export type SpectraEvent = {
  slug: string;
  name: string;
  category: EventCategory;
  tagline: string;
  description: string;
  date?: string;
  venue?: string;
  image: string;
  cardImage: string;
  accent: string;
  format: string;
  highlights: string[];
  registrationFee?: string;
  registrationNotes?: string[];
  registrationUrl?: string;
};

// Keep event information and the official registration link together so every
// card, detail page, and registration action uses the same source of truth.
export const site = {
  name: "Spectra’26",
  organizer: "CESS",
  date: "28–29 October 2026",
  venue: "Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar",
};

export const programSchedule = [
  {
    date: "28 October 2026",
    events: ["Voice of Spectra", "Dance Arena", "Spectra Got Latent", "Salsa Night"],
  },
  {
    date: "29 October 2026",
    events: ["Mr. & Ms. Spectra", "Music Band", "Prize Distribution", "DJ"],
  },
] as const;

export const events: SpectraEvent[] = [
  {
    slug: "dance-arena",
    name: "Dance Arena",
    category: "Dance",
    tagline: "Bring the movement. Own the moment.",
    description:
      "Welcome to SPECTRA 3.0! Get ready to showcase your moves on stage and light up the cultural fest. Fill out the details below to complete your registration for the dance competition.",
    date: "28 October 2026",
    image: "/images/events/dance-arena.svg",
    cardImage: "/images/posters/dance-arena.webp",
    accent: "#d69474",
    format: "Dance competition",
    highlights: [
      "Maximum time: 3 minutes per performance",
      "Showcase your moves on the Spectra stage",
    ],
    registrationFee: "₹70",
    registrationNotes: [
      "Audio tracks will be collected from participants later.",
      "Reporting time and slot schedules will be shared before the event.",
      "Groups with more than four participants can register offline at the desk in front of the library or contact CESS using the phone numbers on the Contact page.",
    ],
    registrationUrl: "https://forms.gle/t2n7Hethe25oM4Pg9",
  },
  {
    slug: "hackerwrath-3",
    name: "HackerWrath 3.0",
    category: "Technology",
    tagline: "Think. Code. Innovate. Conquer.",
    description:
      "HackerWrath 3.0 is a 24-hour hackathon organised by the Computer Engineering Students Society (CESS), Department of Computer Engineering and Technology, Guru Nanak Dev University, Amritsar. Bringing together passionate developers, creative thinkers, and tech enthusiasts, HackerWrath challenges participants to innovate, collaborate, and transform ideas into impactful solutions. With a prize pool of ₹60,000+, get ready to push your limits, solve real-world problems, and experience the thrill of competitive coding.",
    registrationFee: "₹350",
    date: "22–23 October 2026",
    venue: "Guru Nanak Dev University, Amritsar",
    image: "/images/events/hackerwrath-3.svg",
    cardImage: "/images/posters/hackerwrath-3.webp",
    accent: "#54b4a8",
    format: "24-hour hackathon",
    highlights: [
      "Prize pool: ₹60,000+",
      "Innovate, collaborate, and build impactful solutions",
      "Organised by CESS, Department of Computer Engineering and Technology",
    ],
    registrationUrl:
      "https://unstop.com/hackathons/hackerwrath-30-guru-nanak-dev-university-gndu-amritsar-1764531",
  },
  {
    slug: "mr-and-ms-spectra",
    name: "Mr. & Ms. Spectra",
    category: "Pageant",
    tagline: "Confidence. Character. Your moment.",
    description:
      "Welcome to the Spectra 3.0 Fashion Show. Show off your charisma, design sense, and runway presence in front of a live audience and panel of judges.",
    date: "29 October 2026",
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
      "Participants must bring their own dresses.",
      "Hair and makeup will be provided.",
      "Find further details in the WhatsApp group linked in the Google Form.",
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
    date: "28 October 2026",
    image: "/images/events/salsa-night.svg",
    cardImage: "/images/posters/salsa-night.webp",
    accent: "#df7550",
    format: "Salsa night",
    highlights: [
      "Bring a partner of your choice; partners can be any gender combination, including two women",
    ],
    registrationFee: "₹150 for two people",
    registrationNotes: ["Dress code: Western"],
    registrationUrl: "https://forms.gle/QvSuxTca5ZnZmccH8",
  },
  {
    slug: "spectra-got-latent",
    name: "Spectra Got Latent",
    category: "Performance",
    tagline: "Your stage. Your story. Your moment.",
    description:
      "Your talent. Your stage. Your moment to shine! Spectra Got Latent is the ultimate platform for showcasing raw talent, creativity, and unapologetic self-expression. Whether it’s acting, stand-up comedy, open mic, rap, poetry, mimicry, or any unique skill you’ve got, this is your chance to step into the spotlight and let your talent speak for itself. No filters, no limits—just pure talent, bold performances, and unforgettable moments. Bring your confidence, own the stage, and show everyone what you’re capable of. The spotlight is yours. Are you ready to unleash your talent?",
    date: "28 October 2026",
    image: "/images/events/spectra-got-latent.svg",
    cardImage: "/images/posters/spectra-got-latent.webp",
    accent: "#92a8d3",
    format: "Open talent showcase",
    highlights: [
      "Acting, stand-up comedy, open mic, rap, poetry, mimicry, and more",
      "Bring your confidence, own the stage, and express yourself",
    ],
    registrationFee: "₹70",
    registrationUrl: "https://forms.gle/BQCy9KPc5xZZN6Hq8",
  },
  {
    slug: "voice-of-spectra",
    name: "Voice of Spectra",
    category: "Music",
    tagline: "Every voice deserves its moment.",
    description:
      "Welcome to SPECTRA 3.0! Get ready to showcase your voice on stage and light up the cultural fest. Fill out the details below to register for the vocal competition. We can’t wait to see your performance!",
    date: "28 October 2026",
    image: "/images/events/voice-of-spectra.svg",
    cardImage: "/images/posters/voice-of-spectra.webp",
    accent: "#c86661",
    format: "Vocal performance",
    highlights: [
      "Maximum performance time: 3 minutes",
      "Reporting time and performance slots will be shared before the event",
    ],
    registrationFee: "₹70",
    registrationUrl: "https://forms.gle/i5EeNyQAkkEreJuB7",
    registrationNotes: [
      "Groups with more than four participants can register offline at the desk in front of the library or contact CESS using the phone numbers on the Contact page.",
    ],
  },
];

export function externalFormUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "upi:"
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
