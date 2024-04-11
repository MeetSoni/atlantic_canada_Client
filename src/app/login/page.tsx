'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';
import API_URL from '@/constants/constant';



//defining type
interface FormData {
    user_name: string;
    email: string;
    password: string;
    user_type: string;
    province: string;
  }

//signup page function
function SignupPage() {
    //state to handle form data
 
    const {authToken,setauthToken}=useAppContext();
    const { auth_userName, setauthuserName } = useAppContext();
    const { auth_provinceId,setprovinceId }=useAppContext();
    const [checkuser,setcheckuser]=useState('');
    const {profilePic,setProfilePic}=useAppContext();
    const [formData, setFormData] = useState<FormData>({
        user_name: '',
        email: '',
        password: '',
        user_type: '',
        province: ''
      });
    // various states
    const [emailError, setEmailError] = useState('');
    const[passworderror,setPasswordError]=useState('');
    const { email, password } = formData;
    console.log({email,password})
    const [error, setError] = useState();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
  
    //router to navigate page
    const navigate = useRouter();

    // handlechange event for input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });    
    
    // handlesubmit event
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {

            e.preventDefault();
            let formValid = true;
            const emailPattern =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (email === '') {
            formValid = false;
            setEmailError('Please enter email');
            } 

            else if(password === ''){
              formValid = false;
              setPasswordError('Please enter password');
            }

            else if (!email.match(emailPattern)) {
            formValid = false;
            setEmailError('Please enter email in valid format');
            } else {
            formValid = true;
            setEmailError('');

            }
        
            if(formValid){
                try{
                    const response = await fetch(API_URL.LOGIN,{
                        method:'POST',
                        body:JSON.stringify(formData),
                        headers:{
                        'Content-Type':'application/json'
                        }
                    });
                    const data = await response.json();
                    console.log(data)
                    
                    // console.log(data.error);

                    if(data.error){
                       
                        if(data.error==="Email not found"){
                            setEmailError(data.error);

                            setFormData({
                                user_name: '',
                                email: '',
                                password: `${formData.password}`,
                                user_type: '',
                                province: ''
                            });
                        }

                        else{
                            setPasswordError(data.error)

                             setFormData({
                            user_name: '',
                            email:  `${formData.email}`,
                            password: '',
                            user_type: '',
                            province: ''
                        });
                        }
                       
                   
                    }
                    else{

                      // document.cookie = `token=${data.token}; path=/`;
                      // setauthToken(`${data.token}`);
                      console.log(data.data.province_id)
                      setauthToken(data.token); 
                      setauthuserName(data.data.email)// Setting the authToken from the response
                      setprovinceId(data.data.province_id);
                      setProfilePic(data.data.profile_image);
                      setShowSuccessPopup(true); // Open the success popup
                      setTimeout(() => {
                        setShowSuccessPopup(false); // Hide success popup after 5 seconds
                        navigate.push(`https://atlantic-canada-client.vercel.app/services`);
                      }, 2000); 
                      

                    }
                }
                
                catch (err: any) {
                    console.log(err);
                    // setError(err.response.data.errors || 'something went wrong');
                }
                }
            

      };


// returning the body 
  return (
    <>


   
      <div className=" p-10 min-h-screen flex items-center justify-center bg-gray-100  bg-white">
    
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md bg-gradient-to-r from-grad_gray to-grad_white">
        {authToken=='' &&  <div className="text-left  mt-9">
    <h1 className="text-2xl font-bold text-center mb-4">Login is required</h1>
    <p className="text-center">Please login to continue to the service.</p>
  </div>}
          {/* <h2 className="text-3xl font-bold mb-6">Login</h2> */}
         {error && <p style={{ color: 'red' }}>{error}</p>}

          <form id="signup-form" className="space-y-4" onSubmit={handleSubmit}>
          
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
              <input onChange={(e)=>handleChange(e)} type="text" id="email" name="email" value={formData.email} className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
              <input onChange={(e)=>handleChange(e)} type="password" id="password" name="password" value={formData.password} className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
            {passworderror && <p style={{ color: 'red' }}>{passworderror}</p>}

            <div className="flex justify-center">
                  <a href="/privacy_policy" className="text-green-500 hover:text-blue-700">Before login read Privacy Policy</a>
        </div>

       
            
            
            <button type="submit" className="w-full bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
              Login
            </button>
          </form>
          <div className='mt-4'>
          <a href="/signUp" className="text-blue-500 hover:text-blue-700 mx-5">Don&apos;t have an account?</a>
          <a href="/ForgetPassword" className="text-blue-500 hover:text-blue-700 "> Forget Password</a>
          </div>
         

        </div>
        
      </div>
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md" style={{ width: '400px' }}>
            <h2 className="text-3xl font-bold mb-4">Success</h2>
            <p>Login successful!</p>
            <button
              className="bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500 mt-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPage;

