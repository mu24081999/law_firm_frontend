import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";

const DynamicFormRenderer = ({ formSchema, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [flattenedSteps, setFlattenedSteps] = useState([]);
  const [errors, setErrors] = useState({});

  // Evaluate condition helper
  const evaluateCondition = (condition, currentFormData) => {
    if (!condition || !condition.fieldName) return true;
    const actualValue = currentFormData[condition.fieldName];
    const expectedValue = condition.value;

    switch (condition.operator) {
      case "equals":
        return actualValue === expectedValue;
      case "not equals":
        return actualValue !== expectedValue;
      default:
        return true;
    }
  };

  // Flatten steps and subSteps with condition evaluation
  const getVisibleSteps = (schema, currentFormData) => {
    const steps = [];

    const addStep = (step, parentStepName = "") => {
      const fullStepName = parentStepName
        ? `${parentStepName} → ${step.stepName}`
        : step.stepName;

      if (
        !step.condition ||
        evaluateCondition(step.condition, currentFormData)
      ) {
        steps.push({ ...step, stepName: fullStepName });

        if (step.subSteps && step.subSteps.length > 0) {
          step.subSteps.forEach((subStep) => addStep(subStep, fullStepName));
        }
      }
    };

    Array.isArray(schema) &&
      schema?.length > 0 &&
      schema.forEach((step) => addStep(step));
    return steps;
  };

  useEffect(() => {
    const initialData = {};

    const collectFields = (steps) => {
      steps?.length > 0 &&
        steps?.forEach((step) => {
          step.fields?.forEach((field) => {
            initialData[field.fieldName] = field.defaultValue || "";
          });
          if (step.subSteps) {
            collectFields(step.subSteps);
          }
        });
    };

    collectFields(formSchema);
    setFormData(initialData);
    setFlattenedSteps(getVisibleSteps(formSchema, initialData));
  }, [formSchema]);

  useEffect(() => {
    const newVisibleSteps = getVisibleSteps(formSchema, formData);
    setFlattenedSteps(newVisibleSteps);

    if (currentStepIndex >= newVisibleSteps.length) {
      setCurrentStepIndex(newVisibleSteps.length - 1);
    }
  }, [formData]);

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const validateCurrentStep = () => {
    const step = flattenedSteps[currentStepIndex];
    const newErrors = {};

    step.fields?.forEach((field) => {
      if (
        (!field.condition || evaluateCondition(field.condition, formData)) &&
        field.required &&
        (formData[field.fieldName] === "" ||
          formData[field.fieldName] === null ||
          formData[field.fieldName] === undefined)
      ) {
        newErrors[field.fieldName] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < flattenedSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToStep = (index) => {
    setCurrentStepIndex(index);
  };

  if (flattenedSteps.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No visible steps in the form.
      </div>
    );
  }

  const currentStep = flattenedSteps[currentStepIndex];

  return (
    <div className="max-w-full mx-auto bg-white shadow-xl rounded-xl p-8 border">
      {/* Step Navigation */}
      {/* <div className="flex mb-8 overflow-x-auto gap-3 border-b pb-3">
        {flattenedSteps.map((step, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`px-4 py-2 text-sm font-medium rounded ${
              index === currentStepIndex
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {step.stepName || `Step ${index + 1}`}
          </button>
        ))}
      </div> */}
      <div className="flex mb-8 overflow-x-auto gap-3 border-b pb-3">
        {flattenedSteps.map((step, index) => {
          const isCurrent = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          const canNavigate = isPast || isCurrent;

          return (
            <Button
              key={index}
              onClick={async () => {
                if (isPast || index === currentStepIndex) {
                  goToStep(index);
                } else {
                  const isValid = await validateCurrentStep(); // trigger validation only on click
                  if (isValid) goToStep(index);
                }
              }}
              // className={`px-4 py-2 min-w-[8rem] text-sm font-medium rounded transition ${
              //   isCurrent
              //     ? "bg-indigo-600 text-white"
              //     : canNavigate
              //     ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
              //     : "bg-gray-200 text-gray-400 cursor-not-allowed"
              // }`}
              disabled={!canNavigate && currentStepIndex !== index}
            >
              {step.stepName || `Step ${index + 1}`}
            </Button>
          );
        })}
      </div>

      {/* Step Content */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {currentStep.stepName || `Step ${currentStepIndex + 1}`}
        </h2>

        {currentStep.fields.map((field, fieldIndex) => {
          if (field.condition && !evaluateCondition(field.condition, formData))
            return null;

          const value = formData[field.fieldName] || "";

          return (
            <div key={fieldIndex} className="mb-5">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "input" && (
                <input
                  type="text"
                  className={`w-full border ${
                    errors[field.fieldName]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  value={value}
                  onChange={(e) =>
                    handleChange(field.fieldName, e.target.value)
                  }
                />
              )}

              {field.type === "radio" && (
                <div className="flex gap-4">
                  {field.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={field.fieldName}
                        value={opt}
                        checked={value === opt}
                        onChange={(e) =>
                          handleChange(field.fieldName, e.target.value)
                        }
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {field.type === "select" && (
                <select
                  className={`w-full border ${
                    errors[field.fieldName]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  value={value}
                  onChange={(e) =>
                    handleChange(field.fieldName, e.target.value)
                  }
                >
                  <option value="">Select an option</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "image" && (
                <input
                  type="file"
                  accept="image/*"
                  className="block w-full text-sm border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none"
                  onChange={(e) =>
                    handleChange(field.fieldName, e.target.files[0])
                  }
                />
              )}

              {errors[field.fieldName] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.fieldName]}
                </p>
              )}
            </div>
          );
        })}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStepIndex > 0 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Previous
            </button>
          ) : (
            <div />
          )}
          <Button
            type="submit"
            // className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            {currentStepIndex === flattenedSteps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

DynamicFormRenderer.propTypes = {
  formSchema: PropTypes.arrayOf(
    PropTypes.shape({
      stepName: PropTypes.string,
      fields: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(["input", "radio", "select", "image"])
            .isRequired,
          fieldName: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string),
          defaultValue: PropTypes.any,
          required: PropTypes.bool,
          condition: PropTypes.shape({
            fieldName: PropTypes.string,
            operator: PropTypes.oneOf(["equals", "not equals"]),
            value: PropTypes.any,
          }),
        })
      ).isRequired,
      condition: PropTypes.shape({
        fieldName: PropTypes.string,
        operator: PropTypes.oneOf(["equals", "not equals"]),
        value: PropTypes.any,
      }),
      subSteps: PropTypes.array,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DynamicFormRenderer;
