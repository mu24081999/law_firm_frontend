import { useState, useMemo, useEffect, useRef } from "react";
import MainContext from "./MainContext";
import _ from "lodash";
const MainProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const setIsCollapsed_ = (value) => {
    setIsCollapsed(value);
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed_,
    }),
    [setIsCollapsed_, isCollapsed]
  );
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
