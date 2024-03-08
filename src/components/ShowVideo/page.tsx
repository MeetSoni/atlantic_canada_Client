import React from "react";

interface ShowVideoProps {
  video: string;
  closeVideo: () => void;
}

const ShowVideo: React.FC<ShowVideoProps> = ({ video, closeVideo }) => {
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative">
        <button
          onClick={closeVideo}
          className="absolute top-4 right-4 text-white cursor-pointer"
        >
          Close
        </button>
        <iframe
          width="100%"
          height="400"
          src={video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ShowVideo;
