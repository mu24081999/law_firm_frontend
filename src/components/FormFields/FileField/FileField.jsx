import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { FaImage } from "react-icons/fa";
const FileField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

  const { label, control, name, rules, onChange, ...others } = props;

  return (
    <div className="w-full">
      {label && <h1 className="font-extrabold pb-2">{label}</h1>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor={`dropzone-${name}`}
              className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 :hover:bg-gray-800 :bg-gray-700 hover:bg-gray-100 :border-gray-600 :hover:border-gray-500 :hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center">
                {/* <FaImage size={50} color="#006aff" className="" /> */}
                <p className="mb-2 text-sm text-gray-500 :text-gray-400">
                  <span className="font-semibold">
                    <p className=" w-fit  p-2 text-white bg-indigo-600 to-white-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 :focus:ring-blue-800 font-bold rounded-lg text-sm px-5 text-center me-2 mb-2">
                      Upload Photos
                    </p>
                  </span>{" "}
                </p>
                <p className="text-xs text-gray-500 :text-gray-400">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                id={`dropzone-${name}`}
                type="file"
                {...field}
                multiple={props.multiple}
                ref={ref}
                value={fileName}
                className="hidden"
                onChange={(e) => {
                  setFileName(e.target.value);
                  const filesArray = Array.from(e.currentTarget.files);
                  setFiles(filesArray);
                  let file = props.multiple
                    ? e.currentTarget.files
                    : e.currentTarget.files[0];
                  field.onChange(file);
                  if (props.onChange) {
                    props.onChange(e.currentTarget.files, props?.name);
                  }
                }}
                {...others}
              />
            </label>
          </div>
        )}
      />
      <div>
        <div className="flex py-4 gap-2 flex-wrap">
          {files?.length > 0 &&
            files?.map((file, index) => (
              <div
                key={index}
                className="w-[150px] rounded-xl h-[130px] border border-gray-950"
              >
                <img
                  className="w-[150px] rounded-xl h-[128px]"
                  src={URL.createObjectURL(file)}
                  alt={index}
                />
              </div>
            ))}
        </div>
      </div>
      {rules && fieldState.error && (
        <p
          className="text-red-600 p-1 h-3 bg-inherit"
          style={{ fontSize: "14.5px" }}
        >
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
});

FileField.propTypes = {
  label: PropTypes.string,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func,
};

FileField.defaultProps = {
  label: "",
  rules: {},
};
FileField.displayName = "FileField";

export default FileField;
