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
  registrationUrl?: string;
};

// Programme information can be refined as the event team confirms details.
// Add each event's Google Form URL below to show its registration action.
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
      "A celebration of personality, confidence, and the way you carry yourself. Bring your point of view to a stage made for memorable presence.",
    image: "/images/events/mr-and-ms-spectra.svg",
    cardImage: "/images/posters/mr-and-ms-spectra.webp",
    accent: "#d6a364",
    format: "Personality showcase",
    highlights: [
      "A spotlight on confidence and individuality",
      "Personality and stage presence",
      "Rounds and participation details to be announced",
    ],
  },
  {
    slug: "salsa-night",
    name: "Salsa Night",
    category: "Dance",
    tagline: "Meet us where rhythm takes over.",
    description:
      "An evening of salsa, movement, and shared rhythm. Let the music lead, bring the energy to the floor, and make every step part of the celebration.",
    image: "/images/events/salsa-night.svg",
    cardImage: "/images/posters/salsa-night.webp",
    accent: "#df7550",
    format: "Dance performance",
    highlights: [
      "A celebration of salsa and Latin dance",
      "Partner movement and musical connection",
      "Participation information to be announced",
    ],
  },
  {
    slug: "spectra-got-talent",
    name: "Spectra Got Talent",
    category: "Performance",
    tagline: "Your stage. Your story. Your moment.",
    description:
      "A festival stage for the performers who make people look, listen, and remember. Share your craft, bring your own energy, and make the moment yours.",
    image: "/images/events/spectra-got-talent.svg",
    cardImage: "/images/posters/spectra-got-talent.webp",
    accent: "#92a8d3",
    format: "Talent showcase",
    highlights: [
      "A stage for a wide range of talents",
      "Individual performance and stage presence",
      "Categories and guidelines to be announced",
    ],
  },
  {
    slug: "voice-of-spectra",
    name: "Voice of Spectra",
    category: "Music",
    tagline: "Every voice deserves its moment.",
    description:
      "A vocal showcase celebrating distinctive voices and musical interpretation. Bring a song to the stage and make every note count.",
    image: "/images/events/voice-of-spectra.svg",
    cardImage: "/images/posters/voice-of-spectra.webp",
    accent: "#c86661",
    format: "Vocal showcase",
    highlights: [
      "A platform for emerging singers",
      "Vocal performance across musical styles",
      "Performance categories and guidelines to be announced",
    ],
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
