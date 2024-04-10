'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the context type
interface AppContextType {
  authToken: string;
  setauthToken: (authToken: string) => void;
  auth_userName: string;
  setauthuserName: (auth_userName: string) => void;
  auth_provinceId: string;
  setprovinceId: (auth_provinceId: string) => void;
  selectedItemId: string;
  setSelectedItemId: (selectedItemId: string) => void;
  profilePic: string;
  setProfilePic: (profilePic: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the props type for AppWrapper
interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const initialAuthToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') || '' : '';
  const initialauth_userName = typeof window !== 'undefined' ? localStorage.getItem('auth_userName') || '' : '';
  const initialauth_provinceId = typeof window !== 'undefined' ? localStorage.getItem('auth_provinceId') || '' : '';
  const initialSelectedItemId = typeof window !== 'undefined' ? localStorage.getItem('selectedItemId') || '' : '';
  const initialProfilePic = typeof window !== 'undefined' ? localStorage.getItem('profilePic') || '' : '';

  const [selectedItemId, setSelectedItemId] = useState<string>(initialSelectedItemId);
  const [authToken, setauthToken] = useState<string>(initialAuthToken);
  const [auth_userName, setauthuserName] = useState(initialauth_userName);
  const [auth_provinceId, setprovinceId] = useState(initialauth_provinceId);
  const [profilePic, setProfilePic] = useState<string>(initialProfilePic);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('auth_userName', auth_userName);
      localStorage.setItem('auth_provinceId', auth_provinceId);
      localStorage.setItem('selectedItemId', selectedItemId);
      localStorage.setItem('profilePic', profilePic);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('auth_userName');
      localStorage.removeItem('auth_provinceId');
      localStorage.removeItem('selectedItemId');
      localStorage.removeItem('profilePic');
    }
  }, [authToken, auth_userName, auth_provinceId, selectedItemId, profilePic]);

  const contextValue = {
    authToken,
    setauthToken,
    auth_userName,
    setauthuserName,
    auth_provinceId,
    setprovinceId,
    selectedItemId,
    setSelectedItemId,
    profilePic,
    setProfilePic,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
