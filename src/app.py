from flask import Flask, request, render_template, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from flask_cors import CORS

# Initialize the Flask app and enable CORS
app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # Limit uploads to 50MB

# Load the saved models
cnn_image = load_model('./model.h5')  # Image classification model
cnn_infra = load_model('./infrastructure_damage_model.h5')  # Infrastructure model

# Define class labels and additional information for image classification
class_labels_image = {
    0: 'Damaged Infrastructure',
    1: 'Fire Disaster',
    2: 'Human Damage',
    3: 'Land Disaster',
    4: 'Water Disaster'
}

class_info_image = {
   "Damaged Infrastructure": "Damaged infrastructure during and after a disaster can create conditions of further vulnerability for people, as it may reduce access to certain resources or income-generating activities, making them less resilient to new and emerging risks¹. For instance, construction sites are at higher risk than regular commercial properties during disaster times for a number of reasons. The standard measures that would protect a building from a disaster, such as earthquake-proof structures or internal fire reduction systems, are not yet in place. \n Precautions and points to remember during and after a disaster include:- Avoid moving water, regardless of depth or speed⁴.- Do not drive through flooded roads.\n- Leave your home or building if you hear shifting or unusual noises.\n- Stay away from power lines.\n- Watch out for fallen power lines that may be hanging overhead.\n- Call the electric company to report fallen power lines.It's crucial to identify the risks prevalent in the geographic area and create an emergency plan to help reduce the risk associated with these threats. Proper training for team members on what needs to happen in a disaster is also essential. By taking these precautions, the overall cost of a natural disaster will be much lower, and everyone on the site and around it will be protected.",

    'Fire Disaster': 'Fire disasters can cause significant human damage, including injuries and loss of life. Here are some precautions and points to remember during and after a fire disaster.Before a Fire Disaster:\nKeep your workplace tidy and maintain a good standard of housekeeping1.\nRegularly remove combustible waste, including accumulations of dust1.\nKeep ignition sources away from combustible material or flammable liquids and gases1.\nPrepare an emergency plan and create a written evacuation procedure1.\nTrain your employees and ensure that they are familiar with the emergency plan1.\nTest the arrangements in the plan regularly and carry out a fire drill at least twice a year1.During a Fire Disaster:\nGetting out quickly and safely is your only goal. Do not try to “save” any objects, no matter how valuable2.\nNever use an elevator during a fire. Always take the stairs2.\nStay low to the ground. Cover your mouth and nose with a cloth or your shirt to prevent breathing in smoke or dangerous fumes2.\nWear protective clothing and make sure that you have closed all the doors and windows to keep the smoke and other flammable particles from entering your home3.\nAfter a Fire Disaster:\nGet medical help right away by calling the emergency services4.\nContact your local disaster relief service, such as The Red Cross, if you need temporary housing, food, and medicines4.\nCheck with the fire department to make sure your residence is safe to enter4.\nDO NOT attempt to reconnect utilities yourself4.',

    'Human Damage': '',

    'Land Disaster':'This class represents areas where there has been damage to human life due to a disaster.',
    'Land Disaster': 'Land disasters, such as landslides, can cause significant damage to both property and human life. Here are some precautions and points to remember during and after a land disaster:\nBefore a Land Disaster:\mAssess the soil before constructing your home or any property in a landslide-prone or hilly area\nMake buildings away from steep slopes, edge of mountains, drainage ways, or natural erosion valleys1\nBuild embankments on the gradient slopes and retaining walls1.\nFit flexible gas pipes to avoid leakage1.\nBuy insurance that covers the damage caused to your property for landslide damage1.\nImplement land-use zoning cover in areas most vulnerable to landslides or other natural hazards1.\nPrepare evacuation plans and an emergency supply kit containing all necessary items required during such hazards1.\nStay updated with the latest emergency information through radio alerts and television sources1.\nDuring a Land Disaster:\nIf you stay in a landslide-prone area, try to evacuate the place as early as possible1.\nBe aware of unusual cracking or rolling of huge stones1.\nKeep a watch on the water in the stream or channel. A rise in water level or transformation of color from clear to muddy can be alarming1.\nStay out of the path of debris or landslides1.\nKeep watch on the road for mud blocks or debris overflow1.\nAfter a Land Disaster:\nFree the head of the affected person first2.\nRemove snow and water from their mouth and nose2.\nRemove wet clothes and dry the affected person’s body2.\nWrap them in dry clothes/blankets2.\nAdminister CPR (Cardio Pulmonary Resuscitation), if needed, and give cardiac massage2.\nSeek medical attention immediately2.\nRemember, the key to minimizing human damage during a land disaster is preparedness, quick response, and immediate post-disaster actions.',

    'Water Disaster': 'Water disasters, such as floods, can cause significant damage to both property and human life. Here are some precautions and points to remember during and after a water disaster:\nBefore a Water Disaster:\nKnow your evacuation zone, know your evacuation routes and plan where you will go1.\nPrepare a small bag with essentials1.\nTune in to local media for flood watches and warnings1.\nHeed warnings from officials and evacuate when orders are given1.\nDuring a Water Disaster:\nDon’t panic1.\nAvoid moving water, regardless of depth or speed2.\nDo not drive through flooded roads. Cars can be swept away or break down2.\nFollow all warnings about water on roadways2.\nIf you have to work in or near floodwater, wear a life jacket2.\nAfter a Water Disaster:\nUse Safe Water After a Natural Disaster or Emergency3.\nDo not use water you suspect or have been told is contaminated to drink, wash dishes, brush your teeth, wash and prepare food, wash your hands, make ice, or make baby formula3.\nUse bottled, boiled, or treated water for drinking, cooking, and personal hygiene3.\nAvoid drinking alcohol. Alcohol dehydrates the body, which increases the need for drinking water3.\nBoil water before drinking or cooking4.\nKeep your surroundings clean by using disinfectants4.\nCover drain holes to prevent backflow of sewage4.\nClear debris from your premises4.\nStay inside until you receive proper information that it’s safe to move outside4.\nRemember, the key to minimizing human damage during a water disaster is preparedness, quick response, and immediate post-disaster actions.'
}

