import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type TUser = {
  email: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
};

type UserDataContextType = {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
};

export const UserDataContext = createContext<UserDataContextType>({
  user: {
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  },
  setUser: () => {}, // Default function to prevent runtime errors
});



const UserContext = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState<TUser>({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
