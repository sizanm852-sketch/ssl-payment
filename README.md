# 💳 SSLCommerz Payment Integration

A full-stack **SSLCommerz payment gateway integration** built with **React + TypeScript** on the frontend and **Express + TypeScript** on the backend.

This project demonstrates how to integrate the **SSLCommerz Hosted Payment Gateway** with a modern React application, handle payment success/failure/cancellation callbacks, validate transactions, store transaction records in MongoDB, and query refund status.

---

## ✨ Features

* 💳 SSLCommerz Hosted Checkout integration
* 🔐 Server-side payment initialization
* 🧾 Unique invoice/transaction ID generation
* 💰 Dynamic payment amount
* 👤 Customer information collection
* 🗄️ MongoDB transaction storage
* ⏳ Pending transaction tracking
* ✅ Payment validation after successful checkout
* ❌ Failed payment handling
* 🚫 Cancelled payment handling
* 🔄 Refund status query
* 🌐 React SPA frontend
* ⚡ Vite development environment
* 🎨 Tailwind CSS styling
* 🔔 Toast notifications
* 📱 Responsive checkout interface
* 🌓 Dark-mode-ready UI
* 🛡️ CORS configuration
* 📦 TypeScript throughout the frontend and backend

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│      React Client   │
│   Vite + TypeScript │
└──────────┬──────────┘
           │
           │ POST /api/payment/initiate
           ▼
┌─────────────────────┐
│   Express Backend   │
│   TypeScript        │
└──────────┬──────────┘
           │
           ├──────────────► MongoDB Atlas
           │                  │
           │                  └── Transaction records
           │
           ▼
┌─────────────────────┐
│     SSLCommerz      │
│   Payment Gateway   │
└──────────┬──────────┘
           │
           │ Payment
           ▼
┌─────────────────────┐
│      Customer       │
│ Completes Payment   │
└──────────┬──────────┘
           │
           │ Success / Fail / Cancel
           ▼
┌─────────────────────┐
│   Express Callback  │
│       Routes        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Update Transaction  │
│      Status         │
└─────────────────────┘
```

---

# 🗂️ Project Structure

```text
ssl-payment/
│
├── client/                         # React frontend
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Checkout form
│   │   │   ├── Success.tsx         # Successful payment page
│   │   │   ├── Failed.tsx          # Failed payment page
│   │   │   ├── Refund.tsx          # Refund page
│   │   │   └── RefundQuery.tsx     # Refund status query page
│   │   │
│   │   ├── App.tsx                 # Application routes
│   │   ├── App.css                 # Application styles
│   │   ├── index.css               # Global styles
│   │   └── main.tsx                # React entry point
│   │
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── eslint.config.js
│
├── server/                         # Express backend
│   │
│   ├── src/
│   │   ├── controller/
│   │   │   └── paymentController.ts
│   │   │
│   │   ├── db/
│   │   │   └── db.ts              # MongoDB connection
│   │   │
│   │   ├── middleware/
│   │   │
│   │   ├── model/
│   │   │   └── model.ts           # Transaction schema
│   │   │
│   │   ├── route/
│   │   │   └── payment.route.ts   # Payment API routes
│   │   │
│   │   ├── types/
│   │   │
│   │   ├── utils/
│   │   │   └── functions.ts       # Invoice/transaction ID generator
│   │   │
│   │   └── index.ts               # Express application entry
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

The repository currently separates the frontend into `client` and the backend into `server`. The backend source is further organized into controllers, database, middleware, models, routes, types, and utilities.

---

# 🛠️ Tech Stack

| Layer                 | Technology         |
| --------------------- | ------------------ |
| Frontend              | React 19           |
| Language              | TypeScript         |
| Build Tool            | Vite               |
| Styling               | Tailwind CSS 4     |
| Routing               | React Router DOM 7 |
| Notifications         | React Hot Toast    |
| HTTP Client           | Axios              |
| Backend               | Express 5          |
| Database              | MongoDB            |
| ODM                   | Mongoose           |
| Payment Gateway       | SSLCommerz         |
| Payment SDK           | `sslcommerz-lts`   |
| ID Generation         | UUID               |
| Server Development    | Nodemon            |
| Environment Variables | dotenv             |
| CORS                  | cors               |
| Request Parsing       | body-parser        |

