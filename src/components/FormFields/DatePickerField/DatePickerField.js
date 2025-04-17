import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.module.css";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import "./DatePickerStyles.css"; // Create this file for custom styles

const DatePickerFeild = React.forwardRef((props, ref) => {
  // console.log("🚀 ~ file: datePicker.js:8 ~ DatePickerFeild ~ ref:", ref);
  const [focusState, setFocusState] = useState(false);
  const {
    title,
    style,
    type,
    errors,
    defaultValue,
    isDisabled,
    noShowTime,
    dateTime = true,
    customStyles,
    onChange,
    maxDate,
    label,
    isHighLight = false,
    showYearPicker,
    placeHolder,
    ...others
  } = props;
  const { field, fieldState } = useController(props);
  let err = _.get(errors, props.name);
  // const inputRef = useRef(null);
  // useEffect(() => {
  //     inputRef.current.setOpen(false)
  // }, [])
  return (
    <>
      <Controller
        autoFocus={false}
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field }) => {
          function validDate(x) {
            let y = new Date(x);
            return y instanceof Date && !isNaN(y);
          }
          let updateDate = new Date(field?.value);
          if (!validDate(field?.value)) {
            updateDate = "";
          }
          return (
            <div className="flex flex-col">
              {label && <div className="font-extrabold pb-2">{label}</div>}
              <DatePicker
                {...field}
                ref={ref}
                autoComplete="off"
                autoFocus={false}
                placeholderText={placeHolder ? placeHolder : "Select Date"}
                onChange={(e) => {
                  // field.onChange(moment(e).format("YYYY-MM-DD hh:mm:ss"));
                  field.onChange(e);
                  if (onChange) {
                    onChange(e, props?.name);
                  }
                }}
                selected={updateDate}
                //new change for handling reset (start)
                // value={defaultValue}
                //(end)
                onFocus={() => setFocusState(true)}
                onBlur={() => {
                  field.onBlur();
                  setFocusState(false);
                }}
                dateFormat={
                  showYearPicker
                    ? "yyyy"
                    : noShowTime
                    ? "YYYY-MM-dd"
                    : "YYYY-MM-dd hh:mm:ss"
                }
                className={` text-sm text-gray-600 py-3 w-full rounded-lg border border-gray-200   ${
                  isDisabled ? "opacity-50" : ""
                }
                                   ${isHighLight && " focus:bg-dark   "}`}
                placeholder={props.placeholder ? props.placeholder : ""}
                disabled={isDisabled}
                maxDate={props?.maxDate}
                minDate={props?.minDate}
                maxTime={props?.maxTime}
                minTime={props?.minTime}
                showTimeSelect={noShowTime ? false : true}
                isClearable
                timeFormat="hh:mm:ss"
                timeIntervals={15}
                showYearPicker={showYearPicker ? showYearPicker : false}
                {...others}
              />
            </div>
          );
        }}
      />
      {/* </div> */}
      {props.rules && err && (
        <p className=" text-xs text-red-600 h-3" id="email-error">
          {props.rules && err && props.rules && err.message}
        </p>
      )}
    </>
  );
});

DatePickerFeild.displayName = "DatePickerFeild";
DatePickerFeild.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderTopLeftRadius: PropTypes.string,
  borderBottomLeftRadius: PropTypes.string,
  borderTopRightRadius: PropTypes.string,
  borderBottomRightRadius: PropTypes.string,
  CustomOption: PropTypes.string,
  getOptionLable: PropTypes.func,
  padding: PropTypes.number,
  getOptionLabel: PropTypes.func,
  optionData: PropTypes.array,
  showLabel: PropTypes.bool,
  isLoading: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  customStyles: PropTypes.object,
  showLabel: PropTypes.bool,
  placeHolder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.bool,
  onFocus: PropTypes.bool,
  ellipses: PropTypes.bool,
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  menuPlacement: PropTypes.string,
  isHighLight: PropTypes.string,
  onInputChange: PropTypes.func,
  handleSelectOption: PropTypes.func,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  min: PropTypes.number, // Added 'min' prop type validation
  isDisabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  isMulti: PropTypes.bool,
  dateTime: PropTypes.bool,
  showYearPicker: PropTypes.bool,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default DatePickerFeild;
