import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../../../components/FormFields/InputField/InputField";
import FileField from "../../../components/FormFields/FileField/FileField";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import {
  addBankRecieptApi,
  addServiceRequestApi,
} from "../../../redux/services/service";
const AddRequestForm = ({ service, fields, handleModalOpen }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { isLoading, serviceRequest } = useSelector((state) => state.service);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const handleAddRequest = async (data) => {
    const params = {
      userId: user.id,
      serviceId: service.id,
      ...data,
    };
    const done = await dispatch(addServiceRequestApi(token, params));
    console.log("🚀 ~ handleAddRequest ~ params:", params);
    if (done) {
      setStep(2);
    }
  };
  const handleSubmitPaymentProof = (formData) => {
    const params = {
      userId: user.id,
      serviceId: service.id,
      serviceRequestId: serviceRequest?.id,
      reciept: formData.reciept,
    };
    dispatch(addBankRecieptApi(token, params));
  };
  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSubmit(handleAddRequest)}>
          {fields?.map((field, index) => (
            <div key={index}>
              {field?.type === "text" ? (
                <InputField
                  name={field?.name}
                  type={"text"}
                  control={control}
                  // svg={<MdDriveFileRenameOutline />}
                  errors={errors}
                  label={_.capitalize(field?.name)}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              ) : (
                <FileField
                  name={field?.name}
                  control={control}
                  errors={errors}
                  label={_.capitalize(field?.name)}
                  rules={{
                    required: {
                      value: true,
                      message: "Field required!",
                    },
                  }}
                />
              )}
            </div>
          ))}
          <Button loading={isLoading} type="submit" className="p-5">
            Continue
          </Button>
        </form>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <Button
            type="button"
            onClick={() => setStep(1)}
            className="p-5"
            size="sm"
          >
            Back
          </Button>
          <h3 className="text-lg font-medium">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-4 border rounded-lg ${
                paymentMethod === "card"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              Credit/Debit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("bank")}
              className={`p-4 border rounded-lg ${
                paymentMethod === "bank"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300"
              }`}
            >
              Bank Transfer
            </button>
          </div>
          <Button type="button" onClick={() => setStep(3)} className="p-5">
            Continue
          </Button>
        </div>
      )}
      {step === 3 && (
        <>
          <Button type="button" onClick={() => setStep(2)} size="sm">
            Back
          </Button>
          {paymentMethod === "bank" && (
            <form onSubmit={handleSubmit(handleSubmitPaymentProof)}>
              <FileField
                name={"reciept"}
                control={control}
                errors={errors}
                label={"Reciept"}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
              <Button type="submit" onClick={() => handleModalOpen(false)}>
                Continue
              </Button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
AddRequestForm.propTypes = {
  fields: PropTypes.array,
  service: PropTypes.object,
  handleModalOpen: PropTypes.func,
};
export default AddRequestForm;
