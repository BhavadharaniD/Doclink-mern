🩺 DocLink – Online Doctor Consultation Platform
DocLink is a full‑stack MERN (MongoDB, Express, React, Node.js) application that enables patients to book doctor appointments, consult doctors online in real time, receive digital prescriptions, and manage medical records securely.

The system supports role‑based access for Patients and Doctors and includes real‑time chat using WebSockets, notifications, and clean dashboards.

🚀 Features
👤 Authentication
User registration and login

Role‑based authentication (Patient / Doctor)

JWT‑based secure authentication

Protected routes

🧑‍⚕️ Doctor Features
Doctor dashboard

View appointment requests

Approve / reject appointments

Real‑time chat with patients

Write digital prescriptions

View prescription history

Receive notifications

🧑‍💼 Patient Features
Register & login

Find doctors

Book appointments

Track appointment status

Real‑time chat with doctors

View prescriptions & medical records

Receive notifications

Dashboard overview

💬 Real‑Time Functionality
Real‑time chat using Socket.IO

Appointment‑based chat rooms

JWT authentication for WebSocket connections

Instant message delivery between doctor and patient

🛠️ Tech Stack
Frontend
React (Vite)

Tailwind CSS

Axios

Socket.IO Client

Backend
Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Socket.IO


📂 Project Folder Structure
doclink-mern/
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Business logic (appointments, auth, chat, prescriptions)
│   │   ├── models/             # Mongoose schemas (User, Appointment, Message, Notification)
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, role checks, error handling
│   │   ├── config/             # Database connection
│   │   ├── utils/              # Helper functions
│   │   └── server.js           # Express + Socket.IO server
│   │
│   ├── .env                    # Environment variables (ignored by git)
│   ├── package.json
│   └── nodemon.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── doctor/         # Doctor‑specific components
│   │   │   ├── patient/        # Patient‑specific components
│   │   │   └── common/         # Shared components
│   │   │
│   │   ├── pages/              # Page‑level components (Dashboards, Login, Home)
│   │   ├── api/                # Axios API configuration
│   │   ├── socket.js           # Socket.IO client setup
│   │   ├── utils/              # Auth helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
⚙️ Environment Variables
Create a .env file inside the backend folder:


PORT=5000
MONGO_URI=mongodb+srv://Docadmin:yizDLe3NvvFlNaAz@cluster0.94gwank.mongodb.net/doclink?retryWrites=true&w=majority

JWT_SECRET=doclink_secret


▶️ Run the Project Locally
Backend
cd backend
npm install
npm run dev
Backend runs on:

http://localhost:5000
Frontend
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:5173
🌍 Deployment
Backend
Deployed on Render

Environment variables configured in Render dashboard

Frontend
Deployed on Vercel

API base URL updated to deployed backend

Database
MongoDB Atlas

