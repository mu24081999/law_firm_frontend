import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfileApi,
  getFirmByUserId,
} from "../../../redux/services/lawfirm";

const LawFirmForm = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { lawfirm } = useSelector((state) => state.lawfirm);
  console.log("🚀 ~ LawFirmForm ~ lawfirm:", lawfirm);
  const [formData, setFormData] = useState({
    userId: user.id,
    firmName: "",
    rating: "",
    location: "",
    description: "",
    specialties: "",
    address: "",
    phone: "",
    email: "",
    workingHours: "",
    heroImage: null, // NEW
    expertise: [],
    achievements: [],
    team: [],
    testimonials: [],
  });
  console.log("🚀 ~ LawFirmForm ~ formData:", formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (name, index, key, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    setFormData((prev) => ({
      ...prev,
      [name]: updatedArray,
    }));
  };

  const handleFileChange = (e, name, index = null, key = null) => {
    const file = e.target.files[0];
    if (index !== null && key) {
      const updatedArray = [...formData[name]];
      updatedArray[index] = { ...updatedArray[index], [key]: file };
      setFormData((prev) => ({
        ...prev,
        [name]: updatedArray,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const addItem = (name, item) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], item],
    }));
  };

  const removeItem = (name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [name]: updatedArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    dispatch(addProfileApi(token, formData));
  };

  useEffect(() => {
    dispatch(getFirmByUserId(token, user?.id));
    return () => {};
  }, [user, dispatch, token]);
  useEffect(() => {
    if (lawfirm?.id) {
      setFormData(lawfirm);
    }
  }, [lawfirm]);
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        name="firmName"
        value={formData?.name || formData?.firmName}
        placeholder="Law Firm Name"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />

      <input
        type="text"
        name="location"
        value={formData?.location}
        placeholder="Location"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        value={formData?.description}
        placeholder="Description"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="specialties"
        value={formData?.specialties}
        placeholder="Specialties"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        value={formData?.address}
        placeholder="Address"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        value={formData?.phone}
        placeholder="Phone Number"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={formData?.email}
        placeholder="Email"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="workingHours"
        value={formData?.workingHours}
        placeholder="Working Hours"
        className="border p-2 w-full"
        onChange={handleInputChange}
      />

      <label className="block mt-4 font-semibold">Hero Image</label>
      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full"
        onChange={(e) => handleFileChange(e, "heroImage")}
      />
      {formData?.heroImage && (
        <img
          src={
            formData?.id
              ? formData?.heroImage
              : URL.createObjectURL(formData?.heroImage)
          }
          alt="Hero Preview"
          className="h-32 mt-2"
        />
      )}
      {/* Achievements Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Achievements</h3>
        {formData.achievements.map((item, index) => (
          <div key={index} className="border p-3 my-2 rounded">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full"
              value={item.title}
              onChange={(e) =>
                handleArrayChange(
                  "achievements",
                  index,
                  "title",
                  e.target.value
                )
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mt-2"
              value={item.description}
              onChange={(e) =>
                handleArrayChange(
                  "achievements",
                  index,
                  "description",
                  e.target.value
                )
              }
            />
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mt-2"
              onChange={(e) =>
                handleFileChange(e, "achievements", index, "image")
              }
            />
            {item.image && (
              <img
                src={
                  formData?.id ? item?.image : URL.createObjectURL(item.image)
                }
                alt="Achievement Image"
                className="h-16 mt-2"
              />
            )}
            <button
              type="button"
              onClick={() => removeItem("achievements", index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addItem("achievements", { title: "", description: "", image: null })
          }
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Add Achievement
        </button>
      </div>

      {/* Expertise Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Expertise</h3>
        {formData.expertise.map((item, index) => (
          <div key={index} className="border p-3 my-2 rounded">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full"
              value={item.title}
              onChange={(e) =>
                handleArrayChange("expertise", index, "title", e.target.value)
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mt-2"
              value={item.description}
              onChange={(e) =>
                handleArrayChange(
                  "expertise",
                  index,
                  "description",
                  e.target.value
                )
              }
            />
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mt-2"
              onChange={(e) => handleFileChange(e, "expertise", index, "icon")}
            />
            {item.icon && (
              <img
                src={formData?.id ? item?.icon : URL.createObjectURL(item.icon)}
                alt="Icon Preview"
                className="h-16 mt-2"
              />
            )}
            <button
              type="button"
              onClick={() => removeItem("expertise", index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addItem("expertise", { title: "", description: "", icon: null })
          }
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Add Expertise
        </button>
      </div>

      {/* Team Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Team</h3>
        {formData.team.map((member, index) => (
          <div key={index} className="border p-3 my-2 rounded">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full"
              value={member.name}
              onChange={(e) =>
                handleArrayChange("team", index, "name", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Role"
              className="border p-2 mt-2 w-full"
              value={member.role}
              onChange={(e) =>
                handleArrayChange("team", index, "role", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 mt-2 w-full"
              value={member.address}
              onChange={(e) =>
                handleArrayChange("team", index, "address", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Experience"
              className="border p-2 mt-2 w-full"
              value={member.experience}
              onChange={(e) =>
                handleArrayChange("team", index, "experience", e.target.value)
              }
            />
            <input
              type="file"
              accept="image/*"
              className="border p-2 mt-2 w-full"
              onChange={(e) => handleFileChange(e, "team", index, "image")}
            />
            {member.image && (
              <img
                src={
                  formData?.id
                    ? member?.image
                    : URL.createObjectURL(member.image)
                }
                alt="Team Member"
                className="h-20 mt-2"
              />
            )}
            <button
              type="button"
              onClick={() => removeItem("team", index)}
              className="text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addItem("team", {
              name: "",
              role: "",
              address: "",
              experience: "",
              image: null,
            })
          }
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Add Team Member
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-2 mt-6 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default LawFirmForm;
