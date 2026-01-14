import type { Artwork } from "../schemas/ArtworkSchema";
import { GalleryPlusIcon } from ".";
import { useArtwork } from "../contexts";

const ArtworkCard = (artwork: Artwork) => {
  const { galleryArtworks, addToGallery, removeFromGallery } = useArtwork();

  const { title, artist_title, artist_titles, image_id } = artwork;
  const artistName =
    artist_title || artist_titles?.join(", ") || "unknown Artist";
  const imageUrl = image_id
    ? `https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`
    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";

  const isInGallery = galleryArtworks.some((a) => a.id === artwork.id);

  const handleClick = () => {
    if (isInGallery) {
      removeFromGallery(artwork);
    } else {
      addToGallery(artwork);
    }
  };

  return (
    <div className="card flex flex-col justify-center items-center bg-gray-700 rounded-xl bo">
      <figure className="h-55 w-full">
        <img className="object-contain h-full p-2" src={imageUrl} alt={title} />
      </figure>
      <div className="card-body p-4 w-full text-white ">
        <div className="flex justify-start items-center">
          <div className="tooltip">
            <div className="tooltip-content">
              {isInGallery ? (
                <div className="animate-bounce text-green-300 -rotate-2 text-md font-semibold">
                  remove
                </div>
              ) : (
                <div className="animate-bounce text-orange-300 -rotate-2 text-md font-semibold">
                  Add
                </div>
              )}
            </div>

            <button className="btn btn-ghost btn-sm" onClick={handleClick}>
              <GalleryPlusIcon isInGallery={isInGallery} />
            </button>
          </div>
          <h2 className="card-title line-clamp-1 text-lg">{title}</h2>
        </div>
        <p className="italic px-4 line-clamp-1">Artists: {artistName}</p>
      </div>
    </div>
  );
};
export default ArtworkCard;
