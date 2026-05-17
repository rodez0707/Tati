/** Represents a single destination/section in the landing page */
export interface Destination {
  /** Unique identifier */
  id: string;
  /** Full-screen hero background image path */
  heroImage: string;
  /** Optional CSS object-position for heroImage (e.g. 'right center') */
  heroPosition?: string;
  /** Main title displayed in uppercase */
  title: string;
  /** Short description paragraph */
  description: string;
  /** Array of image paths for the popular cards carousel */
  cards: CardItem[];
}

/** Represents a card in the popular carousel */
export interface CardItem {
  /** Unique identifier */
  id: string;
  /** Card image path */
  image: string;
  /** Optional CSS object-position for the image (e.g. 'right') */
  objectPosition?: string;
  /** Card label/name */
  label: string;
}

/** Represents a collection of moments/destinations forming an album */
export interface Album {
  /** Unique identifier */
  id: string;
  /** Display label in the navbar */
  label: string;
  /** Specific destinations/moments inside this album */
  destinations: Destination[];
}
