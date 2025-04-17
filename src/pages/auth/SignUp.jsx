import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/FormFields/InputField/InputField";
import { useForm } from "react-hook-form";
import ReactSelectField from "../../components/FormFields/ReactSelectField/ReactSelectField";
import Button from "../../components/Button";
import { registerTeamMember, registerUser } from "../../redux/services/auth";
function SignUp() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const params = new URLSearchParams(useLocation().search);
  const authType = params.get("authType");

  const { firmId } = useParams();
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [method, setMethod] = useState("email");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isTeanRegistered, setIsTeanRegistered] = useState(false);

  const handleSignUp = async (data) => {
    if (authType === "team") {
      const formData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        username: data.username,
      };
      formData.reference = params.get("reference");
      formData.invitation_ref = params.get("invitation_ref");
      formData.confirmPassword = data.confirmPassword;
      const registered = await dispatch(registerTeamMember(formData));
      if (registered?.data?.userData) {
        alert("User registration");
        // setIsTeanRegistered(true);
        navigate("/lawfirm");
      }
      return;
    }
    let userData = {
      ...data,
      accountType: firmId ? "user" : "law_firm",
    };
    if (firmId) {
      userData = {
        ...userData,
        firmId: firmId,
      };
      console.log(userData);
      const is_registered = await dispatch(registerUser(userData));
      if (is_registered?.data?.userData) {
        setIsRegistered(true);
      }
    }
  };
  useEffect(() => {
    if (isRegistered) {
      navigate(`/otp?${firmId ? `firmId=${firmId}` : ""}`);
    }
  }, [isRegistered, navigate, firmId]);
  useEffect(() => {
    if (isTeanRegistered) {
      navigate("/");
    }
  }, [isTeanRegistered, navigate]);
  useEffect(() => {
    if (params.get("firstname")) {
      setValue("firstname", params.get("firstname"));
    }
    if (params.get("lastname")) {
      setValue("lastname", params.get("lastname"));
    }
    if (params.get("email")) {
      setValue("email", params.get("email"));
      setValue("username", params.get("email").split("@")[0]);
    }
    if (params.get("role")) {
      setValue("role", params.get("role"));
    }
  }, [setValue]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to={firmId ? `/${firmId}/login` : "/login"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setMethod("email")}
            className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-lg border ${
              method === "email"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setMethod("phone")}
            className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-lg border ${
              method === "phone"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Phone Number
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <InputField
                name="firstname"
                control={control}
                // svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="First Name"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />{" "}
            </div>
            <div>
              <InputField
                name="lastname"
                control={control}
                // svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="Last Name"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div>
              <InputField
                name={method === "email" ? "email" : "phoneNumber"}
                type={method === "email" ? "email" : "tel"}
                control={control}
                // svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label={method === "email" ? "Email address" : "Phone number"}
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div>
              <InputField
                name="password"
                type="password"
                control={control}
                // svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="Password"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
            <div>
              <InputField
                name="confirmPassword"
                type="password"
                control={control}
                // svg={<MdDriveFileRenameOutline />}
                errors={errors}
                label="Confirm Password"
                rules={{
                  required: {
                    value: true,
                    message: "Field required!",
                  },
                }}
              />
            </div>
          </div>
          {/* <div className="py-2">
            <ReactSelectField
              name="accountType"
              placeholder="Account Type"
              label="Account Type"
              control={control}
              errors={errors}
              mb={false}
              options={[
                {
                  label: "Law Firm",
                  value: "law_firm",
                },
                {
                  label: "User",
                  value: "user",
                },
              ]}
              rules={{
                required: {
                  value: true,
                  message: "Field required!",
                },
              }}
            />
          </div> */}

          <div>
            <Button loading={isLoading} type="submit" className="py-2">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
