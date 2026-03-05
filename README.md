# UserEnquiry MERN Project

A simple full-stack **MERN** (MongoDB, Express, React, Node.js) application for handling user enquiries.  
This repo is split into two main parts:

- **`server/`** - Express API that connects to MongoDB and provides routes to create, list, and manage enquiries.
- **`client/`** - React application built with Vite that consumes the API and displays enquiry data to web users.

---

## 📁 Repository Structure

```
client/                # React frontend (Vite, TailwindCSS)
server/                # Node/Express backend
  ├─ App/controllers   # request handlers
  ├─ App/models        # Mongoose schemas
  ├─ App/routes        # API route definitions
  ├─ middleware/       # custom Express middleware
  ├─ index.js          # server entry point
  └─ .env              # environment variables (not checked in)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16)
- npm or Yarn
- MongoDB Atlas or local MongoDB instance

### Back-end Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.example` if available) with:
   ```dotenv
   DBURL=<your-mongodb-connection-string>
   PORT=8020
   ```
4. Start the server:
   ```bash
   npm run dev   # or nodemon index.js
   ```
   The API will be available at `http://localhost:8020`.

### Front-end Setup

1. Open a new terminal and go to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173` (or as shown by Vite).

---

## 🗂 Available Scripts

- `npm run dev` (both client and server): start development mode with hot reload.
- `npm start` / `node index.js`: run the built production server (after building client, if applicable).
- `npm run build` (frontend): generate optimized production build of React app.

---

## 🌱 Development Notes

- The backend uses **Mongoose** for schema definitions and data access.
- The frontend is bootstrapped with **Vite** and uses **Tailwind CSS** for styling.
- Routes are separated into `admin` and `web` namespaces under `server/App/routes`.

---

## ✅ Contributing

Feel free to fork the repository, make improvements, and submit pull requests.  
Ensure environment-specific secrets are stored in `.env` and not checked into source control.

---

## 📄 License

MIT License (or specify whichever license you're using).

---

_Happy hacking!_
