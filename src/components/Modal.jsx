import React from "react";
import PropTypes from "prop-types";
const Modal = ({
  isOpen,
  onClose,
  title = "Default Title",
  body = "Default body content goes here.",
  size = "md", // Default size
  noStartMargin = false,
}) => {
  const sizeClasses = {
    sm: "w-10/12 md:w-1/4",
    md: "w-10/12 md:w-1/2 mt-12",
    lg: "w-10/12 md:w-3/4",
    xl: "w-full  h-screen overflow-scroll",
  };

  return (
    <div
      className={`
      ${noStartMargin ? "" : "ml-64"}
       :bg-gray-800 :text-white backdrop-blur-sm fixed inset-0 flex justify-center items-start md:items-center md:pt-0 bg-gray-800 bg-opacity-30 transition-opacity duration-1000 ${
         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
       }`}
    >
      <div
        className={`relative bg-white ${
          sizeClasses[size]
        }    :bg-gray-800 rounded shadow-lg transform transition-all duration-1000 ${
          isOpen ? "translate-y-0 scale-100" : "translate-y-full scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-2 text-2xl w-10  focus:outline-none mt-3"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="px-4 py-3 border-b broder-black border-gray-200">
          <h2 className="text-xl text-center font-semibold  :text-white">
            {title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="w-full p-3 overflow-scroll rounded-lg bg-white mt-1">
          {body}
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.any,
  noStartMargin: PropTypes.bool,
  size: PropTypes.string,
};

export default Modal;
