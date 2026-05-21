# Skill-Swap 🚀

A platform where Gen Z users can exchange skills with each other. No money needed — just knowledge!

## Features
- 🔐 Register & Login with JWT authentication
- 🎯 Smart skill matching algorithm
- 🤝 Send, accept & reject swap requests
- ⭐ Rate users after a swap
- ✏️ Edit your profile anytime

## Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt

**Frontend:** React, Vite, Tailwind CSS, DaisyUI, Axios

## How to Run

### Backend
cd backend
npm install
node server.js

### Frontend
cd frontend
npm install
npm run dev

## Environment Variables
Create a `.env` file in the backend folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000