# Define class labels and additional information for the infrastructure model
class_labels_infra = {
    0: 'Not Damaged',
    1: 'Damaged'
}

class_info_infra = {
    'Not Damaged': 'Your image assessment indicates that the building is structurally sound. There are no visible signs of damage or deterioration, ensuring the integrity of the structure is intact.\n Regular maintenance is advisable to keep the building in optimal condition. If you have any concerns or wish to conduct further inspections, feel free to reach out. Thank you for using our service',
    
    'Damaged': 'The assessment has revealed that the building has sustained damage, which may require immediate attention. It is essential to conduct a thorough inspection to evaluate the extent of the damage and necessary repairs. \n We recommend consulting a qualified professional to ensure safety and prevent further issues. Your safety is our priority, and we encourage you to take appropriate action based on this assessment. Thank you for trusting us with your evaluation!'
}

# Home page route
@app.route('/')
def home():
    return render_template('index.html')

# Helper function for image preprocessing
def preprocess_image(file, target_size):
    img = Image.open(file).resize(target_size)  # Resize the image
    img_array = image.img_to_array(img)  # Convert to array
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize and add batch dim
    return img_array

# Route for image prediction
@app.route('/predict_image', methods=['POST'], endpoint='predict_image')
def predict_image():
    try:
        file = request.files['image']
        img_array = preprocess_image(file, (64, 64))

        # Make predictions using the image model
        prediction = cnn_image.predict(img_array)
        predicted_class = np.argmax(prediction)
        predicted_label = class_labels_image.get(predicted_class, 'Unknown')

        result = {
            'class': predicted_label,
            'info': class_info_image.get(predicted_label, 'No additional information available.')
        }

        print("Image Prediction Result:", result)
        return jsonify(result)  # Return JSON response

    except Exception as e:
        print("Error:", e)
        return str(e), 400  # Return error as response

# Route for infrastructure prediction
# Ensure correct preprocessing for the infrastructure model
@app.route('/predict_infra', methods=['POST'], endpoint='predict_infra')
def predict_infra():
    try:
        # Load and preprocess the image
        file = request.files['infrastructure_image']
        img = Image.open(file)

        # Resize to model's expected input size (150x150)
        img = img.resize((150, 150))  # Change to the model's expected size

        # Convert to array and normalize
        img_array = image.img_to_array(img) / 255.0  # Normalize pixel values

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)  # Shape: (1, 150, 150, 3)

        # Debug: Check the shape before prediction
        print(f"Processed Image Shape: {img_array.shape}")

        # Make prediction
        prediction = cnn_infra.predict(img_array)[0][0]  # Get the prediction score
        print(f"Prediction Score: {prediction}")

        # Use a tuned threshold based on observations
        predicted_label = 'Not Damaged' if prediction > 0.5 else 'Damaged'

        result = {
            'damage_class': predicted_label,
            'damage_info': class_info_infra.get(predicted_label, 'No additional information available.')
        }

        print("Infrastructure Prediction Result:", result)
        return jsonify(result)

    except Exception as e:
        print("Error:", e)
        return str(e), 400



# Run the app
if __name__ == '__main__':
    app.run(debug=True)
