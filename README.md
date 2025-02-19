# Feedback Application - Frontend (React)

## 📌 Project Overview

This repository contains the **frontend** of a simple **Feedback Application** built using **React.js**.  
Users can submit feedback, and all submissions are displayed in a styled UI.  
The application uses **TailwindCSS** for styling and **Framer Motion** for smooth animations.

---

## 🚀 Features

✅ User can submit **Name, Email, and Feedback**  
✅ Displays submitted feedback below the form  
✅ **Form validation** to ensure correct input  
✅ **Success message** appears after submission  
✅ **Framer Motion** for smooth animations  
✅ **TailwindCSS** for modern UI styling  

---

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (Download from [Node.js Official Site](https://nodejs.org/))
- **Git** (Download from [Git](https://git-scm.com/))

---

## 📥 Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/LSG_hub/feedback-frontend.git
cd feedback-frontend
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Start the Application**
```sh
npm start
```

Once started, open your browser and visit:
```sh
http://localhost:3000
```

---

## ⚙️ Project Structure
```sh
feedback-frontend/
│── src/
│   ├── components/      # Reusable UI components
│   ├── App.js           # Main React Component
│   ├── index.js         # Entry point
│   ├── styles.css       # Global styles
│── public/
│── package.json         # Project dependencies
│── README.md            # Project documentation
```

---

## 🔧 Configuration

By default, the frontend communicates with the backend hosted on Render.com.
If running the backend locally, update the API URL in App.js:
```sh
const API_URL = "http://localhost:5000/feedback";
```

---

## 🔥 Running Tailwind CSS

TailwindCSS is already set up using PostCSS.
To modify styles, update index.css:
```sh
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 Deployment

### ✅**Deploy on Vercel**
```sh
npm run build
vercel deploy
```

### ✅**Deploy on Netlify**
```sh
npm run build
netlify deploy
```

---

## 🔗 Backend Repository

The backend for this project is available at:
https://github.com/LSG_hub/feedback-backend

---

## ❓ Troubleshooting

### ❌**Issue: Dependencies failing to install**
### ✅**Solution: Run the following command:**
```sh
rm -rf node_modules package-lock.json && npm install
```

### ❌**Issue: Port 3000 already in use**
### ✅**Solution: Change the default React port:**
```sh
set PORT=4000 && npm start
```

---

## 📜 License

This project is open-source and free to use.

---

## 👨‍💻 Author

Developed by Sreenivas Gurram
USN: 1BM21AI123



