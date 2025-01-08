import { useContext } from "react";
import { CaptainDataContext } from "../contexts/CapatainContext";

export const useCaptainData = () => {
  return useContext(CaptainDataContext);
};
