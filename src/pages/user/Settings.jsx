import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { updateUserApi } from "../../redux/services/users";
import { resetUserPasswordApi } from "../../redux/services/auth";
import Button from "../../components/Button";

function Settings() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: null,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    serviceUpdates: true,
    promotions: false,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    deviceHistory: [],
  });
  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
    email: user?.email,
  });
  useEffect(() => {
    if (user)
      setProfile({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        avatar: user?.avatar,
      });
  }, [user]);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
        profile: file,
        // avatar: file,
      }));
    }
  };

  const handleNotificationChange = (field) => {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSecurityChange = async (field) => {
    console.log("🚀 ~ handleSecurityChange ~ field:", field);
    await setSecurity((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    const updatedSecurity = {
      twoFAenabled: !security?.twoFactorEnabled,
    };
    dispatch(updateUserApi(token, updatedSecurity, user.id));
  };
  const handleUpdateProfile = () => {
    console.log("update profile", profile);
    dispatch(updateUserApi(token, profile, user.id));
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(resetUserPasswordApi(resetPasswordData));
    setResetPasswordData({
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-indigo-100 p-1 mb-6">
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800"
            } flex items-center justify-center`
            }
          >
            <UserCircleIcon className="w-5 h-5 mr-2" />
            Profile
          </Tab>
          {/* <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800"
            } flex items-center justify-center`
            }
          >
            <BellIcon className="w-5 h-5 mr-2" />
            Notifications
          </Tab> */}
          <Tab
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800"
            } flex items-center justify-center`
            }
          >
            <ShieldCheckIcon className="w-5 h-5 mr-2" />
            Security
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Profile Panel */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={
                      profile.avatar ||
                      `https://ui-avatars.com/api/?name=${profile.fistname}&size=128`
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full"
                  />
                  <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-gray-500">
                    JPG, GIF or PNG. Max size of 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstname}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastname}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={(e) =>
                      handleProfileChange("phoneNumber", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      handleProfileChange("address", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  type="button"
                  // className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  onClick={handleUpdateProfile}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </Tab.Panel>

          {/* Notifications Panel */}
          {/* <Tab.Panel>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange("email")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        SMS Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange("sms")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Service Updates
                      </p>
                      <p className="text-sm text-gray-500">
                        Get notified about your service status
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.serviceUpdates}
                        onChange={() =>
                          handleNotificationChange("serviceUpdates")
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Promotional Emails
                      </p>
                      <p className="text-sm text-gray-500">
                        Receive promotional offers and updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.promotions}
                        onChange={() => handleNotificationChange("promotions")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel> */}

          {/* Security Panel */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          user?.twoFAenabled || security.twoFactorEnabled
                        }
                        onChange={() =>
                          handleSecurityChange("twoFactorEnabled")
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  <form
                    className="mt-8 space-y-6"
                    onSubmit={handleChangePassword}
                  >
                    <div className="rounded-md shadow-sm -space-y-px">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Update Your Password
                      </h3>
                      <div>
                        <label htmlFor="new-password" className="sr-only">
                          New Password
                        </label>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          onChange={(e) =>
                            setResetPasswordData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="New password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="sr-only">
                          Confirm Password
                        </label>
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          required
                          onChange={(e) =>
                            setResetPasswordData((prev) => ({
                              ...prev,
                              confirmPassword: e.target.value,
                            }))
                          }
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        // className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Reset Password
                      </Button>
                    </div>
                  </form>
                  {/* <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">
                        Login Notifications
                      </p>
                      <p className="text-sm text-gray-500">
                        Get notified of new sign-ins
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={security.loginNotifications}
                        onChange={() =>
                          handleSecurityChange("loginNotifications")
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Recent Devices
                    </h4>
                    <div className="border rounded-lg divide-y">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Windows PC - Chrome</p>
                            <p className="text-sm text-gray-500">
                              Lahore, Pakistan • Last accessed 2 hours ago
                            </p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Current
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">iPhone 12 - Safari</p>
                            <p className="text-sm text-gray-500">
                              Lahore, Pakistan • Last accessed yesterday
                            </p>
                          </div>
                          <button className="text-sm text-red-600 hover:text-red-800">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default Settings;
