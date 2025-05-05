// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";

// const FIELD_TYPES = ["input", "radio", "select", "image"];
// const OPERATORS = ["equals", "not equals"];

// const DynamicFormBuilder = ({
//   handleServiceChange,
//   serviceParams,
//   defaultValue,
// }) => {
//   const [steps, setSteps] = useState([]);
//   console.log("🚀 ~ steps:", steps);
//   const [fieldValues, setFieldValues] = useState({}); // for condition testing
//   const [errors, setErrors] = useState({});
//   const [editingFieldPath, setEditingFieldPath] = useState(null); // New

//   useEffect(() => {
//     if (defaultValue?.length > 0) {
//       setSteps(defaultValue);
//     }
//   }, [defaultValue]);

//   const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

//   const updateStepsState = (updated) => {
//     setSteps(updated);
//     const { serviceId, serviceFieldId, fieldName } = serviceParams;
//     handleServiceChange(serviceId, serviceFieldId, fieldName, updated);
//   };

//   const getNestedSteps = (base, path) =>
//     path.reduce(
//       (acc, key) => (key === "subSteps" ? acc.subSteps : acc[key]),
//       base
//     );

//   const addStep = (path = []) => {
//     const updated = deepClone(steps);
//     const ref = path.length === 0 ? updated : getNestedSteps(updated, path);
//     ref.push({ stepName: "", fields: [], subSteps: [] });
//     updateStepsState(updated);
//   };
//   const shouldRenderField = (field, formValues) => {
//     if (!field.condition) return true;

//     const { fieldName, operator, value } = field.condition;
//     const actualValue = formValues[fieldName];

//     switch (operator) {
//       case "equals":
//         return actualValue === value;
//       case "not_equals":
//         return actualValue !== value;
//       default:
//         return false;
//     }
//   };
//   const removeStep = (path, index) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.splice(index, 1);
//     updateStepsState(updated);
//   };

//   const addField = (path) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.fields.push({
//       type: "input",
//       fieldName: "",
//       label: "",
//       options: [],
//       condition: null,
//       value: "",
//       required: false,
//     });
//     updateStepsState(updated);
//   };

//   const removeField = (path, index) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.fields.splice(index, 1);
//     updateStepsState(updated);
//   };

//   const updateStepName = (path, value) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.stepName = value;
//     updateStepsState(updated);
//   };

//   const updateField = (path, index, key, value) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     const field = ref.fields[index];

//     field[key] = value;

//     if (key === "type" && !["select", "radio"].includes(value)) {
//       field.options = [];
//     }

//     updateStepsState(updated);
//   };

//   const updateFieldValue = (fieldName, value) => {
//     setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const updateOption = (path, fieldIndex, optionIndex, value) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.fields[fieldIndex].options[optionIndex] = value;
//     updateStepsState(updated);
//   };

//   const addOption = (path, fieldIndex) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     ref.fields[fieldIndex].options.push("");
//     updateStepsState(updated);
//   };

//   const updateCondition = (path, fieldIndex, key, value) => {
//     const updated = deepClone(steps);
//     const ref = getNestedSteps(updated, path);
//     const field = ref.fields[fieldIndex];

//     if (!field.condition) {
//       field.condition = { fieldName: "", operator: "equals", value: "" };
//     }

//     field.condition[key] = value;
//     updateStepsState(updated);
//     // Set editing field path to keep it visible while configuring
//     setEditingFieldPath(`${path.join("-")}-${fieldIndex}`);
//   };

//   const evaluateCondition = (condition, pathKey) => {
//     if (!condition || !condition.fieldName) return true;
//     if (pathKey === editingFieldPath) return true;

//     const actual = fieldValues[condition.fieldName];
//     const expected = condition.value;

//     switch (condition.operator) {
//       case "equals":
//         return actual === expected;
//       case "not equals":
//         return actual !== expected;
//       default:
//         return true;
//     }
//   };

