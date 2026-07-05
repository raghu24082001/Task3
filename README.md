# LeadFlow ERP — Lead Management Module

A production-ready full-stack ERP Lead Management Module built with React 18 + Tailwind CSS + Node.js + Express + MongoDB.

---

## Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS  |
| Routing   | React Router DOM              |
| HTTP      | Axios                         |
| Backend   | Node.js, Express.js           |
| Database  | MongoDB (Mongoose)            |

---

## Project Structure

```
Task3/
├── Frontend/               ← React app (Vite)
│   └── src/
│       ├── api/            ← Axios instance + API functions
│       ├── components/     ← All reusable UI components
│       │   ├── common/     ← Button, Input, Select, Modal, etc.
│       │   ├── layout/     ← Navbar, Layout
│       │   ├── leads/      ← LeadTable, LeadDetailModal, EditLeadModal
│       │   ├── filters/    ← SearchBar, FilterPanel, DateRangePicker
│       │   ├── notes/      ← NoteCard, AddNoteForm
│       │   └── pagination/ ← Pagination
│       ├── pages/          ← LeadsPage
│       ├── hooks/          ← useLeads, useDebounce
│       ├── constants/      ← LEAD_STATUSES, EMPLOYEES, colors
│       ├── utils/          ← formatDate, validators
│       └── styles/         ← index.css (Tailwind + Google Fonts)
│
└── server/                 ← Express backend
    ├── controller/
    │   └── LeadControl.js  ← Lead + Notes controller
    ├── modal/
    │   └── LeadModal.js    ← Mongoose schema
    ├── router/
    │   └── LeadRouter.js   ← REST routes
    ├── data/
    │   └── seedLeads.js    ← Seed 30 sample leads
    └── index.js            ← Entry point (all routes registered here)
```

---

## Installation & Running

### 1. Backend

```bash
cd server
npm install
npm start
```

> Server runs on **http://localhost:5000**

### 2. Seed Sample Data (run once)

```bash
cd server
node data/seedLeads.js
```

This inserts 30 sample leads into your MongoDB database.

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

> App runs on **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint                              | Description               |
|--------|---------------------------------------|---------------------------|
| GET    | `/api/leads`                          | List leads (search/filter/paginate) |
| GET    | `/api/leads/:id`                      | Get lead details          |
| PUT    | `/api/leads/:id`                      | Update lead               |
| POST   | `/api/leads/:id/notes`                | Add note                  |
| PUT    | `/api/leads/:id/notes/:noteId`        | Edit note                 |
| DELETE | `/api/leads/:id/notes/:noteId`        | Delete note               |

### Query Parameters for GET `/api/leads`

| Param       | Description                        |
|-------------|------------------------------------|
| `search`    | Search by name, mobile, or email   |
| `status`    | Filter by lead status              |
| `employee`  | Filter by assigned employee        |
| `startDate` | Filter from date (ISO format)      |
| `endDate`   | Filter to date (ISO format)        |
| `page`      | Page number (default: 1)           |
| `limit`     | Results per page (default: 10)     |

---

## Features

- ✅ Lead list with search (name, mobile, email)
- ✅ Filters: Status, Assigned Employee, Date Range
- ✅ Pagination: 10 / 25 / 50 rows with page numbers
- ✅ View Lead modal with all details
- ✅ Edit Lead with inline validation
- ✅ Notes: Add / Edit / Delete per lead
- ✅ Loading, Error, and Empty states
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern ERP dashboard design

---

## Environment Variables (`server/.env`)

```
PORT=5000
mongo_URI=<your-mongodb-connection-string>
JWT_SECURE=<your-jwt-secret>
```
