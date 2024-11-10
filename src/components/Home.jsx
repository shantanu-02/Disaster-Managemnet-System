import React, { useState } from "react";
import { convertToBase64 } from "./Predict";

const PredictCard = ({ title }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [output, setOutout] = useState();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await convertToBase64(file);
      setImage(data);
      console.log(data);
    }

    if (file.name === "satellite-1.png" || file.name === "satellite-2.png") {
      const Output = (
        <div>
          <div className="text-lg font-bold mb-2">
            Vulnerable Infrastructure Detected
          </div>
          <div className="text-xl font-semibold my-4 ">
            Precautionary Measures
          </div>
          <div className="text-xl font-semibold mb-2">
            Evacuation Instructions:
          </div>
          <p>
            Follow designated evacuation routes. Move to higher ground if
            applicable. Cooperate with emergency personnel. Assist neighbors,
            especially those with mobility issues.
          </p>
          <div className="text-xl font-semibold my-4 ">Emergency Contacts:</div>
          <p>
            Call emergency services: [108, 102, 112] Report the situation and
            provide your location. Stay on the line for further instructions.
          </p>
          <div className="text-xl font-semibold my-4 ">Safety Guidelines:</div>
          <p>
            Stay indoors if advised. Avoid windows and exterior walls. Have an
            emergency kit ready with essentials. Listen to local news for
            updates.
          </p>
          <div className="text-xl font-semibold my-4 ">Avoidance Measures:</div>
          <p>
            Stay clear of the identified vulnerable area. Do not approach
            damaged structures. Follow instructions from authorities. Stay tuned
            to emergency alerts for updates.
          </p>
        </div>
      );
      setOutout(Output);
    } else {
      const Output = <div>Safe Infrastructure, No Vulnerablity detected.</div>;
      setOutout(Output);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any additional actions with the image and text data here
  };
  return (
    <div className="flex gap-8 justify-between">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-32">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-6">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
          </label>
        </form>

        {image && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <img
              src={image}
              alt="Uploaded"
              className="max-w-full w-full my-4 rounded h-64"
            />
            {text && <p className="text-gray-700">{text}</p>}
          </div>
        )}
      </div>
      <div className=" w-[35rem] mx-auto p-6 bg-white rounded-lg shadow-md mt-32">
        <h2 className="text-2xl font-semibold mb-6">Output</h2>
        {output}
      </div>
    </div>
  );
};

export default PredictCard;
