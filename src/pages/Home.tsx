import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MyGallery from "./MyGallery";
import { useArtwork } from "../contexts";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reset } = useArtwork();
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };
  return (
    <div>
      <div className="navbar">
        <div className="navbar-start text-2xl font-extrabold">
          Personal Gallery
        </div>
        <button className="navbar-center" onClick={openModal}>
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
          <div className="input input-ghost cursor-pointer focus:outline-none text-xl ">
            <span className="grow text-left opacity-60">search...</span>
          </div>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  mx-auto ">
          {/* overlayer */}
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />

          {/* body */}
          <div className="relative w-11/12 max-w-5xl h-[85vh] rounded-2xl bg-base-200 overflow-y-auto">
            <SearchBar />
          </div>
        </div>
      )}
      <MyGallery />
    </div>
  );
};
export default Home;
