import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../resource.css";
import emailjs from "emailjs-com"; // Import EmailJS

const initialState = {
  state: null,
  district: null,
  category: null,
  item: null,
  fromDate: null,
  endDate: null,
};

const statesOptions = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "Chandigarh", label: "Chandigarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Delhi", label: "Delhi" },
  { value: "Puducherry", label: "Puducherry" },
];

// Placeholder data for districts (you would fetch this from an API)
const districtsData = {
  "Andhra Pradesh": [
    { value: "Visakhapatnam", label: "Visakhapatnam" },
    { value: "Vijayawada", label: "Vijayawada" },
    { value: "Guntur", label: "Guntur" },
    { value: "Kurnool", label: "Kurnool" },
    { value: "Tirupati", label: "Tirupati" },
    { value: "Nellore", label: "Nellore" },
    { value: "Kadapa", label: "Kadapa" },
  ],
  "Arunachal Pradesh": [
    { value: "Itanagar", label: "Itanagar" },
    { value: "Naharlagun", label: "Naharlagun" },
    { value: "Pasighat", label: "Pasighat" },
    { value: "Bomdila", label: "Bomdila" },
    { value: "Tawang", label: "Tawang" },
    { value: "Ziro", label: "Ziro" },
    { value: "Khonsa", label: "Khonsa" },
  ],
  Assam: [
    { value: "Guwahati", label: "Guwahati" },
    { value: "Jorhat", label: "Jorhat" },
    { value: "Dibrugarh", label: "Dibrugarh" },
    { value: "Silchar", label: "Silchar" },
    { value: "Tezpur", label: "Tezpur" },
    { value: "Nagaon", label: "Nagaon" },
    { value: "Barpeta", label: "Barpeta" },
  ],
  Bihar: [
    { value: "Patna", label: "Patna" },
    { value: "Gaya", label: "Gaya" },
    { value: "Muzaffarpur", label: "Muzaffarpur" },
    { value: "Bhagalpur", label: "Bhagalpur" },
    { value: "Darbhanga", label: "Darbhanga" },
    { value: "Purnia", label: "Purnia" },
    { value: "Aurangabad", label: "Aurangabad" },
  ],
  Chhattisgarh: [
    { value: "Raipur", label: "Raipur" },
    { value: "Bilaspur", label: "Bilaspur" },
    { value: "Durg", label: "Durg" },
    { value: "Bastar", label: "Bastar" },
    { value: "Rajnandgaon", label: "Rajnandgaon" },
    { value: "Korba", label: "Korba" },
    { value: "Raigarh", label: "Raigarh" },
  ],
  Goa: [
    { value: "Panaji", label: "Panaji" },
    { value: "Margao", label: "Margao" },
    { value: "Mapusa", label: "Mapusa" },
    { value: "Ponda", label: "Ponda" },
    { value: "Vasco da Gama", label: "Vasco da Gama" },
    { value: "Bicholim", label: "Bicholim" },
    { value: "Sanguem", label: "Sanguem" },
  ],
  Gujarat: [
    { value: "Ahmedabad", label: "Ahmedabad" },
    { value: "Surat", label: "Surat" },
    { value: "Vadodara", label: "Vadodara" },
    { value: "Rajkot", label: "Rajkot" },
    { value: "Bhavnagar", label: "Bhavnagar" },
    { value: "Jamnagar", label: "Jamnagar" },
    { value: "Gandhinagar", label: "Gandhinagar" },
  ],
  Haryana: [
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Faridabad", label: "Faridabad" },
    { value: "Gurgaon", label: "Gurgaon" },
    { value: "Hisar", label: "Hisar" },
    { value: "Rohtak", label: "Rohtak" },
    { value: "Panipat", label: "Panipat" },
    { value: "Sonipat", label: "Sonipat" },
  ],
  "Himachal Pradesh": [
    { value: "Shimla", label: "Shimla" },
    { value: "Mandi", label: "Mandi" },
    { value: "Kullu", label: "Kullu" },
    { value: "Dharamshala", label: "Dharamshala" },
    { value: "Solan", label: "Solan" },
    { value: "Palampur", label: "Palampur" },
    { value: "Hamirpur", label: "Hamirpur" },
  ],
  Jharkhand: [
    { value: "Ranchi", label: "Ranchi" },
    { value: "Jamshedpur", label: "Jamshedpur" },
    { value: "Dhanbad", label: "Dhanbad" },
    { value: "Bokaro Steel City", label: "Bokaro Steel City" },
    { value: "Hazaribagh", label: "Hazaribagh" },
    { value: "Deoghar", label: "Deoghar" },
    { value: "Giridih", label: "Giridih" },
  ],
  Karnataka: [
    { value: "Bangalore", label: "Bangalore" },
    { value: "Mysuru", label: "Mysuru" },
    { value: "Hubballi", label: "Hubballi" },
    { value: "Mangaluru", label: "Mangaluru" },
    { value: "Belagavi", label: "Belagavi" },
    { value: "Davanagere", label: "Davanagere" },
    { value: "Ballari", label: "Ballari" },
  ],
  Kerala: [
    { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
    { value: "Kochi", label: "Kochi" },
    { value: "Kozhikode", label: "Kozhikode" },
    { value: "Thrissur", label: "Thrissur" },
    { value: "Kollam", label: "Kollam" },
    { value: "Palakkad", label: "Palakkad" },
    { value: "Kottayam", label: "Kottayam" },
  ],
  Maharashtra: [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Pune", label: "Pune" },
    { value: "Nagpur", label: "Nagpur" },
    { value: "Thane", label: "Thane" },
    { value: "Nashik", label: "Nashik" },
    { value: "Aurangabad", label: "Aurangabad" },
    { value: "Navi Mumbai", label: "Navi Mumbai" },
  ],
};

const categoriesOptions = [
  { value: "equipment", label: "Equipment" },
  { value: "medicalSupplies", label: "Medical Supplies" },
  { value: "humanResources", label: "Human Resources" },
];

// Placeholder data for items (you would fetch this from an API)
const itemsData = {
  equipment: [
    { value: "Tents", label: "Tents" },
    { value: "Generators", label: "Generators" },
    {
      value: "Water Purification Systems",
      label: "Water Purification Systems",
    },
    { value: "Emergency Lighting", label: "Emergency Lighting" },
    { value: "Communication Radios", label: "Communication Radios" },
    { value: "Portable Shelters", label: "Portable Shelters" },
    { value: "Power Banks", label: "Power Banks" },
    { value: "Medical Triage Kits", label: "Medical Triage Kits" },
    { value: "Rescue Tools", label: "Rescue Tools" },
    { value: "Camping Stoves", label: "Camping Stoves" },
    { value: "Personal Protective Equipment (PPE)", label: "PPE Kits" },
    {
      value: "Search and Rescue Equipment",
      label: "Search and Rescue Equipment",
    },
  ],
  medicalSupplies: [
    { value: "First Aid Kits", label: "First Aid Kits" },
    { value: "Medicines", label: "Medicines" },
    { value: "Bandages and Dressings", label: "Bandages and Dressings" },
    { value: "Antiseptics", label: "Antiseptics" },
    { value: "Pain Relievers", label: "Pain Relievers" },
    { value: "IV Fluids", label: "IV Fluids" },
    { value: "Medical Masks", label: "Medical Masks" },
    { value: "Medical Gloves", label: "Medical Gloves" },
    { value: "Hygiene Kits", label: "Hygiene Kits" },
    {
      value: "Emergency Vaccination Kits",
      label: "Emergency Vaccination Kits",
    },
    { value: "Medical Thermometers", label: "Medical Thermometers" },
    { value: "Stretchers", label: "Stretchers" },
  ],
  humanResources: [
    { value: "Volunteers", label: "Volunteers" },
    { value: "Medical Personnel", label: "Medical Personnel" },
    { value: "Emergency Responders", label: "Emergency Responders" },
    { value: "Search and Rescue Teams", label: "Search and Rescue Teams" },
    {
      value: "Psychosocial Support Teams",
      label: "Psychosocial Support Teams",
    },
    { value: "Logistics Support", label: "Logistics Support" },
    { value: "Communications Teams", label: "Communications Teams" },
    { value: "Community Outreach Teams", label: "Community Outreach Teams" },
    { value: "Security Personnel", label: "Security Personnel" },
    { value: "Medical Evacuation Teams", label: "Medical Evacuation Teams" },
    {
      value: "Field Operations Coordinators",
      label: "Field Operations Coordinators",
    },
    { value: "Disaster Relief Planners", label: "Disaster Relief Planners" },
  ],
};

const DisasterResourceApp = () => {
  const [formData, setFormData] = useState(initialState);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [itemsOptions, setItemsOptions] = useState([]);

  useEffect(() => {
    if (formData.state) {
      setDistrictsOptions(districtsData[formData.state.value] || []);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.category) {
      setItemsOptions(itemsData[formData.category.value] || []);
    }
  }, [formData.category]);

  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState, district: null });
  };

  const handleCategoryChange = (selectedCategory) => {
    setFormData({ ...formData, category: selectedCategory, item: null });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleReset = () => {
    setFormData(initialState);
  };

  const handleSendRequest = () => {
    const templateParams = {
        state: formData.state.value,
        district: formData.district.value,
        category: formData.category.value,
        item: formData.item.value,
        fromDate: formData.fromDate,
        endDate: formData.endDate,
    };

    emailjs.send("service_pfziuf6", "template_4y0nuyr", templateParams, "5-6hk_JU1p-xcVbvp")
        .then((response) => {
            console.log("Email sent successfully:", response);
            alert("Your request has been sent successfully!");  // Popup alert
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            alert("There was an error sending your request.");  // Popup alert for error
        });
};


  return (
    <div className="p-5 mx-auto w-[75vw] bg-white border border-gray-300 px-4 py-8 mt-32 rounded-lg drop-shadow-xl">
      <div className="mb-2 text-4xl font-bold">Resources Requests</div>
      <div className="mb-8 text-lg font-semibold">
        AI model to update equipment needs
      </div>
      <div className="flex gap-4">
        <div className="mb-4 w-full">
          <Select
            options={statesOptions}
            onChange={handleStateChange}
            value={formData.state}
            placeholder="Select State"
          />
        </div>

        <div className="mb-4 w-full">
          <Select
            options={districtsOptions}
            onChange={(selectedDistrict) =>
              setFormData({ ...formData, district: selectedDistrict })
            }
            value={formData.district}
            placeholder="Select District"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="mb-4 w-full">
          <Select
            options={categoriesOptions}
            onChange={handleCategoryChange}
            value={formData.category}
            placeholder="Select Category"
          />
        </div>

        <div className="mb-4 w-full ">
          <Select
            options={itemsOptions}
            onChange={(selectedItem) =>
              setFormData({ ...formData, item: selectedItem })
            }
            value={formData.item}
            placeholder="Select Item"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="md:w-full mb-4 border border-gray-400 p-2 rounded-md">
          <DatePicker
            selected={formData.fromDate}
            onChange={(date) => handleDateChange(date, "fromDate")}
            placeholderText="From Date"
            className="outline-none bg-white text-black"
          />
        </div>

        <div className="md:w-full mb-4 border border-gray-400 p-2 rounded-md">
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => handleDateChange(date, "endDate")}
            placeholderText="End Date"
            className="outline-none bg-white text-black"
          />
        </div>
      </div>

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSendRequest}
      >
        Send Request
      </button>
      <button
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default DisasterResourceApp;
