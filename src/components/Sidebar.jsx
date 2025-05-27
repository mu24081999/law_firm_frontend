import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
function Sidebar({ items, userType, firm, handleSidebarToggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    handleSidebarToggle(!isOpen);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md text-white md:hidden ${
          firm?.buttonTextColor
            ? "hover:bg-[" + firm?.primaryButtonColor + "]"
            : "hover:bg-indigo-700"
        }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        style={{
          backgroundColor: firm?.primaryButtonColor || "#4F46E5",
        }}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ backgroundColor: firm?.sidebarColor || "black" }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-600 shadow-sm">
          <span
            className="flex items-center space-x-2"
            style={{ color: firm?.sidebarTextColor || "white" }}
          >
            {firm?.logoUrl && (
              <img
                src={firm?.logoUrl}
                alt="Logo"
                className="h-12 w-auto rounded-full animate-pulse
"
              />
            )}
            <span className="text-xl font-bold">
              {/* {userType} Portal */}
              {firm?.firmName || userType + " Portal"}
            </span>
          </span>
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-400 hover:text-white md:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        {/* 
        <nav className="px-2 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 mt-2 text-sm rounded-lg transition-colors duration-200 `}
              style={{
                color: firm?.sidebarTextColor || "white",
                backgroundColor:
                  location.pathname === item.path
                    ? firm?.sidebarHoverColor || "#ffffff61"
                    : "transparent",
              }}
              onClick={() => {
                window.innerWidth < 768 && setIsOpen(false);
                window.innerWidth < 768 && handleSidebarToggle(false);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav> */}
        <nav className="px-2 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {items.map((item) => (
            <div key={item.path || item.name} className="mb-1">
              {/* Parent Link (if it has a path) */}
              {item.path ? (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-200`}
                  style={{
                    color: firm?.sidebarTextColor || "white",
                    backgroundColor:
                      location.pathname === item.path
                        ? firm?.sidebarHoverColor || "#ffffff61"
                        : "transparent",
                  }}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                      handleSidebarToggle(false);
                    }
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ) : (
                <div
                  className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg"
                  style={{
                    color: firm?.sidebarTextColor || "white",
                  }}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </div>
              )}

              {/* Children */}
              {item.children && item.children.length > 0 && (
                <div className="ml-8 mt-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors duration-200`}
                      style={{
                        color: firm?.sidebarTextColor || "white",
                        backgroundColor:
                          location.pathname === child.path
                            ? firm?.sidebarHoverColor || "#ffffff61"
                            : "transparent",
                      }}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                          handleSidebarToggle(false);
                        }
                      }}
                    >
                      {child.icon}
                      <span className="ml-2">{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content wrapper - adds margin for sidebar */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {/* Your main content goes here */}
      </div>
    </>
  );
}
Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  userType: PropTypes.string.isRequired,
  firm: PropTypes.object,
  handleSidebarToggle: PropTypes.func,
};
export default Sidebar;