The dependency versions and available scripts are defined in the repository's frontend and backend `package.json` files.

---

# 📋 Prerequisites

Before starting the project, make sure you have:

* Node.js 18+
* npm
* MongoDB Atlas account or MongoDB server
* SSLCommerz Sandbox account
* SSLCommerz Store ID
* SSLCommerz Store Password

For SSLCommerz sandbox credentials, create/register a sandbox merchant account through the official SSLCommerz developer platform.

> ⚠️ Never expose your SSLCommerz Store Password in frontend code.

---

# 🔑 SSLCommerz Sandbox

This project currently initializes the SSLCommerz SDK with:

```ts
const isLive = false;
```

That means the integration is configured for **sandbox/testing mode** rather than live production mode.

Before going live, you should replace the sandbox configuration with your production credentials and review all callback URLs and security settings.

---

# ⚙️ Environment Variables

Create a `.env` file inside the `server/` directory.

```env
# ==============================
# Server
# ==============================

PORT=5000


# ==============================
# MongoDB
# ==============================

DB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/payment


# ==============================
# SSLCommerz
# ==============================

STORE_ID=your_sslcommerz_store_id

STORE_PASS=your_sslcommerz_store_password

CURRENCY=BDT


# ==============================
# Payment Callback URLs
# ==============================

SUCCESS_URL=http://localhost:5000/api/payment/success

FAIL_URL=http://localhost:5000/api/payment/fail

CANCEL_URL=http://localhost:5000/api/payment/cancel
```

The backend reads `STORE_ID`, `STORE_PASS`, `CURRENCY`, `SUCCESS_URL`, `FAIL_URL`, `CANCEL_URL`, `PORT`, and `DB` from environment variables.

---

## 📝 Example `.env`

```env
PORT=5000

DB=mongodb+srv://myuser:mypassword@cluster0.example.mongodb.net/ssl_payment

STORE_ID=test_store_id

STORE_PASS=test_store_password

CURRENCY=BDT

SUCCESS_URL=https://sandbox-gw.sslcommerz.com/success

FAIL_URL=https://sandbox-gw.sslcommerz.com/fail

CANCEL_URL=https://sandbox-gw.sslcommerz.com/cancel
```

> Replace the example credentials with your own SSLCommerz Sandbox credentials.

---

# 🔒 Important: `.env` Security

Never commit your `.env` file.

Your `.gitignore` should contain:

```gitignore
.env
node_modules/
dist/
```

If you accidentally expose your SSLCommerz credentials or MongoDB connection string, rotate the credentials immediately.

---

# 🚀 Installation & Setup

## Step 1: Clone the repository

```bash
git clone https://github.com/sizanm852-sketch/ssl-payment.git

cd ssl-payment
```

---

# Step 2: Setup the Backend

Open a terminal:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
touch .env
```

Add your environment variables:

```env
PORT=5000

DB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ssl_payment

STORE_ID=your_store_id

STORE_PASS=your_store_password

CURRENCY=BDT

SUCCESS_URL=http://localhost:5000/api/payment/success

FAIL_URL=http://localhost:5000/api/payment/fail

CANCEL_URL=http://localhost:5000/api/payment/cancel
```

---

## Start Backend

For development:

```bash
npm run dev
```

The backend development script compiles TypeScript while running Nodemon against the generated `dist` output.

Expected output:

```text
Server started on port http://localhost:5000
🚀 Successfully connected to MongoDB Atlas
```

Backend:

```text
http://localhost:5000
```

---

# Step 3: Setup the Frontend

Open a second terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The current frontend uses Vite and the backend CORS configuration explicitly allows `http://localhost:5173`.

---

# ▶️ Run the Complete Project

You need two terminals.

### Terminal 1

