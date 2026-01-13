import { useState } from "react";
import type { Artwork } from "../schemas/ArtworkSchema";
import { ArtworkContext } from "./ArtworkContext";

type ProviderProps = {
  children: React.ReactNode;
};
const loadGalleryFromLocalStorage = (): Artwork[] => {
  const storedArtworks = localStorage.getItem("artworks");
  return storedArtworks ? JSON.parse(storedArtworks) : [];
};

const ArtworkProvider = ({ children }: ProviderProps) => {
  const [galleryArtworks, setGalleryArtworks] = useState<Artwork[]>(
    loadGalleryFromLocalStorage()
  );
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);

  return (
    <ArtworkContext.Provider
      value={{
        galleryArtworks,
        searchResults,
        setGalleryArtworks,
        setSearchResults,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};
export default ArtworkProvider;
