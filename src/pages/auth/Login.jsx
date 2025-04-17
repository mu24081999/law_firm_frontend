import { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import InputField from "../../components/FormFields/InputField/InputField";
import { FaRegEye } from "react-icons/fa";
import Button from "../../components/Button";
import { loginUser } from "../../redux/services/auth";
function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { firmId } = useParams();
  console.log("🚀 ~ Login ~ location:", firmId);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [method, setMethod] = useState("email");

  const handleLogin = async (formData) => {
    let params = {
      email: formData.email,
      password: formData.password,
    };
    if (firmId) {
      params = {
        ...params,
        firmId: firmId,
      };
    }
    const loggedIn = await dispatch(loginUser(params));
    if (loggedIn?.success && loggedIn?.userData?.twoFAenabled) {
      navigate(`/otp?${firmId ? `firmId=${firmId}` : ""}`);
    } else {
      setIsLoggedIn(loggedIn);
    }
  };
  useEffect(() => {
    // For now, just redirect based on user type
    switch (isLoggedIn?.userData?.role?.name) {
      case "user":
        navigate(`/${firmId}/user`);
        break;
      case "law_firm":
        navigate("/lawfirm");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
      // navigate("/user");
    }
  }, [isLoggedIn, navigate, firmId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to={firmId ? `/${firmId}/signup` : "/signup"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                svg={<FaRegEye />}
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* <div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="user">User</option>
              <option value="lawfirm">Law Firm</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          <div>
            <Button loading={isLoading} type="submit" className="py-2">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
