'use client'
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    const [commonError, setcommonError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setusernameError] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [usertypeError, setusertypeError] = useState('');
    const [provinceError, setprovinceError] = useState('');

    const { user_name, email, password, user_type, province } = formData;
    console.log({ email, password } )
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
            
            if(user_name === '' && email === '' && password === '' && user_type === '' && province === ''){
              formValid=false;
              setcommonError('All the fields are required');
            }
            else if( user_name === '' ){
              formValid = false;
            setusernameError('Please enter username');  
            setcommonError('');

            }
           else if (email === '') {
            formValid = false;
            setEmailError('Please enter email');
            setcommonError('');

            } else if (!email.match(emailPattern)) {
            formValid = false;
            setEmailError('Please enter email in valid format');
            setcommonError('');
           

            } 
           
          

            else if( password === '' ){
              formValid = false;
            setpasswordError('Please enter password');
            setcommonError('');

            }


            else if( user_type === '' ){
              formValid = false;
            setusertypeError('Please enter type of user');
            setcommonError('');

            }

            else if( province === '' ){
              formValid = false;
            setprovinceError('Please enter province');
            setcommonError('');

            }
            
            else {
            formValid = true;
            setEmailError('');
            setcommonError('');

            }
        
            if(formValid){
                try{
                    const response = await fetch('http://localhost:5500/user/signup',{
                        method:'POST',
                        body:JSON.stringify(formData),
                        headers:{
                        'Content-Type':'application/json'
                        }
                    });
                    const data = await response.json();
                    console.log(data.token);
                    localStorage.setItem('token', data.token);
                   
                    console.log('Form Data:', formData);
                    navigate.push('/');
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
          <h2 className="text-3xl font-bold mb-6">Signup</h2>
         {error && <p style={{ color: 'red' }}>{error}</p>}

          <form id="signup-form" className="space-y-4" onSubmit={handleSubmit}>
         {commonError && <p style={{ color: 'red' }}>{commonError}</p>}

            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-600">  Username <span style={{ color: 'red' }}>*</span></label> 
              <input onChange={(e)=>handleChange(e)} type="text" id="user_name" name="user_name" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}

            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email <span style={{ color: 'red' }}>*</span></label>
              <input onChange={(e)=>handleChange(e)} type="text" id="email" name="email" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password <span style={{ color: 'red' }}>*</span></label>
              <input onChange={(e)=>handleChange(e)} type="password" id="password" name="password" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}


        

            <div>
              <label htmlFor="user_type" className="block text-sm font-medium text-gray-600">User Type <span style={{ color: 'red' }}>*</span></label>
              <input onChange={(e)=>handleChange(e)} type="text" id="user_type" name="user_type" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {usertypeError && <p style={{ color: 'red' }}>{usertypeError}</p>}

            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-600">Province <span style={{ color: 'red' }}>*</span></label>
              <input onChange={(e)=>handleChange(e)} type="text" id="province" name="province" className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500" />
            </div>
          {provinceError && <p style={{ color: 'red' }}>{provinceError}</p>}
            
            
            
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