```bash
cd server
npm run dev
```

### Terminal 2

```bash
cd client
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 💳 How the Payment Works

The checkout page collects:

* Customer name
* Email
* Phone
* Address
* Payment amount

The frontend sends this information to:

```http
POST /api/payment/initiate
```

The backend then:

1. Generates a unique transaction ID.
2. Creates a `PENDING` transaction in MongoDB.
3. Creates an SSLCommerz payment request.
4. Receives the SSLCommerz Gateway URL.
5. Sends the Gateway URL back to the frontend.
6. Redirects the customer to SSLCommerz.
7. Customer completes the payment.
8. SSLCommerz sends the result to the configured callback URL.
9. Backend validates the transaction using `val_id`.
10. MongoDB transaction status is updated.
11. Customer is redirected to the appropriate frontend page.

The actual implementation saves the transaction as `PENDING` before calling SSLCommerz and validates successful payments server-side before marking them `SUCCESS`.

---

# 🔄 Payment Flow

```text
Customer
   │
   │ Fill checkout form
   ▼
React Client
   │
   │ POST /api/payment/initiate
   ▼
Express Server
   │
   ├── Generate transaction ID
   │
   ├── Save PENDING transaction
   │
   ▼
SSLCommerz
   │
   │ Gateway URL
   ▼
Customer
   │
   │ Complete payment
   ▼
SSLCommerz
   │
   ├───────────────┐
   │               │
   ▼               ▼
 SUCCESS          FAIL
   │               │
   ▼               ▼
Backend          Backend
   │               │
   │ Validate      │ Update
   │ val_id        │ FAILED
   ▼               ▼
MongoDB          MongoDB
SUCCESS           FAILED
   │
   ▼
React Success Page
```

---

# 🧾 Transaction ID

The backend generates transaction IDs using UUID.

Current format:

```text
INV-4A7B2C9D1E3F
```

The implementation:

```ts
const id = `INV-${uuidv4()
  .replace(/-/g, "")
  .substring(0, 12)
  .toUpperCase()}`;
```

This creates a 12-character uppercase hexadecimal identifier after the `INV-` prefix.

Example:

```text
INV-A91F72C4D821
```

---

# 🗄️ Database

MongoDB is used to store payment transactions.

The application connects using Mongoose.

## Transaction Schema

```text
Transaction
│
├── tran_id
├── val_id
├── amount
├── currency
├── status
├── cus_name
├── cus_email
├── cus_phone
├── createdAt
└── updatedAt
```

The supported transaction states are:

```text
PENDING
SUCCESS
FAILED
CANCELLED
```

The `tran_id` field is unique, and Mongoose timestamps are enabled.

---

# 📊 Transaction Status Lifecycle

```text
             ┌─────────────┐
             │   PENDING   │
             └──────┬──────┘
                    │
          ┌─────────┼─────────┐
          │         │         │
          ▼         ▼         ▼
      SUCCESS     FAILED   CANCELLED
