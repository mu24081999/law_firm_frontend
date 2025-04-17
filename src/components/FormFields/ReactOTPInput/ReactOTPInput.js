import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import OtpInput from "react-otp-input";

const ReactOTPInput = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [otp, setOtp] = useState("");
  console.log("🚀 ~ ReactOTPInput ~ otp:", otp);
  const {
    title,
    style,
    isHighLight = false,
    handleResendClick,
    type,
    errors,
    label,
    defaultValue,
    customStyle,
    onChange,
    ellipses,
    rules,
    control, // Added 'control' prop
    min, // Added 'min' prop
    isDisabled, // Added 'isDisabled' prop
    placeholder, // Added 'placeholder' prop
    svg,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  const handleChange = (otp) => {
    console.log(otp); // Debugging line
    setOtp(otp);
  };
  return (
    <div className="w-full">
      <div
        className={`w-full   ${
          style ? "bg-white" : ""
        } bg-white focus-within:bg-white rounded-lg ${
          props?.rules && err
            ? "focus-within:border-red border-red"
            : "focus-within:border-primary"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          defaultValue={defaultValue ? defaultValue : ""}
          render={({ field }) => (
            <>
              <button
                onClick={handleResendClick}
                className="float-end text-sky-600"
              >
                Resend
              </button>
              {label && <h1 className="font-extrabold pb-2">{label}</h1>}
              <OtpInput
                value={field.value || ""}
                onChange={(otp) => {
                  console.log("OTP Value:", otp); // Debugging line
                  field.onChange(otp); // Update the form value
                }}
                numInputs={6}
                inputStyle={"rounded py-5 text-lg"}
                renderSeparator={<span>-</span>}
                renderInput={(inputProps) => (
                  <input {...inputProps} style={{ textAlign: "center" }} />
                )}
              />
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
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
    </div>
  );
});
export default ReactOTPInput;
