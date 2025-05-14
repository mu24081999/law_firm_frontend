import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import {
  SwatchIcon,
  GlobeAltIcon,
  Squares2X2Icon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServiceFieldsApi,
  updateMultiServiceFields,
} from "../../redux/services/service";
import { v4 as uuidv4 } from "uuid";
import {
  addUpdateFirm,
  getClientsApi,
  getFirmById,
} from "../../redux/services/firm";
import { updateUserApi } from "../../redux/services/users";
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { addDomainApi, getUserDomainApi } from "../../redux/services/domain";
import {
  resetPasswordApi,
  resetUserPasswordApi,
} from "../../redux/services/auth";
import { Alert } from "flowbite-react";
import DynamicFormBuilder from "../components/Steps/DynamicForm";
import ServiceAccordion from "./components/ServiceAccordion";
import FirmSettings from "./components/FirmSettings";
import EmailConnector from "./components/EmailConnector";
import EmailTemplateEditor from "./components/EmailTemplateEditor";

function Settings() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { domain: domainData } = useSelector((state) => state.domain);
  const { services } = useSelector((state) => state.service);
  const { firm } = useSelector((state) => state.firm);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [colors, setColors] = useState({
    primaryColor: "#4F46E5",
    secondaryColor: "#818CF8",
    primaryButtonColor: "#4F46E5",
    secondaryButtonColor: "#6B7280",
    buttonTextColor: "#FFFFFF",
    sidebarColor: "#1F2937",
    sidebarTextColor: "#FFFFFF",
    sidebarHoverColor: "#374151",
    headerColor: "#FFFFFF",
    headerTextColor: "#111827",
  });
  const [servicesData, setServicesData] = useState([]);
  const [domain, setDomain] = useState("");
  console.log("🚀 ~ Settings ~ domain:", domain);
  const [subdomain, setSubdomain] = useState("");
  const [logo, setLogo] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [firmDetails, setFirmDetails] = useState({
    firmName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [resetPasswordData, setResetPasswordData] = useState({
    password: "",
    confirmPassword: "",
    email: user?.email,
  });

  const templates = [
    {
      id: "modern",
      name: "Modern",
      preview: "https://placehold.co/600x400?text=Modern+Template",
      description:
        "A clean, modern design with emphasis on typography and whitespace",
    },
    {
      id: "professional",
      name: "Professional",
      preview: "https://placehold.co/600x400?text=Professional+Template",
      description: "Traditional law firm design with a professional appearance",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "https://placehold.co/600x400?text=Minimal+Template",
      description: "Minimalist design focusing on content and clarity",
    },
  ];

  const availableDomains = [
    { extension: ".com", price: "1200" },
    { extension: ".pk", price: "800" },
    { extension: ".com.pk", price: "1000" },
    { extension: ".net", price: "1100" },
    { extension: ".org", price: "1000" },
  ];
  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(resetUserPasswordApi(resetPasswordData));
    setResetPasswordData({
      password: "",
      confirmPassword: "",
    });
  };
  const handleColorChange = (key, value) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo({
        url: URL.createObjectURL(file),
        file: file,
      });
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage({
        url: URL.createObjectURL(file),
        file: file,
      });
    }
  };

  const handleServiceChange = (id, fieldId, key, value) => {
    setServicesData(
      servicesData?.map((service) =>
        service.id === id
          ? {
              ...service,
              customServiceFields: service?.customServiceFields?.some(
                (field) => field?.id === fieldId
              )
                ? service?.customServiceFields?.map((field) =>
                    field?.id === fieldId ? { ...field, [key]: value } : field
                  )
                : [
                    ...(service.customServiceFields || []),
                    {
                      id: uuidv4(),
                      userId: user.id,
                      serviceId: service.id,
                      status: "active",
                      [key]: value,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                  ],
            }
          : service
      )
    );
  };

  const handleFirmDetailsChange = (field, value) => {
    setFirmDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    // Save settings to backend
    const response = await dispatch(
      updateMultiServiceFields(token, {
        services: servicesData,
      })
    );
    console.log("Saving settings...", response);
  };
  const handleFirmFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firmId: user?.id,
      logoUrl: logo?.file,
      profileUrl: profileImage?.file,
      ...colors,
      ...firmDetails,
    };
    console.log(formData);
    dispatch(addUpdateFirm(token, formData));
  };
  useEffect(() => {
    dispatch(getAllServiceFieldsApi(token));
    dispatch(getFirmById(token, user?.id));
    dispatch(getUserDomainApi(token, user?.id));
  }, [dispatch, token, user]);
  useEffect(() => {
    const formattedData = [];
    if (services?.length > 0) {
      services?.map((service) => {
        const customServiceFields = service?.customServiceFields?.map(
          (field) => ({
            ...field,
            requirements:
              typeof field?.requirements === "string"
                ? JSON.parse(field?.requirements)
                : field?.requirements,
          })
        );
        formattedData.push({
          ...service,
          customServiceFields: customServiceFields || [],
        });
      });
    }
    setServicesData(formattedData);
  }, [services]);

  useEffect(() => {
    if (domainData?.id) {
      setDomain(domainData?.mainDomain);
      setSubdomain(domainData?.subDomain);
    }
  }, [domainData]);
  useEffect(() => {
    if (firm?.id) {
      setFirmDetails({
        firmName: firm?.firmName,
        email: firm?.email,
        phoneNumber: firm?.phoneNumber,
        address: firm?.address,
      });
      setColors({
        primaryColor: firm?.primaryColor,
        secondaryColor: firm?.secondaryColor,
        primaryButtonColor: firm?.primaryButtonColor,
        secondaryButtonColor: firm?.secondaryButtonColor,
        buttonTextColor: firm?.buttonTextColor,
        sidebarColor: firm?.sidebarColor,
        sidebarTextColor: firm?.sidebarTextColor,
        sidebarHoverColor: firm?.sidebarHoverColor,
        headerColor: firm?.headerColor,
        headerTextColor: firm?.headerTextColor,
      });
      setLogo({
        url: firm?.logoUrl,
      });
      setProfileImage({
        url: firm?.profileUrl,
      });
    }
  }, [firm]);
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
  useEffect(() => {
    if (user) {
      const data = user?.member ? user?.member : user;
      setProfile({
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        address: data?.address,
        avatar: data?.avatar,
      });
    }
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
  const handleDomainSubmit = (e) => {
    e.preventDefault();
    // Handle domain submission logic here
    console.log("Domain submitted:", domain, subdomain);
    dispatch(
      addDomainApi(token, {
        userId: user?.id,
        mainDomain: domain,
        subDomain: subdomain,
      })
    );
  };
  const tabsConfig = [
    {
      label: "Profile",
      icon: Squares2X2Icon,
      key: "profile",
      show: true,
    },
    // {
    //   label: "Templates",
    //   icon: Squares2X2Icon,
    //   key: "templates",
    //   show: true,
    // },
    {
      label: "Appearance",
      icon: SwatchIcon,
      key: "appearance",
      show: true,
    },
    {
      label: "Domain",
      icon: GlobeAltIcon,
      key: "domain",
      show: !user?.member, // Only show if not a member
    },
    {
      label: "Services",
      icon: CurrencyDollarIcon,
      key: "services",
      show: true,
    },
    {
      label: "Firm Settings",
      icon: CurrencyDollarIcon,
      key: "services",
      show: true,
    },
    {
      label: "Email Connector",
      icon: CurrencyDollarIcon,
      key: "email_connector",
      show: true,
    },
    {
      label: "Email Sequence",
      icon: CurrencyDollarIcon,
      key: "email_sequence",
      show: true,
    },
  ];

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

        <Tab.Group>
          <Tab.List className="lg:flex sm:flex sm:flex-wrap lg:flex-nowrap space-x-1 flex-wrap rounded-xl bg-indigo-100 p-1 mb-6">
            {/* <Tab
              className={({ selected }) =>
                `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow w-full"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
            } flex items-center justify-center`
              }
            >
              <Squares2X2Icon className="w-5 h-5 mr-2" />
              Profile
            </Tab>
            <Tab
              className={({ selected }) =>
                `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow w-full"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
            } flex items-center justify-center`
              }
            >
              <Squares2X2Icon className="w-5 h-5 mr-2" />
              Templates
            </Tab>
            <Tab
              className={({ selected }) =>
                `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow w-full"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
            } flex items-center justify-center`
              }
            >
              <SwatchIcon className="w-5 h-5 mr-2" />
              Appearance
            </Tab>
            {!user?.member && (
              <Tab
                className={({ selected }) =>
                  `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow w-full"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
            } flex items-center justify-center`
                }
              >
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                Domain
              </Tab>
            )}
            <Tab
              className={({ selected }) =>
                `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
            ${
              selected
                ? "bg-white text-indigo-700 shadow w-full"
                : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
            } flex items-center justify-center`
              }
            >
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Services
            </Tab> */}
            {tabsConfig
              .filter((tab) => tab.show)
              .map(({ label, icon: Icon }, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `sm:w-full lg:w-full rounded-lg py-2.5 text-sm font-medium leading-5 
          ${
            selected
              ? "bg-white text-indigo-700 shadow w-full"
              : "text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800 w-full"
          } flex items-center justify-center`
                  }
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </Tab>
              ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                  Account Settings
                </h1>

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

                    {!user?.member && (
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
                    )}
                  </Tab.List>

                  <Tab.Panels>
                    {/* Profile Panel */}
                    <Tab.Panel>
                      <div className="space-y-6">
                        {!user?.member && (
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
                        )}

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
                                handleProfileChange(
                                  "phoneNumber",
                                  e.target.value
                                )
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
                          <button
                            type="button"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            onClick={handleUpdateProfile}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </Tab.Panel>
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
                                    user?.twoFAenabled ||
                                    security.twoFactorEnabled
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
                                  <label
                                    htmlFor="new-password"
                                    className="sr-only"
                                  >
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
                                  <label
                                    htmlFor="confirm-password"
                                    className="sr-only"
                                  >
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
                                <button
                                  type="submit"
                                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Reset Password
                                </button>
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
                                      <p className="font-medium">
                                        Windows PC - Chrome
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Lahore, Pakistan • Last accessed 2 hours
                                        ago
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
                                      <p className="font-medium">
                                        iPhone 12 - Safari
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        Lahore, Pakistan • Last accessed
                                        yesterday
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
            </Tab.Panel>
            {/* Templates Panel */}
            {/* <Tab.Panel>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                <div className="">
                  <Alert color="info" className="border border-red-600">
                    <span className="font-medium">Info alert!</span> Coming soon
                  </Alert>
                </div>
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer ${
                      selectedTemplate === template.id
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </Tab.Panel> */}

            {/* Appearance Panel */}
            <Tab.Panel>
              <form onSubmit={handleFirmFormSubmit} className="space-y-8">
                {/* Branding */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Branding
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Dashboard Logo
                      </label>
                      <div className="mt-2 flex items-center space-x-4">
                        {logo?.url && (
                          <img
                            src={logo?.url}
                            alt="Logo"
                            className="h-12 w-auto"
                          />
                        )}
                        <input
                          type="file"
                          onChange={handleLogoChange}
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Profile Image
                      </label>
                      <div className="mt-2 flex items-center space-x-4">
                        {profileImage?.url && (
                          <img
                            src={profileImage?.url}
                            alt="Profile"
                            className="h-12 w-12 rounded-full"
                          />
                        )}
                        <input
                          type="file"
                          onChange={handleProfileImageChange}
                          accept="image/*"
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Firm Details */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Firm Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Firm Name
                      </label>
                      <input
                        type="text"
                        value={firmDetails.firmName}
                        onChange={(e) =>
                          handleFirmDetailsChange("firmName", e.target.value)
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
                        value={firmDetails.email}
                        onChange={(e) =>
                          handleFirmDetailsChange("email", e.target.value)
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
                        value={firmDetails.phoneNumber}
                        onChange={(e) =>
                          handleFirmDetailsChange("phoneNumber", e.target.value)
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
                        value={firmDetails.address}
                        onChange={(e) =>
                          handleFirmDetailsChange("address", e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Scheme */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Color Scheme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.primaryColor}
                          onChange={(e) =>
                            handleColorChange("primaryColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.primaryColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Secondary Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.secondaryColor}
                          onChange={(e) =>
                            handleColorChange("secondaryColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.secondaryColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Button Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.buttonPrimary}
                          onChange={(e) =>
                            handleColorChange(
                              "primaryButtonColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.primaryButtonColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Secondary Button Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.secondaryButtonColor}
                          onChange={(e) =>
                            handleColorChange(
                              "secondaryButtonColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.secondaryButtonColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Button Text Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.buttonTextColor}
                          onChange={(e) =>
                            handleColorChange("buttonTextColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.buttonTextColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sidebar Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.sidebarColor}
                          onChange={(e) =>
                            handleColorChange("sidebarColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.sidebarColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sidebar Text Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.sidebarTextColor}
                          onChange={(e) =>
                            handleColorChange(
                              "sidebarTextColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.sidebarTextColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sidebar Hover Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.sidebarHoverColor}
                          onChange={(e) =>
                            handleColorChange(
                              "sidebarHoverColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.sidebarHoverColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Header Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.headerColor}
                          onChange={(e) =>
                            handleColorChange("headerColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.headerColor}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Header Text Color
                      </label>
                      <div className="mt-1 flex items-center gap-4">
                        <input
                          type="color"
                          value={colors.headerTextColor}
                          onChange={(e) =>
                            handleColorChange("headerTextColor", e.target.value)
                          }
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-gray-500">
                          {colors.headerTextColor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="mt-6 p-4 border rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                      Preview
                    </h4>
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <button
                          style={{
                            backgroundColor: colors.primaryButtonColor,
                            color: colors.buttonTextColor,
                          }}
                          className="px-4 py-2 rounded-md"
                        >
                          Primary Button
                        </button>
                        <button
                          style={{
                            backgroundColor: colors.buttonSecondary,
                            color: colors.buttonTextColor,
                          }}
                          className="px-4 py-2 rounded-md"
                        >
                          Secondary Button
                        </button>
                      </div>
                      <div
                        style={{
                          backgroundColor: colors.sidebarColor,
                          color: colors.sidebarTextColor,
                        }}
                        className="p-4 rounded-md"
                      >
                        Sidebar Preview
                      </div>
                      <div
                        style={{
                          backgroundColor: colors.headerColor,
                          color: colors.headerTextColor,
                        }}
                        className="p-4 rounded-md"
                      >
                        Header Preview
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </Tab.Panel>

            {/* Domain Panel */}
            {!user?.member && (
              <Tab.Panel>
                <div className="space-y-6">
                  {/* Domain Search and Purchase */}
                  {/* <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Purchase New Domain
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="Enter your desired domain name"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                          Search
                        </button>
                      </div>

                      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableDomains.map((domain, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium">
                              yourdomain{domain.extension}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rs. {domain.price}/year
                            </p>
                          </div>
                          <button className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                            Purchase
                          </button>
                        </div>
                      ))}
                    </div> 
                    </div>
                  </div> */}

                  {/* Existing Domain Configuration */}
                  <form onSubmit={handleDomainSubmit}>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Domain Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Custom Domain
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="yourdomain.com"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Enter your custom domain if you want to use it for
                          your website.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Subdomain
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value)}
                            className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                          <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                            .{domain}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          This subdomain will be used for your dashboard access.
                        </p>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              After setting up your domain, you'll need to
                              update your nameservers. We'll provide the
                              necessary instructions.
                            </p>
                            <div>
                              <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                  How to Update Nameservers
                                </h2>

                                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                                  <li>
                                    <strong>
                                      Log In to Your Domain Registrar:
                                    </strong>
                                    Visit your domain provider's website (e.g.,
                                    Namecheap, GoDaddy) and log into your
                                    account.
                                  </li>

                                  <li>
                                    <strong>
                                      Go to Domain List / My Domains:
                                    </strong>
                                    Navigate to the section where your domains
                                    are listed and click on the one you want to
                                    update.
                                  </li>

                                  <li>
                                    <strong>Find Nameserver Settings:</strong>
                                    Look for a section called{" "}
                                    <span className="italic">
                                      "Nameservers"
                                    </span>{" "}
                                    or{" "}
                                    <span className="italic">
                                      "DNS Settings"
                                    </span>
                                    .
                                  </li>

                                  <li>
                                    <strong>Select Custom DNS:</strong>
                                    Choose the option like{" "}
                                    <span className="italic">
                                      "Custom DNS"
                                    </span>{" "}
                                    or{" "}
                                    <span className="italic">
                                      "Use custom nameservers"
                                    </span>
                                    .
                                  </li>

                                  <li>
                                    <strong>Enter Hosting Nameservers:</strong>
                                    Replace the existing ones with the
                                    nameservers your host provides. For example:
                                    <div className="bg-gray-100 p-2 rounded mt-1 font-mono text-sm">
                                      {typeof domainData?.nameservers ===
                                      "string"
                                        ? JSON.parse(
                                            domainData?.nameservers
                                          )?.map((key, index) => (
                                            <p key={index}>{key}</p>
                                          ))
                                        : domainData?.nameservers?.map(
                                            (key, index) => (
                                              <p key={index}>{key}</p>
                                            )
                                          )}
                                    </div>
                                  </li>

                                  <li>
                                    <strong>Save Changes:</strong>
                                    Click <span className="italic">
                                      "Save"
                                    </span>{" "}
                                    or <span className="italic">"Update"</span>.
                                    Changes can take up to{" "}
                                    <strong>24–48 hours</strong> to fully
                                    propagate.
                                  </li>

                                  <li>
                                    <strong>Verify DNS Propagation:</strong>
                                    You can check status via &nbsp;
                                    <a
                                      href="https://dnschecker.org"
                                      target="_blank"
                                      className="text-blue-600 underline hover:text-blue-800"
                                    >
                                      dnschecker.org
                                    </a>
                                    .
                                  </li>
                                </ol>
                              </section>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                      >
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              </Tab.Panel>
            )}

            {/* Services Panel */}
            <Tab.Panel>
              <ServiceAccordion
                servicesData={servicesData}
                handleServiceChange={handleServiceChange}
                handleSaveSettings={handleSaveSettings}
              />
            </Tab.Panel>
            {/*  */}
            <Tab.Panel>
              <FirmSettings />
            </Tab.Panel>
            <Tab.Panel>
              <EmailConnector />
            </Tab.Panel>
            <Tab.Panel>
              <EmailTemplateEditor />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Settings;
