import { useEffect, useState, type ChangeEventHandler } from "react";
import { searchArtworks } from "../data/search";
import { useArtwork } from "../contexts";
import ArtworkCard from "./ArtworkCard";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchResults, setSearchResults } = useArtwork();

  useEffect(() => {
    const controller = new AbortController();

    const search = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await searchArtworks(
          { q: query, limit: 10, offset: 0 },
          controller
        );
        setSearchResults(res.data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Search failed:", error);
          setSearchResults([]);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      search();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query, setSearchResults]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <label className="input input-primary m-4">
        <span>
          <svg
            width="15px"
            height="15px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g stroke="#777777" strokeWidth="1.3">
                <g>
                  <path d="M13.4044,7.0274 C13.4044,10.5494 10.5494,13.4044 7.0274,13.4044 C3.5054,13.4044 0.6504,10.5494 0.6504,7.0274 C0.6504,3.5054 3.5054,0.6504 7.0274,0.6504 C10.5494,0.6504 13.4044,3.5054 13.4044,7.0274 Z"></path>
                  <path d="M11.4913,11.4913 L17.8683,17.8683"></path>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch}
        />
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {searchResults?.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
      </div>
    </>
  );
};
export default SearchBar;