//   const getAllFieldNames = (stepList) => {
//     let names = [];
//     stepList.forEach((step) => {
//       step.fields.forEach((f) => f.fieldName && names.push(f.fieldName));
//       if (step.subSteps?.length) {
//         names = names.concat(getAllFieldNames(step.subSteps));
//       }
//     });
//     return names;
//   };

//   const validateFields = () => {
//     let newErrors = {};
//     const checkSteps = (stepList) => {
//       stepList.forEach((step) => {
//         step.fields.forEach((field) => {
//           const isVisible = evaluateCondition(field.condition);
//           if (isVisible && field.required && !fieldValues[field.fieldName]) {
//             newErrors[field.fieldName] = "This field is required.";
//           }
//         });
//         if (step.subSteps?.length) checkSteps(step.subSteps);
//       });
//     };
//     checkSteps(steps);
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleFinalValidation = () => {
//     if (validateFields()) {
//       alert("Form is valid!");
//     } else {
//       alert("Please fill required fields.");
//     }
//   };

//   const renderSteps = (stepList, path = []) =>
//     stepList.map((step, index) => {
//       const stepPath = [...path, index];

//       return (
//         <div
//           key={stepPath.join("-")}
//           className="border p-4 mb-4 bg-white rounded shadow"
//         >
//           <div className="flex items-center gap-2">
//             <input
//               className="border p-2 flex-1"
//               value={step.stepName}
//               onChange={(e) => updateStepName(stepPath, e.target.value)}
//               placeholder="Step Name"
//             />
//             <button
//               className="text-red-500"
//               onClick={() => removeStep(path, index)}
//             >
//               🗑️
//             </button>
//           </div>

//           {step.fields.map((field, fieldIndex) => {
//             const pathKey = `${stepPath.join("-")}-${fieldIndex}`;
//             if (!evaluateCondition(field.condition, pathKey)) return null;

//             return (
//               <div
//                 key={fieldIndex}
//                 className="mt-3 p-2 border rounded"
//                 onClick={() => setEditingFieldPath(pathKey)}
//               >
//                 <div className="flex gap-2 mb-2 items-center">
//                   <select
//                     className="border p-2"
//                     value={field.type}
//                     onChange={(e) =>
//                       updateField(stepPath, fieldIndex, "type", e.target.value)
//                     }
//                   >
//                     {FIELD_TYPES.map((type) => (
//                       <option key={type} value={type}>
//                         {type}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     className="border p-2 flex-1"
//                     placeholder="Field Name"
//                     value={field.fieldName}
//                     onChange={(e) =>
//                       updateField(
//                         stepPath,
//                         fieldIndex,
//                         "fieldName",
//                         e.target.value
//                       )
//                     }
//                   />
//                   <input
//                     className="border p-2 flex-1"
//                     placeholder="Label"
//                     value={field.label}
//                     onChange={(e) =>
//                       updateField(stepPath, fieldIndex, "label", e.target.value)
//                     }
//                   />
//                   <label className="flex items-center gap-1 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={field.required || false}
//                       onChange={(e) =>
//                         updateField(
//                           stepPath,
//                           fieldIndex,
//                           "required",
//                           e.target.checked
//                         )
//                       }
//                     />
//                     Required
//                   </label>
//                   <button
//                     className="text-red-500"
//                     onClick={() => removeField(stepPath, fieldIndex)}
//                   >
//                     ❌
//                   </button>
//                 </div>

//                 {(field.type === "radio" || field.type === "select") && (
//                   <div className="mb-2">
//                     {field.options.map((opt, optIndex) => (
//                       <input
//                         key={optIndex}
//                         className="border p-1 block w-full my-1"
//                         value={opt}
//                         placeholder={`Option ${optIndex + 1}`}
//                         onChange={(e) =>
//                           updateOption(
//                             stepPath,
//                             fieldIndex,
//                             optIndex,
//                             e.target.value
//                           )
//                         }
//                       />
//                     ))}
//                     <button
//                       className="text-sm text-blue-600 mt-1"
//                       onClick={() => addOption(stepPath, fieldIndex)}
//                     >
//                       ➕ Add Option
//                     </button>
//                   </div>
//                 )}

//                 <div className="mb-2">
//                   <label className="font-medium block mb-1">
//                     Condition (Hide/Show)
//                   </label>
//                   <select
//                     className="border p-1 mr-2"
//                     value={field.condition?.fieldName || ""}
//                     onChange={(e) =>
//                       updateCondition(
//                         stepPath,
//                         fieldIndex,
//                         "fieldName",
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="">Select Field</option>
//                     {getAllFieldNames(steps).map((name) => (
//                       <option key={name} value={name}>
//                         {name}
//                       </option>
//                     ))}
//                   </select>
//                   <select
//                     className="border p-1 mr-2"
//                     value={field.condition?.operator || "equals"}
//                     onChange={(e) =>
//                       updateCondition(
//                         stepPath,
//                         fieldIndex,
//                         "operator",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {OPERATORS.map((op) => (
//                       <option key={op} value={op}>
//                         {op}
//                       </option>
//                     ))}
//                   </select>
//                   <input
//                     className="border p-1"
//                     placeholder="Value"
//                     value={field.condition?.value || ""}
//                     onChange={(e) =>
//                       updateCondition(
//                         stepPath,
//                         fieldIndex,
//                         "value",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>

//                 <input
//                   className="border p-1 w-full"
//                   placeholder="Simulate Value (test)"
//                   value={fieldValues[field.fieldName] || ""}
//                   onChange={(e) =>
//                     updateFieldValue(field.fieldName, e.target.value)
//                   }
//                 />
//                 {errors[field.fieldName] && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors[field.fieldName]}
//                   </p>
//                 )}
//               </div>
//             );
//           })}

//           <div className="mt-3 flex gap-3">
//             <button
//               className="bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={() => addField(stepPath)}
//             >
//               ➕ Add Field
//             </button>
//             <button
//               className="bg-indigo-600 text-white px-3 py-1 rounded"
//               onClick={() => addStep([...stepPath, "subSteps"])}
//             >
//               ➕ Add Sub Step
//             </button>
//           </div>

//           {step.subSteps &&
//             renderSteps(step.subSteps, [...stepPath, "subSteps"])}
//         </div>
//       );
//     });

//   return (
//     <div className="p-6">
//       {renderSteps(steps)}
//       <button
//         className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
//         onClick={() => addStep()}
//       >
//         ➕ Add Top-Level Step
//       </button>

//       <button
//         className="mt-4 ml-4 bg-black text-white px-4 py-2 rounded"
//         onClick={handleFinalValidation}
//       >
//         ✅ Validate Required Fields
//       </button>
//     </div>
//   );
// };

// DynamicFormBuilder.propTypes = {
//   handleServiceChange: PropTypes.func,
//   serviceParams: PropTypes.object,
//   defaultValue: PropTypes.array,
// };

// export default DynamicFormBuilder;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FIELD_TYPES = ["input", "radio", "select", "image"];
const OPERATORS = ["equals", "not equals"];

const DynamicFormBuilder = ({
  handleServiceChange,
  serviceParams,
  defaultValue,
}) => {
  const [steps, setSteps] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [errors, setErrors] = useState({});
  const [editingFieldPath, setEditingFieldPath] = useState(null);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setSteps(defaultValue);
    }
  }, [defaultValue]);

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const updateStepsState = (updated) => {
    setSteps(updated);
    const { serviceId, serviceFieldId, fieldName } = serviceParams;
    handleServiceChange(serviceId, serviceFieldId, fieldName, updated);
  };

  const getNestedSteps = (base, path) =>
    path.reduce(
      (acc, key) => (key === "subSteps" ? acc.subSteps : acc[key]),
      base
    );

  const addStep = (path = []) => {
    const updated = deepClone(steps);
    const ref = path.length === 0 ? updated : getNestedSteps(updated, path);
    ref.push({ stepName: "", fields: [], subSteps: [] });
    updateStepsState(updated);
  };

  const removeStep = (path, index) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.splice(index, 1);
    updateStepsState(updated);
  };

  const addField = (path) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.fields.push({
      type: "input",
      fieldName: "",
      label: "",
      options: [],
      condition: null,
      value: "",
      required: false,
    });
    updateStepsState(updated);
  };

  const removeField = (path, index) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.fields.splice(index, 1);
    updateStepsState(updated);
  };

  const updateStepName = (path, value) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.stepName = value;
    updateStepsState(updated);
  };

  const updateField = (path, index, key, value) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    const field = ref.fields[index];

    field[key] = value;

    if (key === "type" && !["select", "radio"].includes(value)) {
      field.options = [];
    }

    updateStepsState(updated);
  };

  const updateFieldValue = (fieldName, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const updateOption = (path, fieldIndex, optionIndex, value) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.fields[fieldIndex].options[optionIndex] = value;
    updateStepsState(updated);
  };

  const addOption = (path, fieldIndex) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    ref.fields[fieldIndex].options.push("");
    updateStepsState(updated);
  };

  const updateCondition = (path, fieldIndex, key, value) => {
    const updated = deepClone(steps);
    const ref = getNestedSteps(updated, path);
    const field = ref.fields[fieldIndex];

    if (!field.condition) {
      field.condition = { fieldName: "", operator: "equals", value: "" };
    }

    field.condition[key] = value;
    updateStepsState(updated);
    setEditingFieldPath(`${path.join("-")}-${fieldIndex}`);
  };

  const evaluateCondition = (condition, pathKey) => {
    if (!condition || !condition.fieldName) return true;
    if (pathKey === editingFieldPath) return true;

    const actual = fieldValues[condition.fieldName];
    const expected = condition.value;

    switch (condition.operator) {
      case "equals":
        return actual === expected;
      case "not equals":
        return actual !== expected;
      default:
        return true;
    }
  };

  const getAllFieldNames = (stepList) => {
    let names = [];
    stepList.forEach((step) => {
      step.fields.forEach((f) => f.fieldName && names.push(f.fieldName));
      if (step.subSteps?.length) {
        names = names.concat(getAllFieldNames(step.subSteps));
      }
    });
    return names;
  };

  const validateFields = () => {
    let newErrors = {};
    const checkSteps = (stepList) => {
      stepList.forEach((step) => {
        step.fields.forEach((field) => {
          const isVisible = evaluateCondition(field.condition);
          if (isVisible && field.required && !fieldValues[field.fieldName]) {
            newErrors[field.fieldName] = "This field is required.";
          }
        });
        if (step.subSteps?.length) checkSteps(step.subSteps);
      });
    };
    checkSteps(steps);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalValidation = () => {
    if (validateFields()) {
      alert("Form is valid!");
    } else {
      alert("Please fill required fields.");
    }
  };

  const renderSteps = (stepList, path = []) =>
    stepList.map((step, index) => {
      const stepPath = [...path, index];
      return (
        <div
          key={stepPath.join("-")}
          className="border p-4 mb-4 bg-white rounded shadow"
        >
          <div className="flex items-center gap-2">
            <input
              className="border p-2 flex-1"
              value={step.stepName}
              onChange={(e) => updateStepName(stepPath, e.target.value)}
              placeholder="Step Name"
            />
            <button
              className="text-red-500"
              onClick={() => removeStep(path, index)}
            >
              🗑️
            </button>
          </div>

          {step.fields.map((field, fieldIndex) => {
            const pathKey = `${stepPath.join("-")}-${fieldIndex}`;
            {
              /* if (!evaluateCondition(field.condition, pathKey)) return null; */
            }
            return (
              <div
                key={fieldIndex}
                className="mt-3 p-2 border rounded"
                onClick={() => setEditingFieldPath(pathKey)}
              >
                <div className="flex gap-2 mb-2 items-center">
                  <select
                    className="border p-2"
                    value={field.type}
                    onChange={(e) =>
                      updateField(stepPath, fieldIndex, "type", e.target.value)
                    }
                  >
                    {FIELD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border p-2 flex-1"
                    placeholder="Field Name"
                    value={field.fieldName}
                    onChange={(e) =>
                      updateField(
                        stepPath,
                        fieldIndex,
                        "fieldName",
                        e.target.value
                      )
                    }
                  />
                  <input
                    className="border p-2 flex-1"
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) =>
                      updateField(stepPath, fieldIndex, "label", e.target.value)
                    }
                  />
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={field.required || false}
                      onChange={(e) =>
                        updateField(
                          stepPath,
                          fieldIndex,
                          "required",
                          e.target.checked
                        )
                      }
                    />
                    Required
                  </label>
                  <button
                    className="text-red-500"
                    onClick={() => removeField(stepPath, fieldIndex)}
                  >
                    ❌
                  </button>
                </div>

                {(field.type === "radio" || field.type === "select") && (
                  <div className="mb-2">
                    {field.options.map((opt, optIndex) => (
                      <input
                        key={optIndex}
                        className="border p-1 block w-full my-1"
                        value={opt}
                        placeholder={`Option ${optIndex + 1}`}
                        onChange={(e) =>
                          updateOption(
                            stepPath,
                            fieldIndex,
                            optIndex,
                            e.target.value
                          )
                        }
                      />
                    ))}
                    <button
                      className="text-sm text-blue-600 mt-1"
                      onClick={() => addOption(stepPath, fieldIndex)}
                    >
                      ➕ Add Option
                    </button>
                  </div>
                )}

                <div className="mb-2">
                  <label className="font-medium block mb-1">
                    Condition (Hide/Show)
                  </label>
                  <select
                    className="border p-1 mr-2"
                    value={field.condition?.fieldName || ""}
                    onChange={(e) =>
                      updateCondition(
                        stepPath,
                        fieldIndex,
                        "fieldName",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Field</option>
                    {getAllFieldNames(steps).map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border p-1 mr-2"
                    value={field.condition?.operator || "equals"}
                    onChange={(e) =>
                      updateCondition(
                        stepPath,
                        fieldIndex,
                        "operator",
                        e.target.value
                      )
                    }
                  >
                    {OPERATORS.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border p-1"
                    placeholder="Value"
                    value={field.condition?.value || ""}
                    onChange={(e) =>
                      updateCondition(
                        stepPath,
                        fieldIndex,
                        "value",
                        e.target.value
                      )
                    }
                  />
                </div>

                <input
                  className="border p-1 w-full"
                  placeholder="Simulate Value (test)"
                  value={fieldValues[field.fieldName] || ""}
                  onChange={(e) =>
                    updateFieldValue(field.fieldName, e.target.value)
                  }
                />
                {errors[field.fieldName] && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[field.fieldName]}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => addField(stepPath)}
            >
              ➕ Add Field
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => addStep([...stepPath, "subSteps"])}
            >
              ➕ Add Sub-Step
            </button>
          </div>

          {step.subSteps && step.subSteps.length > 0 && (
            <div className="ml-6 mt-4">
              {renderSteps(step.subSteps, [...stepPath, "subSteps"])}
            </div>
          )}
        </div>
      );
    });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dynamic Form Builder</h2>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => addStep()}
      >
        ➕ Add Step
      </button>
      {renderSteps(steps)}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleFinalValidation}
      >
        ✅ Validate Form
      </button>
    </div>
  );
};

DynamicFormBuilder.propTypes = {
  handleServiceChange: PropTypes.func.isRequired,
  serviceParams: PropTypes.object.isRequired,
  defaultValue: PropTypes.array,
};

export default DynamicFormBuilder;
