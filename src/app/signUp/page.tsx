'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API_URL from '@/constants/constant';
import { useAppContext } from '@/context';

interface Province {
  _id: string;
  province: string;
  description: string;
  images: string[];
}

interface FormData {
  user_name: string;
  email: string;
  password: string;
  user_type: string;
  province_id: string;
  province_name:string;
  profile_image:string;
}

function SignupPage() {
  const { authToken, setauthToken } = useAppContext();
  const {auth_userName,setauthuserName}=useAppContext();
  const {auth_provinceId,setprovinceId}=useAppContext();
  const {profilePic,setProfilePic}=useAppContext();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [isUpload,setIsUpload] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    email: '',
    password: '',
    user_type: '',
    province_id: '',
    province_name:'',
    profile_image:''
  });
  const [commonError, setCommonError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usertypeError, setUsertypeError] = useState('');
  const [provinceError, setProvinceError] = useState('');
  const[file,setfile]=useState<File | null>(null);

  const { user_name, email, password, user_type, province_id } = formData;
  const navigate = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL.GET_ALL_HOME_PROVINCES}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Province[] = await response.json();
        console.log(data);
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  
  }, [formData.profile_image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'province_id') {
        // Find the selected province data from the provinces array
        const selectedProvinceData = provinces.find((province) => province._id === value);

        // Update province_id in formData with the _id of the selected province
        setFormData((prevFormData) => ({
            ...prevFormData,
            province_id: selectedProvinceData ? selectedProvinceData._id : '',
            province_name: selectedProvinceData ? selectedProvinceData.province : ''
        }));
    } 
    
    else if (name === 'profile_image') {
        // Handle file upload
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            setfile(file);
            setIsUpload(true)
            // setFormData(prevData => ({
            //   ...prevData,
            //   subsvs_img: file // Store the image file object directly
            // }));
        }
    } 
    
    else {
        // For other input fields, update formData normally
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
};

const  handleSaveButtonClick = (e: React.FormEvent<HTMLFormElement>) =>
{
    console.log("click handle")
    if(isUpload)
    {
        uploadphoto(e)
    }else{
      handleSubmit()
    }

}
  function getProvinceById(provinceId : String) {
    return provinces.find(province => province._id === provinceId);
}

const uploadphoto = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
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
    // setFormData(prevData => ({
    //   ...prevData,
    //   profile_image: data.url
    // }));

    formData.profile_image = data.url

    // Call handleSubmit after setting state
    handleSubmit();
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
  
  const handleSubmit = async () => {
   
     let formValid = true;

     
    const provinceIdToFind = formData.province_id;
    const foundProvince = getProvinceById(provinceIdToFind);

    setFormData((prevFormData) => ({
      ...prevFormData,
      province_name: foundProvince ? foundProvince.province : ''
    }));

    // Validation logic

    if (formValid) {
      try {
        const response = await fetch(`${API_URL.SIGNUP}`, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const signupdata = await response.json();
        console.log(signupdata.data.email);

        if (signupdata.message) {
          setEmailError(`${signupdata.message}`);
        } else {
          setauthToken(signupdata.token);
          setauthuserName(signupdata.data.email);
          setprovinceId(signupdata.data.province_id);
          setProfilePic(signupdata.data.profile_image);
          alert("Signup successful");
          navigate.push('/');
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="p-10 min-h-screen flex items-center justify-center  ">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md bg-gradient-to-r from-grad_gray to-grad_white">
          <h2 className="text-3xl font-bold mb-6">Signup</h2>
          <form id="signup-form" className="space-y-4" onSubmit={handleSaveButtonClick}>
            {/* Form fields and error messages */}
            {/* Username */}
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-600">Username <span className="text-red-500">*</span></label>
              <input onChange={handleChange} type="text" id="user_name" name="user_name" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            {usernameError && <p className="text-red-500">{usernameError}</p>}
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email <span className="text-red-500">*</span></label>
              <input onChange={handleChange} type="text" id="email" name="email" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            {emailError && <p className="text-red-500">{emailError}</p>}
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password <span className="text-red-500">*</span></label>
              <input onChange={handleChange} type="password" id="password" name="password" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            {/* User Type */}
            {/* <div>
              <label htmlFor="user_type" className="block text-sm font-medium text-gray-600">User Type <span className="text-red-500">*</span></label>
              <input onChange={handleChange} type="text" id="user_type" name="user_type" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div> */}
            {usertypeError && <p className="text-red-500">{usertypeError}</p>}
            {/* Province dropdown */}
            <div>
              <label htmlFor="province_id" className="block text-sm font-medium text-gray-600">Province you want to migrate <span className="text-red-500">*</span></label>
              <select
  id="province_id"
  name="province_id"
  value={formData.province_id} // Use formData.province_id as the value for the dropdown
  onChange={handleChange}
  className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
>
  <option value="">Select a province</option>
  {provinces.map((province) => (
    <option key={province._id} value={province._id}>
      {province.province}
    </option>
  ))}
</select>

            </div>
            {provinceError && <p className="text-red-500">{provinceError}</p>}

            <div>
              <label htmlFor="profile_image" className="block text-sm font-medium text-gray-600">profile_image <span className="text-red-500">*</span></label>
              <input onChange={handleChange} type="file" accept="image/*" id="profile_image" name="profile_image" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>

            {/* Submit button */}
            <button type="submit" className="w-full bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupPage;