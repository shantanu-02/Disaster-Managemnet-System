import React, { useState } from "react";
import axios from "axios";

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

const Predict = () => {
  const [image, setImage] = useState(null);
  const [infraImage, setInfraImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [infraPreview, setInfraPreview] = useState(null);
  const [response, setResponse] = useState();
  const [infraResponse, setInfraResponse] = useState();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setPreview(data);
      setImage(file);
    }
  };

  const handleInfraFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setInfraPreview(data);
      setInfraImage(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://127.0.0.1:5000/predict_image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      setResponse(res.data);
    }
  };

  const handleInfraSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("infrastructure_image", infraImage);

    const res = await axios.post("http://127.0.0.1:5000/predict_infra", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      setInfraResponse(res.data);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-8 mt-32">
      {/* Disaster Classification Section */}
      <div className="col-span-2 bg-white p-6 pl-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Disaster Classification</h2>
        <form onSubmit={handleImageSubmit} encType="multipart/form-data">
          <label className="block mb-4">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {preview && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <img
              src={preview}
              alt="Uploaded"
              className="max-w-full mb-4 rounded h-60"
            />
          </div>
        )}
      </div>

      {/* Output for Disaster Classification */}
      <div className="col-span-3 bg-white p-6 pr-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Output</h2>
        {response ? (
          <>
            <div className="text-2xl font-bold mb-4">{response.class}</div>
            <div>{response.info}</div>
          </>
        ) : (
          <div className="text-gray-500">No results to display yet.</div>
        )}
      </div>

      {/* Infrastructure Vulnerability Section */}
      <div className="col-span-2 bg-white p-6 pl-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Infrastructure Vulnerability</h2>
        <form onSubmit={handleInfraSubmit} encType="multipart/form-data">
          <label className="block mb-4">
            Upload Infrastructure Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleInfraFileChange}
              className="mt-2"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Assess Infrastructure
          </button>
        </form>

        {infraPreview && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <img
              src={infraPreview}
              alt="Infrastructure Uploaded"
              className="max-w-full mb-4 rounded h-60"
            />
          </div>
        )}
      </div>

      {/* Output for Infrastructure Vulnerability */}
      <div className="col-span-3 bg-white p-6 pr-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Output</h2>
        {infraResponse ? (
          <>
            <div className="text-2xl font-bold mb-4">
              {infraResponse.damage_class}
            </div>
            <div>{infraResponse.damage_info}</div>
          </>
        ) : (
          <div className="text-gray-500">No results to display yet.</div>
        )}
      </div>
    </div>
  );
};

export default Predict;
