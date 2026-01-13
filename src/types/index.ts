import type { Artwork } from "../schemas/ArtworkSchema";

export type ArtworkContextType = {
  galleryArtworks: Artwork[];
  searchResults: Artwork[];
  setGalleryArtworks: (artworks: Artwork[]) => void;
  setSearchResults: (artworks: Artwork[]) => void;
  page: number;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
  notFound: boolean;
};
