import { createContext, useContext } from "react";
import type { ArtworkContextType } from "../types";

export const ArtworkContext = createContext<ArtworkContextType>({
  galleryArtworks: [],
  searchResults: [],
  setGalleryArtworks: () => {},
  setSearchResults: () => {},
});

export const useArtwork = (): ArtworkContextType => {
  const context = useContext(ArtworkContext);
  if (!context) {
    throw new Error("useArtwork must be used within an ArtworkProvider");
  }
  return context;
};
