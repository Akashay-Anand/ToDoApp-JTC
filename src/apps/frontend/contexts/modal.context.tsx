import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context values
interface ModelContextValues {
  fixedMode: boolean;
  isActive: boolean;
  text: string;
  setFixedMode: (mode: boolean) => void;
  setIsActive: (active: boolean) => void;
  setText: (newText: string) => void;
}

// Create the context with an initial empty object
const ModelContext = createContext<ModelContextValues | undefined>(undefined);

// Create a custom hook to use the context
export const useModelContext = (): ModelContextValues => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext must be used within a ModelContextProvider');
  }
  return context;
};

// Create a context provider component
interface ModelContextProviderProps {
  children: ReactNode;
}

export const ModelContextProvider: React.FC<ModelContextProviderProps> = ({ children }) => {
  const [fixedMode, setFixedMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('');

  const contextValues: ModelContextValues = {
    fixedMode,
    isActive,
    text,
    setFixedMode,
    setIsActive,
    setText,
  };

  return <ModelContext.Provider value={contextValues}>{children}</ModelContext.Provider>;
};
