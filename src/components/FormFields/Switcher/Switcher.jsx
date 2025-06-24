import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

const Switcher = React.forwardRef(
  (
    { name, control, rules, defaultValue, onChange: externalOnChange, label },
    ref
  ) => {
    const [isChecked, setIsChecked] = useState(defaultValue || false);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          useEffect(() => {
            setIsChecked(value ?? false);
          }, [value]);

          const handleCheckboxChange = (e) => {
            const newValue = e.target.checked;
            setIsChecked(newValue);
            onChange(newValue); // update react-hook-form value
            externalOnChange?.(e); // call external callback if provided
          };

          return (
            <label className="flex gap-5 cursor-pointer select-none items-center bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
              <div className="relative ">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`block h-8 w-14 rounded-full ${
                    isChecked ? "bg-indigo-700" : "bg-[#E5E7EB]"
                  } `}
                ></div>
                <div
                  className={`dot absolute  top-1 flex h-6 w-6 items-center justify-center rounded-full transition-all delay-300 ${
                    isChecked ? "bg-white right-1" : "bg-white left-1"
                  }`}
                >
                  <span className={`${isChecked ? "" : "hidden "}`}>
                    <FaCheck />
                  </span>
                  <span className={`${isChecked ? "hidden" : ""}`}>
                    <svg
                      className="h-4 w-4 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
              {label && <h3>{label}</h3>}
            </label>
          );
        }}
      />
    );
  }
);

Switcher.displayName = "Switcher";

Switcher.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  defaultValue: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default Switcher;
