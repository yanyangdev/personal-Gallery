import type { Artwork, GalleryArtworks } from "../schemas/ArtworkSchema";

export type ArtworkContextType = {
  galleryArtworks: GalleryArtworks[];
  searchResults: Artwork[];
  setGalleryArtworks: (artworks: GalleryArtworks[]) => void;
  setSearchResults: (artworks: Artwork[]) => void;
  page: number;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
  notFound: boolean;
  addToGallery: (artwork: Artwork) => void;
  removeFromGallery: (artwork: Artwork) => void;
  reset: () => void;
};
