import { useState, type ChangeEventHandler } from "react";
import { ArtworkCard } from "../components";
import { useArtwork } from "../contexts";

const MyGallery = () => {
  const { galleryArtworks, setGalleryArtworks } = useArtwork();
  const [note, setNote] = useState<string>("");
  const [isEditingId, setIsEditingId] = useState<number | null>(null);

  const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNote(e.target.value);
  };

  const handleNoteChange = (artworkId: number) => {
    const updatedArtworks = galleryArtworks.map((artwork) =>
      artwork.id === artworkId ? { ...artwork, note } : artwork
    );
    localStorage.setItem("gallery-artworks", JSON.stringify(updatedArtworks));
    setGalleryArtworks(updatedArtworks);
    setIsEditingId(null);
    setNote("");
  };
  const handleEdit = (artwork: { id: number; note?: string }) => {
    setIsEditingId(artwork.id);
    setNote(artwork.note || "");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {galleryArtworks?.map((artwork) => (
          <div
            className=" bg-gray-700 rounded-xl text-white p-4"
            key={artwork.id}
          >
            <ArtworkCard key={artwork.id} {...artwork} />
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">personal note:</p>
                {isEditingId == artwork.id ? (
                  <button
                    className="btn btn-sm btn-active"
                    onClick={() => handleNoteChange(artwork.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline "
                    onClick={() => handleEdit(artwork)}
                  >
                    Edit
                  </button>
                )}
              </div>
              {isEditingId == artwork.id ? (
                <textarea
                  className="textarea w-full h-24 textarea-info text-black"
                  value={note}
                  onChange={handleInput}
                  placeholder="Add a note..."
                />
              ) : (
                <p className="h-24 line-clamp-2">
                  {artwork.note || "no note yet"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyGallery;
