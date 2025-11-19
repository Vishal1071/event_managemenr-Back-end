
---

## 🧠 BACKEND — `README.md`

```markdown
# ⚙️ Event Management System - Backend

This is the **backend** for the Event Management System.  
It handles authentication, authorization, and all CRUD operations for managing users, events, and admin functionalities.

---

## 🧱 Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing
- CORS

---

## 🚀 Features

- 🔐 Secure login and registration with JWT  
- 🧑‍💼 Role-based access (Admin & User)  
- 📦 CRUD APIs for event management  
- 🔍 Search & filter support  
- ⚙️ MongoDB with Mongoose for data modeling  

---

## ⚙️ Installation & Setup

```bash
# Clone this repository
git clone https://github.com/Vishal1071/event-management-backend.git

# Move into the folder
cd event-management-backend

# Install dependencies
npm install

# Setup environment variables in a .env file
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=8080

# Run the server
npm run dev
