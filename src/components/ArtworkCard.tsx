import type { Artwork } from "../schemas/ArtworkSchema";
import { GalleryPlusIcon } from ".";

const ArtworkCard = (artwork: Artwork) => {
  const { title, artist_title, artist_titles, image_id } = artwork;
  const artistName =
    artist_title || artist_titles?.join(", ") || "unknown Artist";
  const imageUrl = image_id
    ? `https://www.artic.edu/iiif/2/${image_id}/full/400,/0/default.jpg`
    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  return (
    <div className="card shadow-sm flex flex-col justify-center items-center bg-gray-700 rounded-xl">
      <figure className="h-55 w-full">
        <img className="object-contain h-full p-2" src={imageUrl} alt={title} />
      </figure>
      <div className="card-body p-4 w-full text-white ">
        <div className="flex justify-start items-center gap-2">
          <div className="tooltip">
            <div className="tooltip-content">
              <div className="animate-bounce text-orange-300 -rotate-2 text-xl font-semibold">
                Add to gallery!
              </div>
            </div>

            <button className="btn btn-ghost btn-sm" title="Add to my gallery">
              <GalleryPlusIcon />
            </button>
          </div>
          <h2 className="card-title line-clamp-1">{title}</h2>
        </div>
        <p className="italic px-4 line-clamp-1">Artists: {artistName}</p>
      </div>
    </div>
  );
};
export default ArtworkCard;
