import type { Artwork } from "../schemas/ArtworkSchema";

export type ArtworkContextType = {
  galleryArtworks: Artwork[];
  searchResults: Artwork[];
  setGalleryArtworks: (artworks: Artwork[]) => void;
  setSearchResults: (artworks: Artwork[]) => void;
};
