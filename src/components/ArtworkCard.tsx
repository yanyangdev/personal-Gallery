import type { Artwork } from "../schemas/ArtworkSchema";

const ArtworkCard = (artwork: Artwork) => {
  const { title, artist_title, artist_titles, image_id } = artwork;
  const artistName =
    artist_title || artist_titles?.join(", ") || "unknown Artist";
  const imageUrl = image_id
    ? `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`
    : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  return (
    <div className="card  shadow-sm flex flex-col justify-center items-center">
      <figure className="h-55 w-full">
        <img className="object-contain h-full p-2" src={imageUrl} alt={title} />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title line-clamp-2">{title}</h2>
        <p className="italic">Artists: {artistName}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
        </div> */}
      </div>
    </div>
  );
};
export default ArtworkCard;
