# 🌍 Language Exchange & Chat Platform

A **real-time messaging** and **video calling** web application where users can connect with friends, exchange languages, and collaborate through group calls — all with a sleek UI and secure authentication.

---

## ✨ Features

### 💬 Messaging
- 🌐 **Real-time Chat** powered by [Stream](https://getstream.io/)  
- ⌨️ **Typing Indicators** to see when someone is responding  
- ❤️ **Message Reactions** for quick feedback  
- 🖼️ Support for **Profile Pictures** and user info

### 📹 Video & Audio Calls
- **1-on-1** and **Group Video Calls**
- 🎥 **Screen Sharing** for collaboration
- 📼 **Call Recording** support
- ⚡ Low-latency streaming

### 🔐 Authentication & Security
- **JWT Authentication**
- **Protected Routes** to safeguard private data
- Backend **Input Validation** for all APIs
- Encrypted password storage

### 🌍 Language Exchange
- Users can set **Native** & **Learning Languages**
- **Onboarding Flow** to collect profile details
- Recommendation system to find potential language partners

### 🎨 UI & Experience
- **32 Unique UI Themes**
- Tailored responsive design with **TailwindCSS**
- Dark & Light mode support
- **Error Handling** for both frontend & backend

### 🛠️ Additional Goodies
- 🚀 Free Deployment-ready
- 🧠 Global state with **Zustand**
- ⚡ Efficient data fetching via **TanStack Query**
- Scalable backend architecture
- MongoDB document relationships for friends & requests

---

## 🖥️ Tech Stack

**Frontend**:
- React.js
- TailwindCSS
- Zustand (State Management)
- TanStack Query
- Stream Chat SDK

**Backend**:
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Stream Video & Messaging API

**Other**:
- REST API architecture
- Error handling middleware
- Secure cookies

---

## 📂 Project Structure

root/
├── backend/
│ ├── controllers/ # Business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── middlewares/ # Authentication & validation
│ └── lib/ # Stream integration utils
│
├── frontend/
│ ├── components/ # Reusable UI components
│ ├── pages/ # App pages
│ ├── store/ # Zustand store
│ └── lib/ # API helper functions
│
└── README.md

## Environment Variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
NODE_ENV=development
