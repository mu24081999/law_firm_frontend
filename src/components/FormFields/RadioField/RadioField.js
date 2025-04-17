import React from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const RadioField = React.forwardRef((props, ref) => {
  const { field } = useController(props);
  const {
    title,
    style,
    errors,
    defaultValue,
    labelClass,
    disabled,
    ...others
  } = props;
  let err = _.get(errors, props.name);

  return (
    <div>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className="flex min-w-[200px] justify-between items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              {...field}
              ref={ref}
              type="radio"
              checked={value === props.value}
              disabled={disabled}
              onChange={(e) => {
                onChange(props.value); // Set the value to the corresponding radio's value
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              style={style ? style : {}}
              className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                props.rules && errors && err
                  ? "border-red-600"
                  : "border-gray-100"
              } focus:shadow-none`}
            />
            <label
              htmlFor={`radio-${props.value}`} // Set unique id based on the value
              className={`w-full py-4 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300 ${labelClass}`}
            >
              {title}
            </label>
          </div>
        )}
      />
    </div>
  );
});

RadioField.propTypes = {
  title: PropTypes.string,
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
  labelClass: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired, // Ensure the 'value' prop is required
};

export default RadioField;
