export interface PortfolioPhoto {
  id: number;
  /** Cloudinary (or any HTTPS) URL — paste yours in `src` below */
  src: string;
  title: string;
  description: string;
  /** Omit for images; set `"video"` for polaroid clips */
  type?: "image" | "video";
}

/** Polaroid shuffle pool — edit `src` (and captions) here only */
export const PHOTOS: PortfolioPhoto[] = [
  {
    id: 1,
    type: "image",
    src: "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_600,c_limit/v1780516051/WhatsApp_Image_2026-06-04_at_01.09.30_ambcsl.jpg",
    title: "this is me",
    description: "hey!!this is me",
  },
  {
    id: 2,
    type: "image",
    src: "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_600,c_limit/v1780516954/WhatsApp_Image_2026-06-04_at_01.09.31_qpykn2.jpg",
    title: "CodeCell family",
    description: "codecell family · KJSCE",
  },
  {
    id: 3,
    type: "image",
    src: "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_600,c_limit/v1780516247/IMG_9848_sej1ee.heic",
    title: "I code too lol",
    description: "i code too lol · 2025",
  },
  {
    id: 4,
    type: "image",
    src: "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_600,c_limit/v1780515968/WhatsApp_Image_2026-06-04_at_01.09.30_z75m6c.jpg",
    title: "Stage moment",
    description: "Overcame my stage fright · 2024",
  },
  {
    id: 5,
    type: "video",
    src: "https://res.cloudinary.com/dlejfav7z/video/upload/f_auto,q_auto,w_720,c_limit/v1780516059/WhatsApp_Video_2026-06-04_at_01.09.33_nesm4q.mp4",
    title: "Mango business",
    description: "Side quest: mango season — family hustle · 2026",
  },
  {
    id: 6,
    type: "image",
    src: "https://res.cloudinary.com/dlejfav7z/image/upload/f_auto,q_auto,w_600,c_limit/v1780516042/WhatsApp_Image_2026-06-04_at_01.09.31_soalhy.jpg",
    title: "Strawberry wholesale",
    description: "strawberry wholesale trading · 2026",
  },
];

/** Fixed click order for the polaroid album */
export const POLAROID_ORDER = [1, 4, 2, 6, 3, 5] as const;

export const POLAROID_STEP_COUNT = POLAROID_ORDER.length;

export function getPhotoById(id: number): PortfolioPhoto {
  return PHOTOS.find((p) => p.id === id) ?? PHOTOS[0];
}

export function getPolaroidPhotoAtStep(step: number): PortfolioPhoto {
  const id = POLAROID_ORDER[step % POLAROID_ORDER.length];
  return getPhotoById(id);
}

export function nextPolaroidStep(step: number): number {
  return (step + 1) % POLAROID_ORDER.length;
}
