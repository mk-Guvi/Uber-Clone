import { createContext, useState, ReactNode } from "react";


export type TCaptain = {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  socketId?: string;
  status: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: string;
  };
  location: {
    lat: number;
    lng: number;
  };
};

// Define the context type
interface CaptainContextType {
  captain: TCaptain | null;
  setCaptain: React.Dispatch<React.SetStateAction<TCaptain | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  updateCaptain: (captainData: TCaptain) => void;
}

// Create context with proper initial values
export const CaptainDataContext = createContext<CaptainContextType>({
  captain: null,
  setCaptain: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
  updateCaptain: () => {},
});

// Type for the provider props
interface CaptainContextProviderProps {
  children: ReactNode;
}

const CaptainContext = ({ children }: CaptainContextProviderProps) => {
  const [captain, setCaptain] = useState<TCaptain | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCaptain = (captainData: TCaptain): void => {
    setCaptain(captainData);
  };

  return (
    <CaptainDataContext.Provider
      value={{
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
      }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
