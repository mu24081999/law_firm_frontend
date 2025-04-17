import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./number.css";

const NumberInputField = React.forwardRef((props, ref) => {
  const {
    title,
    style,
    errors,
    label,
    defaultValue,
    isDisabled, // Added 'isDisabled' prop
    placeholder, // Added 'placeholder' prop
    svg,
    setValue,
  } = props;
  let err = _.get(errors, props.name);
  return (
    <div className="w-full">
      <div
        className={`w-full  ${
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
              {label && <h1 className="font-extrabold pb-2">{label}</h1>}

              <label className="relative block border rounded-xl border-gray-400">
                <span class="absolute inset-y-0 left-0 flex items-center mx-2 pl-2">
                  {svg}
                </span>

                <PhoneInput
                  inputProps={{
                    name: title,
                    autoFocus: true,
                    style: {
                      width: "100%",
                      height: "48px",
                      borderRadius: "10px",
                    },
                  }}
                  country={"us"}
                  value={field.value}
                  //   onlyCountries={['cu','cw','kz']}
                  //   preferredCountries={['cu','cw','kz']}
                  onChange={(phone, data) => {
                    // Extract the country ISO code and phone number separately
                    const countryCode = data.countryCode;
                    // const phoneNumber = phone.replace(`${data.dialCode}`, "");
                    setValue("countryCode", countryCode);
                    setValue("dialCode", data.dialCode);
                    field.onChange(phone);

                    if (props.onChange) {
                      props.onChange(phone);
                    }
                  }}
                  placeholder={placeholder}
                  enableAreaCodeStretch="true"
                  enableClickOutside="true"
                  enableSearchText="true"
                  enableTerritories="true"
                  enableLongNumbers="true"
                  disabled={isDisabled}
                  countryCodeEditable="true"
                />
              </label>
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
export default NumberInputField;
