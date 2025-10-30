## 📌 NoteMate Backend

NoteMate is a secure note management backend that supports user authentication, creating notes, uploading note images using Cloudinary, updating and deleting notes, and pinning notes. It is designed to work with a modern frontend and follows a clean REST API structure.

---

### ✅ Features

* User authentication with JWT
* Create, read, update, delete notes
* Pin and unpin any note
* Cloudinary image upload support
* Authorization middleware to protect APIs
* MongoDB database integration
* Secure password hashing with bcrypt
* Organized folder structure

---

### 🛠️ Tech Stack

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| Node.js + Express  | Server and API handling    |
| MongoDB + Mongoose | Database and schema models |
| Cloudinary         | Uploading images           |
| Multer             | File upload handling       |
| JWT                | Authentication             |
| bcryptjs           | Password hashing           |
| CORS               | API access security        |

---

### 🔐 Environment Variables (.env)

Create a `.env` file in the root of your backend project and add:

```
PORT=5000
MONGO_URI=your_mongodb_uri_here

JWT_SECRET=your_jwt_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

### 📦 Install Dependencies

```bash
npm install
```

---

### ▶️ Run Server

```bash
npm run dev
```

Server will run on

```
http://localhost:5000
```

---

### 📁 Project Structure

```
NoteMate-Backend
│
├── controllers/
│   ├── authController.js
│   ├── notesController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── upload.js
│
├── models/
│   ├── userModel.js
│   ├── noteModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── notesRoutes.js
│
├── config/
│   ├── db.js
│   ├── cloudinary.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

### 🔗 API Endpoints

#### Auth Routes

| Method | Path             | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/signup` | User registration |
| POST   | `/auth/login`    | User login        |

#### Notes Routes (Require Auth Token)

| Method | Path             | Description                     |
| ------ | ---------------- | ------------------------------- |
| POST   | `/notes/create`  | Create note with optional image |
| GET    | `/notes/all`     | Get all notes of logged in user |
| PUT    | `/notes/pin/:id` | Pin or unpin note               |
| PUT    | `/notes/:id`     | Update a note                   |
| DELETE | `/notes/:id`     | Delete note                     |

---

### 🔑 Authentication

Include this in Headers for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

---

### 🌍 Cloudinary Setup

1. Create an account here:
   [https://cloudinary.com](https://cloudinary.com)
2. Copy Cloud name, API Key, API Secret into `.env`
3. Check `upload.js` already created for Multer and Cloudinary config

---

### ✅ Status Responses

API always returns:

```json
{
  "status": true or false,
  "message": "...",
  "note": {},
  "notes": []
}
```

---

### 🧑‍💻 Author

**Umair Ahmed**
Web and Chatbot Developer

---

### 📌 License

This project is open source and free to use.
