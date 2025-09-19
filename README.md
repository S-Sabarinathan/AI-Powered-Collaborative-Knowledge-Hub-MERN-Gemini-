#  AI-Powered Collaborative Knowledge Hub (MERN + Gemini)

AI-Powered Collaborative Knowledge Hub (MERN + Gemini) is a full-stack web application for managing, searching, and analyzing documents with AI-powered features. It includes **user dashboards**, **admin dashboards**, semantic search, and authentication with role-based access.

## 🚀 Features

### User Features

* **User Authentication:** Register, login, and reset password.
* **Semantic Search:** Search documents with AI-powered semantic analysis.
* **Document Management:** View your documents with summaries and scores.
* **Responsive UI:** Works on desktop and mobile devices.

### Admin Features

* **Admin Dashboard:** View stats for documents, users, and AI requests.
* **Users Table:** Manage and view registered users.
* **All Documents:** Full list of all documents.
* **Logout:** Secure logout with feedback notifications.

### UI/UX Enhancements

* Animated stat cards and hover effects.
* Loading spinners while fetching data.
* Show/hide password toggle.
* Tag badges for documents.

## 🛠 Technology Stack

**Frontend:** React.js ⚛️, TailwindCSS 🎨

**Backend:** Node.js, Express.js 🚀

**Database:** MongoDB 🍃

**AI Integration:** Google Gemini API 🤖


## ⚡Setup Installation

1. **Clone the repository:**

```bash
git clone [https://github.com/S-Sabarinathan/AI-Powered-Collaborative-Knowledge-Hub-MERN-Gemini-.git]
cd AI-Powered-Collaborative-Knowledge-Hub-MERN-Gemini
```

2. **Install dependencies for backend:**

```bash
cd server
npm install
```

3. **Install dependencies for frontend:**

```bash
cd ../client
npm install
```

4. **Run the backend server:**

```bash
cd ../server
npm run dev
```

5. **Run the frontend:**

```bash
cd ../client
npm run dev
```

6. **Access the app:**

```
http://localhost:5173
```

---

## 🔑 Usage

* **User Dashboard:** After login, view your documents and perform semantic searches.
* **Admin Dashboard:** Admin users can view all documents, users, and overall stats.
* **Password Reset:** Users can request a password reset link via email.

---


## 💡 Future Improvements

* Add **charts** to visualize document analytics.
* Enable **document CRUD** operations for users.
* Implement **role-based permissions** for admin vs. user.
* Add **real-time notifications**.

---

## 📄 License

This project is licensed under the **MIT License**.

---

### ✅ Notes

* Make sure to set your `.env` variables for API keys and database connection.
* Admin credentials can be created manually in the database for now.

---

