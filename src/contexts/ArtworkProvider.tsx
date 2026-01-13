import { useEffect, useState } from "react";
import type { Artwork, GalleryArtworks } from "../schemas/ArtworkSchema";
import { ArtworkContext } from "./ArtworkContext";
import { searchArtworks } from "../data/search";

type ProviderProps = {
  children: React.ReactNode;
};
const loadGalleryFromLocalStorage = (): GalleryArtworks[] => {
  const storedArtworks = localStorage.getItem("gallery-artworks");
  return storedArtworks ? JSON.parse(storedArtworks) : [];
};

const INITIAL_LIMIT = 6;

const ArtworkProvider = ({ children }: ProviderProps) => {
  const [galleryArtworks, setGalleryArtworks] = useState<GalleryArtworks[]>(
    loadGalleryFromLocalStorage()
  );
  const [searchResults, setSearchResults] = useState<Artwork[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const addToGallery = (artwork: Artwork) => {
    const favorites = [...galleryArtworks, { ...artwork, note: "" }];
    setGalleryArtworks(favorites);
    localStorage.setItem("gallery-artworks", JSON.stringify(favorites));
  };
  const removeFromGallery = (artwork: Artwork) => {
    const favorites = galleryArtworks.filter((a) => a.id !== artwork.id);
    setGalleryArtworks(favorites);
    localStorage.setItem("gallery-artworks", JSON.stringify(favorites));
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    const controller = new AbortController();
    setLoading(true);
    try {
      const res = await searchArtworks(
        { q: query, limit: INITIAL_LIMIT, page },
        controller
      );
      setSearchResults((prev) => [...prev, ...res.data]);
      const { current_page, total_pages } = res.pagination;

      setHasMore(current_page < total_pages);
    } finally {
      setPage((prev) => prev + 1);
      setLoading(false);
      controller.abort();
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    setSearchResults([]);
    if (!query) {
      setHasMore(false);
      setNotFound(false);
    }
    const timeoutId = setTimeout(async () => {
      if (!query) {
        setHasMore(false);
        setSearchResults([]);
        setPage(1);
        return;
      }

      const controller = new AbortController();
      setLoading(true);
      setPage(1);
      try {
        setNotFound(false);
        const res = await searchArtworks(
          { q: query, limit: INITIAL_LIMIT, page: 1 },
          controller
        );
        if (res.pagination.total === 0) {
          setSearchResults([]);
          setHasMore(false);
          setPage(1);
          setNotFound(true);
          return;
        }
        setSearchResults(res.data);
        setHasMore(res.pagination.current_page < res.pagination.total_pages);
        if (res.pagination.current_page < res.pagination.total_pages)
          setPage(2);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Search failed:", error);
          setSearchResults([]);
        }
      } finally {
        controller.abort();
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, setSearchResults]);

  const reset = () => {
    setQuery("");
    setSearchResults([]);
    setPage(1);
    setHasMore(false);
    setLoading(false);
    setNotFound(false);
  };
  return (
    <ArtworkContext.Provider
      value={{
        galleryArtworks,
        searchResults,
        setGalleryArtworks,
        setSearchResults,

        query,
        setQuery,
        page,
        hasMore,
        loadMore,
        loading,
        notFound,

        addToGallery,
        removeFromGallery,
        reset,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};
export default ArtworkProvider;
