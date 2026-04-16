![Banner](.github/images/banner.png)

# Grouppette Backend

Grouppette Backend is a robust, Type-safe Node.js API built with **TypeScript**, **Express**, and **MongoDB**. It serves as the data layer for the Grouppette platform, managing product information and user reviews.

## 🚀 Features

- **Product Management**: Fetch and list product data stored in MongoDB.
- **Review System**: Complete CRUD capabilities for user reviews (fetch and insert).
- **TypeScript Integration**: Full type safety across the application for better developer experience and reliability.
- **Scalable Architecture**: Modularized route handlers and database logic.
- **Environment Driven**: Secure configuration using `dotenv`.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Official Driver)
- **Environment Management**: Dotenv
- **CORS**: Enabled for cross-origin frontend communication

---

## 📂 Project Structure

```text
├── build/              # Compiled JavaScript files
├── db.ts               # MongoDB connection logic
├── getProducts.ts      # Logic/Handler for fetching products
├── getReviews.ts       # Logic/Handler for fetching reviews
├── index.ts            # Entry point of the application
├── insertReview.ts     # Logic/Handler for creating reviews
├── .env                # Environment variables (Internal only)
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lasheralberto/grouppette-backend.git
   cd grouppette-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your connection string:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/grouppette
   ```

### Running the Application

- **Development Mode** (with hot-reload):
  ```bash
  npm run dev
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Start Production Server**:
  ```bash
  npm start
  ```

---

## 📡 API Endpoints

### Products
- **GET** `/products` - Retrieves a list of all available products.

### Reviews
- **GET** `/reviews` - Retrieves all user reviews.
- **POST** `/reviews` - Submits a new review.
  - **Body Requirements**:
    ```json
    {
      "productId": "string",
      "rating": 5,
      "comment": "Great product!",
      "user": "Username"
    }
    ```

---

## 💻 Code Usage Example

The backend uses a modular approach for database operations. Here is a conceptual example of how reviews are inserted (based on `insertReview.ts`):

```typescript
import { Collection } from 'mongodb';
import { connectToDatabase } from './db';

export const insertReview = async (reviewData: any) => {
  const db = await connectToDatabase();
  const collection: Collection = db.collection('reviews');
  
  const result = await collection.insertOne(reviewData);
  return result;
};
```

---

## 🛠 Development Scripts

| Script | Description |
| :--- | :--- |
| `npm run build` | Compiles TypeScript files into the `build/` directory. |
| `npm run start` | Runs the compiled application from `build/index.js`. |
| `npm run dev` | Starts the development server using `ts-node-dev`. |

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---
**Author**: [lasheralberto](https://github.com/lasheralberto)  
**Project Link**: [https://github.com/lasheralberto/grouppette-backend](https://github.com/lasheralberto/grouppette-backend)