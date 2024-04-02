'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the context type
interface AppContextType {
  authToken: string;
  setauthToken: (authToken: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the props type for AppWrapper
interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  // Check if localStorage is available before using it
  const initialAuthToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') || '' : '';

  // Initialize authToken state with the value from localStorage if it exists
  const [authToken, setauthToken] = useState<string>(initialAuthToken);

  // Effect to run whenever authToken changes
  useEffect(() => {
    if (authToken) {
      // Store the authToken in localStorage when it changes
      localStorage.setItem('authToken', authToken);
    } else {
      // Clear authToken from localStorage if it's empty
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  // The value provided to the context needs to match the AppContextType
  const contextValue = { authToken, setauthToken };

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
