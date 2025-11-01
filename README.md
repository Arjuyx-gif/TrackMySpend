# TrackMySpend — Personal Finance Manager

A comprehensive personal finance management application built with React, TypeScript, Node.js, and MongoDB.

## 🚀 Features

- Transaction Management: Track income and expenses with categories
- Budget Planning: Set and monitor monthly budgets
- Smart Insights: AI-powered financial insights and recommendations
- Calendar View: Visualize financial activities over time
- Reminders: Set up bill reminders and recurring payments
- Data Export: Export your financial data in various formats
- Responsive Design: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite for dev/build
- Tailwind CSS for styling
- shadcn/ui components
- React Router
- date-fns for date utilities

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (demo secret in code — replace for production)

---

## ▶️ Quick Start

Run frontend and backend in separate terminals.
### Before you start (clone & GitHub)

1. Clone the repository
```bash
# HTTPS
git clone https://github.com/<your-username>/TrackMySpend.git
# or SSH
git clone git@github.com:<your-username>/TrackMySpend.git
cd TrackMySpend
```

2. If this is a new local repo and you want to push to GitHub
```bash
# create repo on GitHub, then:
git remote add origin https://github.com/<your-username>/TrackMySpend.git
git branch -M main
git push -u origin main
```

3. Create a feature branch for changes
```bash
git checkout -b feature/your-feature
```

4. Install dependencies (root = frontend)
```powershell
npm install
```
Then in a separate terminal install backend deps:
```powershell
cd backend
npm install
```

5. Create backend environment file
```text
# backend/.env
MONGO_URI="your-mongodb-connection-string"
PORT=5000
JWT_SECRET="replace-with-a-secure-secret"
```

6. Commit & push your changes
```bash
git add .
git commit -m "chore: project setup"
git push -u origin feature/your-feature
```

Notes:
- Open pull requests on GitHub from your feature branch to main.
- Use protected branches, CI, and secrets in GitHub repository settings before deploying.
- After cloning, follow the Quick Start steps below to run frontend and backend in separate terminals.

### 1) Frontend (Vite)

```powershell
cd C:\Users\krish\TrackMySpend
npm install
npm run dev
```

- Vite will print a local URL (typically http://localhost:5173). Open it in your browser.

### 2) Backend (Express API)

```powershell
cd C:\Users\krish\TrackMySpend\backend
npm install

# Create .env file (required)
# Example content:
# MONGO_URI="your-mongodb-connection-string"
# PORT=5000  # optional, defaults to 5000

npm run dev   # uses nodemon
# or
npm start     # node server.js
```

- API runs at http://localhost:5000 by default.
- Routes are mounted under `/api`: `/api/transactions`, `/api/budgets`, `/api/reminders`, `/api/auth`, `/api/reset`.

---

## 📦 Scripts

Frontend (from repo root):
- `npm run dev` — start Vite dev server
- `npm run build` — type-check + Vite production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run eslint

Backend (from `backend/`):
- `npm run dev` — start API with nodemon (auto reload)
- `npm start` — start API with node

---

## 🔧 Environment Variables (backend/.env)

Create `backend/.env` with at least:

```
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>?retryWrites=true&w=majority"
PORT=5000
```

Notes:
- `backend/routes/auth.js` currently uses a hardcoded demo JWT secret (`supersecretkey`). For any real deployment, switch to an environment-based secret and hash passwords (e.g., bcrypt).

---

## 🏗️ Project Structure (overview)

```
TrackMySpend/
	index.html
	package.json                # frontend scripts (Vite, build, lint)
	vite.config.ts
	tailwind.config.js
	src/                        # React + TS app
		main.tsx
		App.tsx
		components/ ...           # UI, dashboard, forms, etc.
		pages/ ...                # Dashboard, Transactions, Login, etc.
		context/FinanceContext.tsx
	backend/
		package.json              # backend scripts (nodemon, start)
		server.js                 # Express app (PORT or 5000)
		routes/                   # auth, transactions, budgets, reminders, reset
		models/                   # User, Transaction, Budget, Reminder
```

---

## 🧪 Build & Preview (frontend)

```powershell
cd C:\Users\krish\TrackMySpend
npm run build
npm run preview
```

---

## ❗ Troubleshooting

- `'vite' is not recognized` when running `npm run dev` (frontend):
	- Make sure dependencies are installed: `npm install` in the repository root.
	- Running through `npm run dev` automatically adds local binaries to PATH.

- Cannot connect to MongoDB:
	- Verify `MONGO_URI` in `backend/.env`.
	- Check firewall/VPN and that your IP is allowlisted in MongoDB Atlas.

- Port already in use:
	- Change backend `PORT` in `backend/.env`.
	- For Vite, you can start on a different port with `npm run dev -- --port 5174`.

---

## 📌 Notes

- This project is for educational/demo purposes. If deploying, add secure JWT handling and password hashing, and configure CORS and production builds appropriately.



