'use client'
import React, { useState } from "react";

interface VideoProps {
  src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className="relative ">
      <video
        autoPlay
        loop
        muted
        className="w-full h-auto object-cover cursor-pointer"
        onClick={handleVideoClick}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