```

### PENDING

Created when payment initiation begins.

### SUCCESS

Set after SSLCommerz successfully validates the payment.

### FAILED

Set when the payment fails or validation does not succeed.

### CANCELLED

Set when the customer cancels the payment.

---

# 🔗 API Endpoints

Base URL:

```text
http://localhost:5000
```

| Method | Endpoint                    | Description                         |
| ------ | --------------------------- | ----------------------------------- |
| `POST` | `/api/payment/initiate`     | Initiates an SSLCommerz payment     |
| `POST` | `/api/payment/success`      | Handles successful payment callback |
| `POST` | `/api/payment/fail`         | Handles failed payment callback     |
| `POST` | `/api/payment/cancel`       | Handles cancelled payment callback  |
| `GET`  | `/api/payment/refund-query` | Queries refund status               |
| `GET`  | `/`                         | Backend health/welcome response     |

These routes are defined in `payment.route.ts`.

---

# 📥 Initiate Payment

### Request

```http
POST /api/payment/initiate
Content-Type: application/json
```

Example:

```json
{
  "amount": 500,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh"
}
```

---

# 📤 Initiate Payment Response

Successful response:

```json
{
  "url": "https://sandbox.sslcommerz.com/..."
}
```

The frontend uses this URL to redirect the customer to the SSLCommerz hosted payment page.

---

# 🔍 Refund Query

The project also includes a refund-status query endpoint.

### Request

```http
GET /api/payment/refund-query?refund_ref_id=YOUR_REFUND_REFERENCE_ID
```

Example:

```text
GET /api/payment/refund-query?refund_ref_id=REF123456
```

### Response

```json
{
  "success": true,
  "data": {}
}
```

The backend passes the `refund_ref_id` to SSLCommerz's refund query functionality.

---

# 🖥️ Frontend Pages

The frontend currently contains these pages:

| Page              | Purpose                   |
| ----------------- | ------------------------- |
| `Home.tsx`        | Customer checkout form    |
| `Success.tsx`     | Successful payment result |
| `Failed.tsx`      | Failed payment result     |
| `Refund.tsx`      | Refund interface          |
| `RefundQuery.tsx` | Refund status query       |

These pages are present under `client/src/pages`.

---

# 🛒 Checkout Page

The checkout page provides fields for:

```text
Full Name
Email
Phone
Address
Amount (BDT)
```

When the customer submits the form, the client sends the data to the backend and redirects the customer to the returned SSLCommerz Gateway URL.

Example:

```text
┌─────────────────────────────┐
│       Secure Checkout       │
│     Powered by SSLCommerz   │
│                             │
│  Full Name                  │
│  ┌───────────────────────┐  │
│  │ John Doe              │  │
│  └───────────────────────┘  │
│                             │
│  Email        Phone         │
│  ┌────────┐   ┌──────────┐  │
│  │ email  │   │ phone    │  │
│  └────────┘   └──────────┘  │
│                             │
│  Address                    │
│  ┌───────────────────────┐  │
│  │ Dhaka, Bangladesh     │  │
│  └───────────────────────┘  │
│                             │
│  Amount (BDT)               │
│  ┌───────────────────────┐  │
│  │ ৳ 500                 │  │
│  └───────────────────────┘  │
│                             │
│      [ Pay ৳500 → ]         │
└─────────────────────────────┘
```

---

# 🧪 Testing

For development, the project is configured to use SSLCommerz Sandbox mode.

The backend currently creates:

```ts
const sslcz = new SSLCommerzPayment(
  storeId!,
  storePass!,
  false
);
```

The final `false` indicates that the integration is not using live mode.

Use the test credentials and payment methods provided by your SSLCommerz Sandbox merchant account.

> ⚠️ Do not use production payment credentials for local testing.

---

# 🧑‍💻 Development Commands

## Client

### Start development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

The available client scripts are defined in `client/package.json`.

---

## Server

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

The backend uses TypeScript compilation and Nodemon during development.

---

# 🔐 Security Considerations

This project keeps sensitive SSLCommerz credentials on the backend.

### Store credentials server-side

Never put:

```text
STORE_ID
STORE_PASS
```

inside React frontend code.

### Validate payments server-side

The backend does not simply trust the frontend after payment.

For a successful callback, it receives the `val_id` and calls SSLCommerz validation before changing the transaction status to `SUCCESS`.

### Generate transaction IDs server-side

Transaction IDs are generated by the backend:

```text
INV-XXXXXXXXXXXX
```

using UUID rather than accepting a transaction ID from the client.

### Store transaction state

The transaction is stored as:

```text
PENDING
```

before payment processing begins, allowing the application to track the payment lifecycle.

---

# 🌐 CORS Configuration

The backend currently allows:

```text
http://localhost:5173
```

with:

```ts
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
```

For production, update this to your real frontend domain instead of allowing the development URL.

---

# 🚀 Production Checklist

Before deploying this project to production:

* [ ] Replace Sandbox SSLCommerz credentials
* [ ] Enable SSLCommerz live mode
* [ ] Use HTTPS
* [ ] Configure production callback URLs
* [ ] Configure production frontend URL
* [ ] Restrict CORS to the production domain
* [ ] Store secrets securely
* [ ] Never commit `.env`
* [ ] Configure MongoDB production database
* [ ] Add proper request validation
* [ ] Add authentication/authorization where required
* [ ] Add transaction idempotency protection
* [ ] Add logging and monitoring
* [ ] Test success, failure, cancellation, and refund flows
* [ ] Verify SSLCommerz payment status server-side
* [ ] Configure a publicly accessible callback/IPN endpoint where required

---

# ⚠️ Localhost Callback Limitation

Payment gateways need to be able to reach your callback endpoints.

During local development, callback behavior can depend on how your SSLCommerz sandbox is configured.

For production, your callback URLs should be publicly accessible HTTPS endpoints.

Example:

```env
SUCCESS_URL=https://api.example.com/api/payment/success
FAIL_URL=https://api.example.com/api/payment/fail
CANCEL_URL=https://api.example.com/api/payment/cancel
```

Do not use:

```env
SUCCESS_URL=http://localhost:5000/api/payment/success
```

in production.

---

# 🔧 Customizing the Payment

The frontend currently allows the customer to enter the amount:

```tsx
<input
  id="amount"
  name="amount"
  type="number"
  required
