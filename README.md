# Odoo QuickDesk Helpdesk System

## Live Demo
[https://odoo-quick-desk-mauve.vercel.app/](https://odoo-quick-desk-mauve.vercel.app/)

## Project Overview
Odoo QuickDesk is a full-stack helpdesk/ticketing system built with Node.js/Express (backend), React (frontend), MongoDB, and Tailwind CSS. It supports role-based dashboards for Admin, Agent, and User, ticket management, and email notifications via EmailJS.

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

### 2. Clone the Repository
```bash
git clone https://github.com/ritiku2004/Odoo_QuickDesk.git
cd Odoo_QuickDesk
```

### 3. Backend Setup
```bash
cd Server
npm install
```
- Create a `.env` file in the `Server` folder. Example:
  ```env
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/support-ticket-app
  JWT_SECRET=your-very-secret-key-that-is-long-and-random
  VITE_EMAILJS_SERVICE_ID=your_service_id
  VITE_EMAILJS_TEMPLATE_ID=your_template_id
  VITE_EMAILJS_USER_ID=your_user_id
  ```
- Start MongoDB locally or use Atlas.
- Start the backend:
  ```bash
  npm start
  ```

### 4. Frontend Setup
```bash
cd ../Client
npm install
```
- Start the frontend:
  ```bash
  npm run dev
  ```
- The app will run at `http://localhost:5173`

---

## Core Functionality
- **Role-based Dashboards:**
  - Admin: Manage users, categories, view all tickets.
  - Agent: View/assign tickets, update status.
  - User: Create/view own tickets.
- **Authentication:** JWT-based login/signup.
- **Ticket Management:** Create, assign, update, close tickets.
- **Email Notifications:** Sent via EmailJS on ticket creation/status change.
- **Protected Routes:** Only authorized roles can access their dashboard.

---

## Demo Accounts
Use these accounts to log in and test each role:

| Role   | Email         | Password |
|--------|--------------|----------|
| Admin  | admin@g.com  | 123      |
| Agent  | agent@g.com  | 123      |
| User   | user@g.com   | 123      |

---

## Notes
- If demo accounts do not exist, sign up with the above emails and password `123`, then set their roles in the database or via the admin dashboard.
- Make sure EmailJS environment variables are set in `.env` and configured in your EmailJS dashboard.
- For any issues, check backend logs and ensure MongoDB is running.

---


