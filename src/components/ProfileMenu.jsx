import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UserCircleIcon,
  KeyIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/services/auth";

function ProfileMenu({ userType }) {
  const { firmId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");

  const handleLogout = async () => {
    // Add logout logic here
    const done = await dispatch(logoutUser(token));
    if (done) {
      navigate(`${firmId ? `/${firmId}/login` : "/login"}`);
    }
  };

  const handleEnable2FA = () => {
    // In real app, this would make an API call to generate 2FA secret and QR code
    setQrCode("https://placehold.co/200x200?text=2FA+QR+Code");
    setShowTwoFactorModal(true);
  };

  const handleVerify2FA = () => {
    // In real app, this would verify the code with the backend
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowTwoFactorModal(false);
    }
  };

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center max-w-xs bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img
            className="h-8 w-8 rounded-full"
            src={`https://ui-avatars.com/api/?name=${userType}&background=0D8ABC&color=fff`}
            alt=""
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">
                {" "}
                {user?.firstname + " " + user?.lastname}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href="#profile"
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex px-4 py-2 text-sm text-gray-700 items-center`}
                >
                  <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
                  Profile
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#security"
                  onClick={() => handleEnable2FA()}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex px-4 py-2 text-sm text-gray-700 items-center`}
                >
                  <KeyIcon className="mr-3 h-5 w-5 text-gray-400" />
                  Two-Factor Auth
                  {twoFactorEnabled && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Enabled
                    </span>
                  )}
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#settings"
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex px-4 py-2 text-sm text-gray-700 items-center`}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400" />
                  Settings
                </a>
              )}
            </Menu.Item> */}

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } flex w-full px-4 py-2 text-sm text-gray-700 items-center`}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* 2FA Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Enable Two-Factor Authentication
            </h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              </div>
              <p className="text-sm text-gray-500">
                Scan this QR code with your authenticator app and enter the
                verification code below.
              </p>
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowTwoFactorModal(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVerify2FA}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
