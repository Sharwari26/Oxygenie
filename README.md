**Project Name:** OxyGenie
**Project Type:** Plant Monitoring and Recognition Web Application

---

## 🌱 Project Workflow Overview (Step-by-Step)

### 1. **User Authentication**
- **User Action:** New users register; existing users log in.
- **Technology:** PHP for backend logic, MySQL for storing user credentials.
- **Files:** `register.php`, `login.php`, `user_table` in MySQL.

### 2. **User Dashboard / Home Page**
- **Page:** `home.html`
- **Features:**
  - Welcome message
  - Sections like:
    - Most Searched For
    - Indoor Plants
    - Outdoor Plants
    - Ayurveda Tips
    - Gardening Guide

### 3. **Scan a Plant Page**
- **Page:** `scan.html` or `identify.html`
- **User Action:** Uploads a plant/leaf image
- **Backend:** Image is stored temporarily in `/uploads/`
- **Input to Model:** Image file (JPG/PNG)

### 4. **Prediction using ML Model**
- **Script:** `predict.py`
- **Model:** MobileNetV2 (Pretrained on ImageNet, fine-tuned on plant dataset)
- **Input:** Uploaded plant image
- **Output:** Predicted plant label (e.g., "Neem")
- **Reference Model:** [Plant Recognition with MobileNetV2 – Kaggle](https://www.kaggle.com/code/mahmoudshaheen1134/plant-recognition-with-mobilenetv2/input)

### 5. **Retrieving Plant Details**
- **Storage:** Static JSON file (`plant_info.json`) or MySQL database
- **Data Includes:**
  - Plant benefits
  - Usage instructions
  - Category: indoor/outdoor
  - Ayurveda relevance
- **Output:** Full description fetched by predicted label

### 6. **Display Results to User**
- **Page:** `result.html`
- **Details Shown:**
  - Predicted plant name
  - Image preview
  - Benefits (10 points max)
  - How & Where to Use (5 points max)

### 7. **Most Searched Tracking**
- **Function:** Count how many times a plant is searched
- **Database Table:** `search_counts`
- **Displayed On:** Home page (Most Searched For section)

### 8. **User History (Optional)**
- **Function:** Save previous scans with date-time
- **Table:** `scan_history`
- **Shown On:** User profile/dashboard

---

## 🚀 Technologies Used

### Frontend:
- HTML, CSS, JavaScript
- Bootstrap (for responsive UI)

### Backend:
- PHP (User auth, session management, DB connection)
- Flask (ML model API)
- Python (predict.py, model logic)

### ML Model:
- MobileNetV2 (Keras / TensorFlow)
- Pretrained on ImageNet
- Fine-tuned on custom plant image dataset
- Reference: [Kaggle - Plant Recognition](https://www.kaggle.com/code/mahmoudshaheen1134/plant-recognition-with-mobilenetv2/input)

### Database:
- MySQL:
  - `users` table
  - `search_counts` table
  - `scan_history` table (optional)
- JSON:
  - `plant_info.json` (plant names + benefits + usage)

---

## 🧾 File Structure

```plaintext
OxyGenie/
├── css/
│   ├── style.css
│   └── ayurveda.css
├── js/
│   └── script.js
├── images/
├── uploads/                   # Temporary image uploads
├── ml_model/
│   ├── model.h5               # MobileNetV2 trained model
│   ├── predict.py             # Flask API to predict plant
│   ├── plant_info.json        # Static info about plants
│   └── requirements.txt
├── templates/                 # Flask HTML templates (if used)
├── index.html                 # Landing page
├── home.html                  # Main dashboard after login
├── scan.html / identify.html  # Upload image to scan
├── result.html                # Shows predicted plant + info
├── login.php / register.php   # Authentication logic
├── database.sql               # MySQL table creation script
└── README.md
```

---

## 📆 Future Improvements
- Add user profiles and editable preferences
- Advanced search filter (plant type, indoor/outdoor, benefits)
- Batch upload for multiple plants
- Real-time disease detection and remedy suggestion
- Voice command-based scanning and info retrieval
- Add AI chatbot to assist with plant queries
