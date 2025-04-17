import React from "react";
import { useController, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import _ from "lodash";

const Checkbox = React.forwardRef((props, ref) => {
  const {
    field,
    // fieldState
  } = useController(props);
  const {
    label,
    style,
    // type,
    errors,
    defaultValue,
    // labelClass,
    disabled,
    // ...others
  } = props;
  let err = _.get(errors, props.name);

  return (
    <>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <>
            <div className=" flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 cursor-pointer pe-5 ">
              <input
                {...field}
                ref={ref}
                checked={
                  field.value === "1" || field.value === true ? true : false
                }
                type="checkbox"
                disabled={disabled}
                onChange={(e) => {
                  onChange(e.target.checked);
                  if (props.onChange) {
                    props.onChange(e);
                  }
                }}
                style={style ? style : {}}
                className={`w-4 h-4 text-[#006aff] bg-gray-100 border-gray-300 rounded focus:ring-[#006aff] dark:focus:ring-[#006aff] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
              />
              <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
              </label>
            </div>
            {props.rules && err && props.rules && err?.message ? (
              <p className=" text-xs text-red-600 h-3" id="email-error">
                {props.rules && err && props.rules && err?.message}
              </p>
            ) : (
              ""
            )}
          </>
        )}
      />
    </>
  );
});

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
  label: PropTypes.string,
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
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  min: PropTypes.number, // Added 'min' prop type validation
  labelClass: PropTypes.string,
  disabled: PropTypes.bool, // Added 'isDisabled' prop type validation

  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default Checkbox;
