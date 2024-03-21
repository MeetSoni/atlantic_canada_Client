'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  API_URL  from '@/constants/constant';


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
                    
                    console.log(data.error);

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
                        alert("Login successfully")
                    navigate.push('/');

                    }
                }
                
                catch (err: any) {
                    console.log(err);
                    setError(err.response.data.errors || 'something went wrong');
                }
                }
            

      };


// returning the body 
  return (
    <>
      <div className=" p-10 min-h-screen flex items-center justify-center bg-gray-100  bg-gradient-to-r from-grad_red to-grad_white">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Login</h2>
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

        

       
            
            
            <button type="submit" className="w-full bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
              Login
            </button>


          </form>

          <a href="/signUp" className="text-blue-500 hover:text-blue-700">Don&apos;t have an account?</a>
          <a href="/ForgetPassword" className="text-blue-500 hover:text-blue-700">    Forget Password</a>
        </div>
      </div>
    </>

  );
}

export default SignupPage;
