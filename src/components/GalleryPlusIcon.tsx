type GalleryPlusIconProps = {
  isInGallery?: boolean;
};

const GalleryPlusIcon = ({ isInGallery }: GalleryPlusIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isInGallery ? "red " : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      {/* <!-- picture frame --> */}
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <circle cx="8" cy="8" r="1.2" />
      <path d="M3 13l4-4 3 3 4-4 3 3" />

      {/* <!-- plus --> */}
      <path d="M18 8v6" />
      <path d="M15 11h6" />
    </svg>
  );
};
export default GalleryPlusIcon;
