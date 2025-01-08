import React from "react";
import { UserDataContext } from "../contexts/UserContext";

export const useUserData = () => {
  return React.useContext(UserDataContext);
};
