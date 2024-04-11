'use client'
import React, { useEffect, useState , useRef, isValidElement, useContext} from 'react';
import { useAppContext } from "@/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { Edit2 } from 'react-feather';
import  API_URL  from '@/constants/constant';

interface PageProps {
    params: {
        profile_id: string;
    };
    
}

const ProfilePage = ({ params }: PageProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const { auth_userName, setauthuserName, authToken, setauthToken } = useAppContext();
    const { auth_provinceId, setprovinceId } = useAppContext();
    const {profilePic,setProfilePic}=useAppContext();
   // const [userData, setUserData] = useState<any>(null);
    const [editedUserData, setEditedUserData] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<any[]>([]);
    const [isUpload,setIsUpload] = useState(false);
     const[file,setfile]= useState<File | null>(null);

    const navigate = useRouter();

    useEffect(() => {
       getProfileData();
        
       
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.profile_id]);

    const getProfileData = async () => 
    {
            try {
                const response = await fetch(`${API_URL.GET_USERDATA_BY_ID}/${params.profile_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("call data",data)
                const { password, _id, ...filteredData } = data[0];
               // setUserData(filteredData);
                setEditedUserData(  data[0] );

                const provincesResponse = await fetch(`${API_URL.GET_ALL_HOME_PROVINCES}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!provincesResponse.ok) {
                    throw new Error(`HTTP error! Status: ${provincesResponse.status}`);
                }

                const provincesData = await provincesResponse.json();
                setProvinces(provincesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

    const  handleSaveButtonClick = () =>
        {
            console.log("click handle")
            if(isUpload)
            {
                uploadphoto()
            }else{
                handleSave()
            }

        }

    const handleProfileImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event : any) => {


        const file = event.target.files?.[0] as File;
        
        console.log(file);
        if (file) {
            setIsUpload(true)

            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedUserData((prevData: any) => ({
                    ...prevData,
                    profile_image: reader.result,
                }));
            };
            reader.readAsDataURL(file);

       
        }
        setfile(file);

    
        
    };
    const handleLogout = () => {
        setauthToken('');
        setauthuserName('');
        navigate.push('/');
    };

 
      

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
        
        setEditedUserData((prevData: any) => ({
            ...prevData,
            user_name: e.target.value,
        }));
    
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const uploadphoto = async () => {
    //    e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to save changes?');
        if (!confirmed) {
            return;
        }
        

        const fileFormData = new FormData();
        console.log("file", file);
        fileFormData.append('file', file as File);
      
        try {
            const response = await fetch(`${API_URL.ADD_PROFILE_PHOTO_URL}`, {
                method: 'POST',
                body: fileFormData
            });
      
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
      
            const data = await response.json();
            console.log('File uploaded successfully:', data.url);
            
            // Update state with the image URL
            editedUserData.profile_image = data.url;;
          
         
            handleSave();

          console.log("data added to main data")
      
            // Now call the function after setting state
            // saveSubServiceDataApi();
        } catch (error) {
            console.error('Error uploading file:', error);
          }
      };

    const handleSave = async () => {

        if(!isUpload)   
        {
            const confirmed = window.confirm('Are you sure you want to save changes?');
            if (!confirmed) {
                return;
            }
        }
        
        console.log("edited data ",editedUserData); 
        console.log(`${API_URL.UPDATE_PROFILE_DATA}/${auth_userName}`);

        try {
            const response = await fetch(`http://localhost:5500/api/profileupdate/${auth_userName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUserData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedData = await response.json();
            console.log(updatedData);
         //   setUserData(updatedData);
              setIsUpload(false)
            setEditedUserData({ ...updatedData });
            setSuccessMessage('Data updated successfully!');
            setprovinceId(updatedData.province_id);
            setProfilePic(updatedData.profile_image);
          //  getProfileData()

        } catch (error) {
            console.error('Error updating data:', error);
        }

        setIsEditing(false);
    };

    return (
        <div className="min-h-screen py-6 sm:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-grad_red to-grad_white py-4 px-6 sm:px-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900">User Profile</h2>
                            <p className="mt-2 text-sm text-gray-600">Edit your profile information</p>
                        </div>
                        {!isEditing ? (
                            <button onClick={handleEdit} className="bg-customRed text-white font-bold py-2 px-4 rounded flex items-center">
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                Edit
                            </button>
                        ) : (
                            <button onClick={  handleSaveButtonClick} className="bg-customRed text-white font-bold py-2 px-4 rounded flex items-center">
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
                                Save
                            </button>
                        )}
                    </div>
                    <div className="p-6 sm:p-8">
                        {successMessage && (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                                <p className="font-bold">Success:</p>
                                <p>{successMessage}</p>
                            </div>
                        )}
                        {editedUserData && (
                            <div>
                                <div className="mt-4 flex justify-center">
                                <div className="mt-1 relative">
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className="relative">
            <img
    id="profile_image"
    src={editedUserData.profile_image || '/default-profile-image.jpg'} // Use a default image if profile_image is not set
    alt="Profile Image"
    className="rounded-full h-24 w-24 object-cover flex items-center justify-center cursor-pointer"
    onClick={handleProfileImageClick}
/>

               {isEditing && 
                <div className="absolute top-14 right-1 bg-white rounded-full p-1 cursor-pointer">
                <Edit2 size={18} onClick={handleProfileImageClick} />
            </div>

               }
            </div>
        </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-bold text-2xl font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="off"
                                            readOnly={!isEditing}
                                            required
                                            className= {isEditing ? "mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" : "border-none"}
                                            value={editedUserData.user_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-bold text-2xl font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="text"
                                            autoComplete="off"
                                            readOnly
                                            required
                                            className= {isEditing ? "mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" : "border-none"}

                                            value={editedUserData.email}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="province" className="block text-bold text-2xl font-medium text-gray-700">
                                        Province
                                    </label>
                                    <div className="mt-1">
                                        {isEditing ? (
                                            <select
                                                id="province"
                                                name="province_id"
                                                required
                                                className= {isEditing ? "mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" : "border-none"}
                                                value={editedUserData.province_name}
                                                onChange={(e) => setEditedUserData({
                                                    ...editedUserData,
                                                    province_id: e.target.options[e.target.selectedIndex].id,
                                                    province_name : e.target.value
                                                })}
                                            >
                                                {provinces.map(province => (
                                                    <option id={province._id} key={province._id} value={province.province}>
                                                        {province.province}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                id="province"
                                                name="province_id"
                                                type="text"
                                                autoComplete="off"
                                                readOnly
                                                required
                                                className="input-text border-none focus:border-none"
                                                value={editedUserData.province_name}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="w-1/2 py-2 px-4 mt-10 bg-customRed text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Logout
                            </button>

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;