import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the context values
interface UserContextValues {
  name: string;
  username: string;
  email: string;
  password: string;
  setName: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial empty object
const UserContext = createContext<UserContextValues | undefined>(undefined);

// Create a custom hook to use the context
export const useUserContext = (): UserContextValues => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Create a context provider component
interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextValues: UserContextValues = {
    name,
    username,
    email,
    password,
    setName,
    setUsername,
    setEmail,
    setPassword,
  };

  return <UserContext.Provider value={contextValues}>{children}</UserContext.Provider>;
};
