import { useContext } from "react";
import MainContext from "./MainContext";

const useMain = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMain must be used within an AuthProvider");
  }

  return context;
};

export default useMain;
