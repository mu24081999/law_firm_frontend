import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const InputField = React.forwardRef((props, ref) => {
  // const { field, fieldState } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const [inputType, setInputType] = useState(null);
  const {
    // title,
    // style,
    description,
    isHighLight = false,
    type,
    errors,
    label,
    defaultValue,
    // customStyle,
    // onChange,
    // ellipses,
    // rules,
    // control,
    // min,
    // isDisabled,
    // placeholder,
    svg,
    ...others
  } = props;

  let err = _.get(errors, props.name);
  useEffect(() => {
    setInputType(type);
    return () => {};
  }, [type]);
  const typeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType(type);
    }
  };
  return (
    <div className="w-full">
      <div
        className={`w-full ${
          props?.rules && err
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <>
              {/* {label && (
                <h1 className="text-black dark:text-white text-sm pb-1">
                  {label}
                </h1>
              )} */}

              <div className="relative">
                {svg && (
                  <span
                    onClick={() => type === "password" && typeHandler()}
                    className={`absolute inset-y-0 right-0 px-3 my-1 flex items-center mx-1  cursor-pointer`}
                  >
                    {svg}
                  </span>
                )}
                <input
                  {...props}
                  {...field}
                  id={props.name} // Set an ID here
                  ref={ref}
                  type={inputType || ""}
                  onBlurCapture={() => setFocusState(false)}
                  onFocus={() => setFocusState(true)}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e, props?.name);
                    }
                  }}
                  placeholder={label}
                  min={type === "number" && !props.min ? 0 : props.min}
                  disabled={props.isDisabled}
                  value={field.value}
                  className={`bg-white rounded px-2 py-2 peer w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow g-6 focus:ring-1 focus:ring-indigo-400  mt-1 mb-1 ${
                    props.isDisabled && "bg-gray-400 cursor-not-allowed"
                  } ${isHighLight && " bg-highLight "}`}
                  style={{ fontSize: "14.5px" }}
                  {...others}
                />
              </div>
              {description && <p className="pb-5 pt-1 ps-1">{description}</p>}
            </>
          )}
        />
      </div>
      {props.rules && err && (
        <p
          className="text-red-600 p-1 h-3 bg-inherit"
          style={{ fontSize: "14.5px" }}
          id="email-error"
        >
          {props.rules && err?.message}
        </p>
      )}
    </div>
  );
});
InputField.displayName = "InputField";
InputField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  svg: PropTypes.string,

  style: PropTypes.object,
  isHighLight: PropTypes.bool,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  customStyle: PropTypes.object,
  onChange: PropTypes.func,
  ellipses: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  min: PropTypes.number,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputField;