/>
```

The value is then sent to the backend:

```ts
axios.post(
  'http://localhost:5000/api/payment/initiate',
  formData
);
```

The backend receives:

```ts
const {
  amount,
  name,
  email,
  phone,
  address
} = req.body;
```

and passes the amount to SSLCommerz as:

```ts
total_amount: amount
```

---

# 📁 Important Backend Files

## `paymentController.ts`

Contains the main payment business logic:

```text
initiatePayment
paymentSuccess
paymentFailed
paymentCancel
refundQueryController
```

---

## `payment.route.ts`

Defines the payment API:

```ts
router.post('/initiate', initiatePayment);
router.post('/success', paymentSuccess);
router.post('/fail', paymentFailed);
router.post('/cancel', paymentCancel);
router.get('/refund-query', refundQueryController);
```

---

## `model.ts`

Defines the MongoDB transaction schema:

```ts
{
  tran_id,
  val_id,
  amount,
  currency,
  status,
  cus_name,
  cus_email,
  cus_phone
}
```

with transaction timestamps.

---

## `db.ts`

Handles MongoDB Atlas connection:

```ts
mongoose.connect(MONGODB_URI);
```

The connection string comes from:

```env
DB=your_mongodb_connection_string
```

---

## `functions.ts`

Generates unique invoice IDs:

```ts
INV-XXXXXXXXXXXX
```

using UUID v4.

---

# 📦 Backend Dependencies

Main backend packages:

```text
express
mongoose
sslcommerz-lts
axios
cors
dotenv
body-parser
uuid
node-global-storage
```

Development packages include:

```text
typescript
nodemon
ts-node
@types/node
@types/express
@types/cors
```

---

# 📦 Frontend Dependencies

Main frontend packages:

```text
react
react-dom
react-router-dom
axios
react-hot-toast
tailwindcss
@tailwindcss/vite
```

Development tooling includes:

```text
vite
typescript
eslint
@vitejs/plugin-react
typescript-eslint
```

---

# 🧭 Quick Reference

| Service    | Directory   | Command       | URL                     |
| ---------- | ----------- | ------------- | ----------------------- |
| Frontend   | `client`    | `npm run dev` | `http://localhost:5173` |
| Backend    | `server`    | `npm run dev` | `http://localhost:5000` |
| MongoDB    | Cloud/Local | —             | MongoDB connection      |
| SSLCommerz | Sandbox     | —             | SSLCommerz Gateway      |

---

# 🧪 Example Payment Request

```bash
curl -X POST http://localhost:5000/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "01700000000",
    "address": "Dhaka, Bangladesh"
  }'
```

Expected response:

```json
{
  "url": "https://sandbox.sslcommerz.com/..."
}
```

