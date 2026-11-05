# 🍔 RestoPi Cloud POS & Online Ordering System

A full-stack, cloud-native Point of Sale (POS) and online food ordering web application built for restaurant management, real-time cart handling, category filtering, and seamless customer checkout workflows.

---

## 🚀 Live Demo & Deployment Links
* **Frontend App (Vercel):** [https://online-pos-management.vercel.app](https://online-pos-management.vercel.app)[cite: 6]
* **Backend API (Render):** [https://online-pos-management.onrender.com](https://online-pos-management.onrender.com)[cite: 6]
* **API Health Check / Products Endpoint:** [https://online-pos-management.onrender.com/api/products](https://online-pos-management.onrender.com/api/products)[cite: 6]

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Modern CSS / Responsive Grid Layouts
* **Deployment:** Vercel[cite: 6]

### Backend
* **Runtime:** Node.js[cite: 1]
* **Framework:** Express.js[cite: 1]
* **Database ODM:** Mongoose[cite: 1]
* **Deployment:** Render[cite: 6]

### Database
* **Cloud Database:** MongoDB Atlas (NoSQL)[cite: 1]

---

## ✨ Key Features
* **Dynamic Menu & Category Filtering:** Browse items seamlessly across categories (e.g., All Menu Items, Burgers, Beverages) fetched dynamically from the database.
* **Interactive Cart & Order Management:** Add items, adjust quantities, calculate real-time totals, and review order summaries before checkout.
* **Validated Customer Checkout:** Secure checkout form with comprehensive client-side validation (name, email, mobile number, delivery address, pincode) and order submission handling.
* **RESTful API Architecture:** Clean client-server separation with robust endpoint routing for products, categories, and customer orders.
* **Cloud-Native Production Setup:** Configured with environment variables (`VITE_API_URL` and `MONGO_URI`) for smooth zero-downtime production deployment across Vercel and Render.

---

## 📂 Project Architecture

```text
restopi-ordering-system/
├── backend/
│   ├── models/        # Mongoose schemas (Product, Category, Order)
│   ├── routes/        # API route handlers
│   ├── seed.js        # Database sample menu seeder script
│   ├── server.js      # Express app entry point & MongoDB connection
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/ # React components (ProductList, CheckoutForm, etc.)
    │   ├── App.jsx     # Main application container & state management
    │   └── main.jsx    # React root render
    ├── package.json
    └── vite.config.js
