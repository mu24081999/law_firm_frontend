import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import _ from "lodash";
export const TextAreaField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const {
    title,
    isHighLight = false,
    style,
    type,
    errors,
    defaultValue,
    disabled = false,
    showTextLimit,
    label,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  return (
    <>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div>
            {/* {label && <h1 className="font-extrabold pb-2">{label}</h1>} */}
            <textarea
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              style={{ borderRadius: "16px !important" }}
              disabled={disabled}
              onBlurCapture={() => setFocusState(false)}
              onFocus={() => setFocusState(true)}
              rows={props.rows || 2}
              value={field.value}
              placeholder={props.label ? props.label : ""}
              className={`p-3 block w-full bg-white rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6 ${
                disabled && "bg-gray-100"
              }                     ${
                isHighLight && " bg-highLight  "
              }                            `}
            />
          </div>
        )}
      />

      {props.rules && err && (
        <p
          className="text-danger p-1 h-3 bg-inherit"
          style={{ fontSize: "14.5px" }}
          id="email-error"
        >
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
    </>
  );
});

TextAreaField.displayName = "TextAreaField";
TextAreaField.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  isHighLight: PropTypes.bool,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  disabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
  showTextLimit: PropTypes.bool,
  onChange: PropTypes.func,
  rows: PropTypes.number,
};
export default TextAreaField;
