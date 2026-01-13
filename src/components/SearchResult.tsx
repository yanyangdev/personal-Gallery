import { useEffect, useRef } from "react";
import { ArtworkCard } from ".";
import { useArtwork } from "../contexts";

const SearchResult = () => {
  const { searchResults, hasMore, loadMore, loading, notFound } = useArtwork();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchResults.length]);

  if (notFound) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p className="text-gray-500">Try a different search term.</p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {searchResults?.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
        <div ref={loadMoreRef} />
      </div>
      {loading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg">loading...</span>
        </div>
      )}
      {hasMore && !loading && (
        <div className="flex justify-center">
          <button
            className="btn btn-outline btn-access mb-4"
            onClick={async () => await loadMore()}
          >
            Load More
          </button>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
              <span className="loading loading-spinner loading-lg"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SearchResult;
