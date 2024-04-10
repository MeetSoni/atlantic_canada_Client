'use Client'
import React, { useState } from "react";
import Video from "@/components/video/page";
import ShowVideo from "@/components/ShowVideo/page";
import Home_down from "@/components/home_down/page";
import { useAppContext } from "@/context";

const localvideo: string = "/videos/Canada.mp4";
const videoList: string[] = [
  "https://www.youtube.com/embed/zz440EuFK8Q?si=85PVjWTwCgmEMPsV",
  "https://www.youtube.com/embed/u7foSiol3h8?si=AwowigJ5J1ZBE_5l",
  "https://www.youtube.com/embed/KCLCuvPU2L4?si=1YwovLtcjYhTmtUG",
  "https://www.youtube.com/embed/TnrqSeQIoxw?si=Wq0A6mNHLcCFNEiS"
];

const Home: React.FC = () => {
  const { auth_provinceId } = useAppContext();
  const { selectedItemId } = useAppContext();
  const {profilePic} = useAppContext();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div>
      <div className="relative flex flex-col items-center justify-center  bg-cover bg-center bg-fixed "style={{ backgroundImage: `url('https://capstoneatlantic.s3.amazonaws.com/city4.jpeg')` }}>
        <div className="bg-white bg-opacity-50 p-6 rounded-md shadow-lg mt-9 w-full md:w-2/3 lg:w-1/2 ">
          <h1 className="text-2xl md:text-4xl font-bold text-customRed  mb-6 text-center">Join us on your journey to Atlantic Canada</h1>
          <p className="text-center">
            Embark on an exciting adventure as you plan your move to Atlantic Canada! At ATLANTIC CANADA SETTLERS, we understand that the transition to a new place comes with its own set of challenges. Thats why we have created this platform to be your companion throughout the entire process.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {videoList.map((video, index) => (
              <div key={index} className="bg-gray-100 bg-opacity-75 p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg transform transition duration-300 ease-in-out" onClick={() => handleVideoClick(index)}>
                <iframe
                  width="100%"
                  height="200"
                  src={video}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          {selectedVideo !== null && (
            <ShowVideo video={videoList[selectedVideo]} closeVideo={closeVideo} />
          )}
        </div>
      </div>

      <Home_down />
    </div>
  );
};

export default Home;