Open the returned URL to continue the sandbox payment.

---

# 🩺 Health Check

The backend provides a simple root endpoint:

```http
GET /
```

Response:

```json
"Welcome to our payment gateway"
```

This can be useful as a basic server health check.

---

# 🛠️ Troubleshooting

## Payment URL is not returned

Check:

```text
STORE_ID
STORE_PASS
CURRENCY
```

and make sure your SSLCommerz sandbox account is configured correctly.

Also check the backend console for:

```text
Payment initiation error
```

---

## MongoDB connection failed

Verify:

```env
DB=mongodb+srv://...
```

Make sure:

* MongoDB cluster is running
* Database user exists
* Password is correct
* Your IP address is allowed by MongoDB Atlas
* Connection string is valid

---

## CORS error

Make sure the frontend is running at:

```text
http://localhost:5173
```

The backend currently allows that origin.

If your frontend runs on another port, update the CORS configuration.

---

## Payment succeeds but frontend does not redirect

Check:

```env
SUCCESS_URL=http://localhost:5000/api/payment/success
```

and verify that the frontend success route matches the redirect implemented by the backend.

The current success handler redirects to:

```text
http://localhost:5173/success/{tran_id}
```

while failed and cancelled payments redirect to:

```text
http://localhost:5173/failed
```

and:

```text
http://localhost:5173/cancel
```

---

# 📌 Current Implementation Notes

The current repository is a solid demonstration/integration project, but production deployment should include additional safeguards such as:

* Strong request validation
* Rate limiting
* Idempotency handling
* Better callback verification
* Secure production CORS configuration
* HTTPS-only callback URLs
* Centralized error handling
* Structured logging
* Authentication for refund-related operations
* Stronger refund authorization
* Production secret management

These are recommended before using the project for a real commercial payment workflow.

---

# 📚 Useful Resources

* [SSLCommerz Official Website](https://sslcommerz.com/)
* [SSLCommerz Developer Portal](https://developer.sslcommerz.com/)
* [SSLCommerz GitHub Organization](https://github.com/sslcommerz)
* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vite.dev/)
* [Express Documentation](https://expressjs.com/)
* [MongoDB Documentation](https://www.mongodb.com/docs/)
* [Mongoose Documentation](https://mongoosejs.com/)
* [Tailwind CSS Documentation](https://tailwindcss.com/)

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git clone https://github.com/sizanm852-sketch/ssl-payment.git
```

### 2. Create a branch

```bash
git checkout -b feature/my-feature
```

### 3. Make your changes

```bash
git add .
git commit -m "feat: add my feature"
```

### 4. Push the branch

```bash
git push origin feature/my-feature
```

### 5. Open a Pull Request

Please keep payment-related changes well tested and avoid committing credentials or sensitive information.

---

# 📄 License

This project currently uses the license configuration defined in the repository's backend package metadata.

If you intend to distribute this project publicly, consider adding a dedicated `LICENSE` file to the root of the repository.

---

---

# ⭐ Support

If this project helped you understand SSLCommerz payment integration, consider giving the repository a ⭐ on GitHub.

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/sizanm852-sketch/ssl-payment.git

cd ssl-payment

# Backend
cd server
npm install
npm run dev

# New terminal
cd ../client
npm install
npm run dev
```

Then visit:

```text
http://localhost:5173
```

Make sure the backend `.env` is configured before attempting a payment.

---

## 🎯 Summary

This project provides a complete starting point for integrating **SSLCommerz Hosted Checkout** into a TypeScript-based full-stack application.

The core flow is:

```text
React Checkout
      ↓
Express API
      ↓
Create PENDING Transaction
      ↓
SSLCommerz Gateway
      ↓
Customer Payment
      ↓
SSLCommerz Callback
      ↓
Server-side Validation
      ↓
MongoDB Status Update
      ↓
Success / Failed / Cancelled Page
```

It is designed to be easy to understand, extend, and adapt to an e-commerce application or other systems that require online payments in Bangladesh.
