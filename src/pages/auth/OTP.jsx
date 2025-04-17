import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTPRec } from "../../redux/services/auth";

function ForgotPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [searchParams] = useSearchParams();
  const firmId = searchParams.get("firmId");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [isVerified, setIsVerified] = useState(null);
  const [step, setStep] = useState("request"); // request, verify, reset
  const [verificationCode, setVerificationCode] = useState("");

  const handleFormSubmit = async (formData) => {
    const verified = await dispatch(verifyOTPRec(formData));
    if (verified?.success) {
      setIsVerified(verified);
    }
  };
  useEffect(() => {
    if (isVerified?.success && isVerified?.userData?.role?.name === "admin") {
      return navigateTo("/admin");
    } else if (
      isVerified?.success &&
      isVerified?.userData?.role?.name === "law_firm"
    ) {
      return navigateTo("/lawfirm");
    } else if (
      isVerified?.success &&
      isVerified?.userData?.role?.name === "user"
    ) {
      return navigateTo(`/${firmId}/user`);
    }
    return () => {};
  }, [isVerified, navigateTo, firmId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Yourself
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              return to sign in
            </Link>
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div>
            <InputField
              name="code"
              type="number"
              control={control}
              // svg={<MdDriveFileRenameOutline />}
              errors={errors}
              label="Verification Code"
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />{" "}
          </div>

          <div>
            <Button loading={isLoading} type="submit" className="py-2">
              Verify Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
