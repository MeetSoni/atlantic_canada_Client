'use Client'
import React, { useState } from "react";
import Video from "@/components/video/page";
import ShowVideo from "@/components/ShowVideo/page";
import Home_down from "@/components/home_down/page";

const localvideo : string="/videos/Canada.mp4";
const videoList: string[] = [
 
  "https://www.youtube.com/embed/zz440EuFK8Q?si=85PVjWTwCgmEMPsV",
  "https://www.youtube.com/embed/u7foSiol3h8?si=AwowigJ5J1ZBE_5l",
  "https://www.youtube.com/embed/KCLCuvPU2L4?si=1YwovLtcjYhTmtUG",
  "https://www.youtube.com/embed/TnrqSeQIoxw?si=Wq0A6mNHLcCFNEiS"
];

// Import necessary modules and components

const Home: React.FC = () => {
    const [message, setMessage] = useState('hhh');
    const [form, setForm] = useState({});
    const [users, setUsers] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const handleVideoClick = (index: number) => {
    setSelectedVideo(index);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const handlechange=async(e: { target: { value: any; }; })=>{
   
    const val=e.target.value;
    console.log(JSON.stringify(val))
    const response= await fetch("http://localhost:5500/api/home",{
        method:'POST',
        body: JSON.stringify(val)
    })
    console.log(response.text)
  }

  const handleForm = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5500/api/home',{
      method:'GET',
    //   body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
   console.log(data);
  }



  return (
    <>
        
   
      <div className="container ">
        <div className="md:relative lg: relative flex flex-col items-center justify-center mt-10 ">
          {/* Video */}
          {/* <Video src={localvideo} /> */}

          {/* Main Container */}
          <div className=" bg-white bg-opacity-50 p-6 rounded-md shadow-lg mt-8 md:mt-12 lg:mt-20 w-full md:w-2/3 lg:w-1/2">
            {/* Content in the white box */}
            <h1 className="text-2xl md:text-4xl font-bold text-customRed mb-6 text-center">Join us on your journey to Atlantic Canada</h1>
            <p className="text-center">
              Embark on an exciting adventure as you plan your move to Atlantic Canada! At ATLANTIC CANADA SETTLERS, we understand that the transition to a new place comes with its own set of challenges. Thats why we have created this platform to be your companion throughout the entire process.
            </p>

            {/* Video Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
              {videoList.map((video, index) => (
                <div key={index} className="bg-gray-100 bg-opacity-75 p-4 rounded-md shadow-md cursor-pointer" onClick={() => handleVideoClick(index)}>
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

            {/* Display selected video in a larger view */}
            {selectedVideo !== null && (
              <ShowVideo video={videoList[selectedVideo]} closeVideo={closeVideo} />
            )}
          </div>
        </div>
      </div>

      <Home_down />
    </>
  );
};

export default Home;


