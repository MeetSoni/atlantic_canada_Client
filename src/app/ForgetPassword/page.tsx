'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context';
import API_URL from '@/constants/constant';

interface FormData {
  user_name: string;
  email: string;
  password: string;
  user_type: string;
  province: string;
}

function SignupPage() {
  const { authToken, setauthToken } = useAppContext();
  const [checkuser, setcheckuser] = useState('');
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    email: '',
    password: '',
    user_type: '',
    province: '',
  });
  const [emailError, setEmailError] = useState('');
  const [emailmessage, setEmailmessage] = useState('');
  const { email, password } = formData;
  const [error, setError] = useState();
  const navigate = useRouter();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for managing popup visibility

  useEffect(() => {
    if (showSuccessPopup) {
      const timeout = setTimeout(() => {
        setShowSuccessPopup(false); // Hide the popup after 5 seconds
      }, 1000);

      return () => clearTimeout(timeout); // Clean up the timeout on component unmount
    }
  }, [showSuccessPopup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === '') {
      formValid = false;
      setEmailError('Please enter email');
    } else if (!email.match(emailPattern)) {
      formValid = false;
      setEmailError('Please enter email in valid format');
    } else {
      formValid = true;
      setEmailError('');
    }

    if (formValid) {
      try {
        const response = await fetch(API_URL.FORGOT_PASSWORD, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        console.log(data);

        if (data.error) {
          if (data.error === 'Email not found') {
            setEmailError(data.error);

            setFormData({
              user_name: '',
              email: '',
              password: `${formData.password}`,
              user_type: '',
              province: '',
            });
          } else {
            setFormData({
              user_name: '',
              email: `${formData.email}`,
              password: '',
              user_type: '',
              province: '',
            });
          }
        } else {
          setEmailmessage('Email has been sent');
          setShowSuccessPopup(true); // Show the success popup

          // Additional logic after successful email sending
        }
      } catch (err: any) {
        console.log(err);
        // setError(err.response.data.errors || 'something went wrong');
      }
    }
  };

  return (
    <>
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h1 className="text-xl bg-green font-bold mb-4">Email has been sent</h1>
          </div>
        </div>
      )}
      <div className=" p-10 min-h-screen flex items-center justify-center bg-gray-100 bg-gradient-to-r from-grad_red to-grad_white">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6">Forget Password</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <form id="signup-form" className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                id="email"
                name="email"
                value={formData.email}
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

            <button
              type="submit"
              className="w-full bg-customRed text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Change Password
            </button>
          </form>
          <a href="/signUp" className="text-blue-500 hover:text-blue-700">
            Don&apos;t have an account?
          </a>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
