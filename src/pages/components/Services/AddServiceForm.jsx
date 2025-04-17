import React from "react";
import InputField from "../../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import TextAreaField from "../../../components/FormFields/TextAreaField/TextAreaField";
import FileField from "../../../components/FormFields/FileField/FileField";
import { addServiceFieldsApi } from "../../../redux/services/service";
import PropTypes from "prop-types";
const AddServiceForm = ({ afterSubmit }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.service);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleAddService = (formData) => {
    const params = {
      userId: user.id,
      ...formData,
    };
    dispatch(addServiceFieldsApi(token, params));
    afterSubmit(false);
  };
  return (
    <div>
      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit(handleAddService)}
      >
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <InputField
              name="name"
              control={control}
              errors={errors}
              label="Service Name"
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
          <div>
            <TextAreaField
              name="description"
              control={control}
              errors={errors}
              label="Description"
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
          <div>
            <FileField
              name="icon"
              control={control}
              errors={errors}
              label="Icon"
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div>
        </div>

        <Button loading={isLoading} type="submit" className="py-2">
          Submit Service Request
        </Button>
      </form>
    </div>
  );
};
AddServiceForm.propTypes = {
  afterSubmit: PropTypes.func,
};
export default AddServiceForm;
