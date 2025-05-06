// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { useSelector } from "react-redux";

// const Button = ({
//   children,
//   onClick,
//   type = "button",
//   variant = "primary",
//   size = "md",
//   disabled = false,
//   className = "",
//   loading = false,
// }) => {
//   const { user } = useSelector((state) => state.auth);
//   const [primaryButtonColor, setPrimaryButtonColor] = useState(null);
//   const [buttonTextColor, setButtonTextColor] = useState(null);
//   useEffect(() => {
//     if (user?.firm?.primaryButtonColor) {
//       setPrimaryButtonColor(user.firm.primaryButtonColor);
//     }
//   }, [user]);
//   useEffect(() => {
//     if (user?.firm?.buttonTextColor) {
//       setButtonTextColor(user.firm.buttonTextColor);
//     }
//   }, [user]);
//   const baseStyles = `font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded`;

//   const variantStyles = {
//     primary: primaryButtonColor
//       ? `bg-[${primaryButtonColor}] text-[${buttonTextColor}] hover:opacity-90 focus:ring-[${primaryButtonColor}]`
//       : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary:
//       "sm:w-full md:w-fit bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
//     danger:
//       "sm:w-full md:w-fit bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
//     success:
//       "sm:w-full md:w-fit bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
//   };
//   console.log("🚀 ~ variantStyles:", variantStyles);

//   const sizeStyles = {
//     sm: "px-3 py-1 text-sm w-fit",
//     md: "px-4 py-2 sm:w-full",
//     lg: "px-6 py-4 text-lg sm:w-full",
//   };

//   return (
//     <>
//       {loading ? (
//         <button
//           disabled
//           type="button"
//           className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-indigo-700 focus:text-indigo-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
//         >
//           <svg
//             aria-hidden="true"
//             role="status"
//             className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
//             viewBox="0 0 100 101"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M100 50.5908C100 78.2051 77.6142 100.591..."
//               fill="currentColor"
//             />
//             <path d="M93.9676 39.0409C96.393..." fill="#1C64F2" />
//           </svg>
//           Loading...
//         </button>
//       ) : (
//         <button
//           type={type}
//           onClick={onClick}
//           disabled={disabled}
//           className={classNames(
//             baseStyles,
//             variantStyles[variant],
//             sizeStyles[size],
//             disabled ? "opacity-50 cursor-not-allowed" : "",
//             className
//           )}
//         >
//           {children}
//         </button>
//       )}
//     </>
//   );
// };

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func,
//   type: PropTypes.oneOf(["button", "submit", "reset"]),
//   variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
//   size: PropTypes.oneOf(["sm", "md", "lg"]),
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   loading: PropTypes.bool,
// };

// export default Button;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  loading = false,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [buttonStyles, setButtonStyles] = useState({
    backgroundColor: null,
    textColor: null,
    ringColor: null,
  });

  useEffect(() => {
    if (user?.firm) {
      setButtonStyles({
        backgroundColor: user.firm.primaryButtonColor || null,
        textColor: user.firm.buttonTextColor || null,
        ringColor: user.firm.primaryButtonColor || null,
      });
    }
  }, [user?.firm]);

  const baseStyles = `font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 rounded`;

  const sizeStyles = {
    sm: "px-3 py-1 text-sm w-fit",
    md: "px-4 py-2 sm:w-full",
    lg: "px-6 py-4 text-lg sm:w-full",
  };

  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        if (buttonStyles.backgroundColor && buttonStyles.textColor) {
          return {
            style: {
              backgroundColor: buttonStyles.backgroundColor,
              color: buttonStyles.textColor,
            },
            ring: buttonStyles.ringColor,
          };
        }
        return {
          className:
            "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        };
      case "secondary":
        return {
          className:
            "sm:w-full md:w-fit bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
        };
      case "danger":
        return {
          className:
            "sm:w-full md:w-fit bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        };
      case "success":
        return {
          className:
            "sm:w-full md:w-fit bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
        };
      default:
        return { className: "" };
    }
  };

  const variantResult = getVariantStyle();

  return (
    <>
      {loading ? (
        <button
          disabled
          type="button"
          className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-indigo-700 focus:text-indigo-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        >
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591..."
              fill="currentColor"
            />
            <path d="M93.9676 39.0409C96.393..." fill="#1C64F2" />
          </svg>
          Loading...
        </button>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={classNames(
            baseStyles,
            sizeStyles[size],
            variantResult.className,
            disabled ? "opacity-50 cursor-not-allowed" : "",
            className
          )}
          style={variantResult.style}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

export default Button;
