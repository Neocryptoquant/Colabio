export type ProjectCategory = 'DeFi' | 'NFT' | 'Social' | 'Education' | 'Other';
export type CategoryFilter = ProjectCategory | 'all';

export interface ProjectData {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Brief description shown in lists */
  shortDescription: string;
  /** Detailed description of the project */
  fullDescription: string;
  /** Public key of the project creator */
  creatorAddress: string;
  /** Project category (e.g., DeFi, NFT, Infrastructure) */
  category: ProjectCategory;
  /** URL to the project's image */
  imageUrl: string;
  /** Goal amount in SOL */
  goalAmount: number;
  /** Amount raised so far in SOL */
  raisedAmount: number;
  /** Number of backers */
  backers: number;
  /** Timestamp of project creation */
  createdAt?: Date;
  /** Timestamp of last update */
  updatedAt?: Date;
}

export interface CategoryFilterProps {
  /** List of available categories */
  categories: ProjectCategory[];
  /** Currently selected category */
  selectedCategory: ProjectCategory | "all";
  /** Callback when category selection changes */
  onCategoryChange: (category: ProjectCategory | "all") => void;
}

export interface ProjectListProps {
  /** List of projects to display */
  projects: ProjectData[];
  /** Currently selected category for filtering */
  selectedCategory: ProjectCategory | "all";
  /** Callback when category selection changes */
  onCategoryChange: (category: ProjectCategory | "all") => void;
}
