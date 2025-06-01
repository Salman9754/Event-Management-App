
# 📅 Event Management System  
**Live Demo**: [View on Vercel](https://my-eventify.vercel.app/)

## 📌 Overview  
A full-stack web application that enables users to create, manage, and participate in events. It includes user authentication, role-based access, image uploads, an approval workflow, and dynamic dashboards for customers and admins. Built using **React**, **Supabase**, **Tailwind CSS**, and **shadcn/ui**.

---

## 🚀 Tech Stack  
- **Frontend**: React.js  
- **Backend**: Supabase (Auth, Database, Storage)  
- **Styling**: Tailwind CSS  
- **UI Library**: shadcn/ui  
- **Deployment**: Vercel (Frontend), Supabase (Backend)

---

## 👤 User Roles

### 🔐 Admin  
- View all events (Pending, Approved, Rejected)  
- Approve or reject event submissions  
- View participants for approved events  
- View customer list and individual customer details  
- Edit/delete any event  
- Update profile

### 👥 Customer  
- Create and submit events for approval  
- Edit or delete their own **pending** events  
- Add participants to **approved** events  
- View their events and associated participants

---

## 🧩 Core Features

### ✅ Authentication & Authorization  
- User Sign Up / Log In using Supabase Auth  
- Role-based access using Supabase RLS or metadata  

### 📆 Event Management  
- Fields: Title, Description, Date/Time, Location, Category  
- Upload event image to Supabase Storage  
- Event statuses: Pending, Approved, Rejected  
- Customers can manage only their own events  
- Admins can manage all events

### 🗳️ Approval Workflow  
- All new events start in a Pending state  
- Admins can approve or reject events  
- Status updates are reflected in user dashboards

### 🧑‍🤝‍🧑 Participant Management  
- Add participants only to approved events  
- Prevent duplicate participant entries  
- Responsive participant tables with email and name  
- View participant count and list per event

---

## 📊 Dashboards

### Customer Dashboard  
- “My Events” with status indicators  
- “My Approved Events” with participant management  

### Admin Dashboard  
- “Pending Events” for review and approval  
- “All Events” with full access  
- “Customer List” with detail view per customer

---

## 🧱 Database Schema (Supabase)

### `events` Table  
- `id`, `title`, `description`, `date_time`, `location`, `category`, `image_url`, `status`, `created_by`, `created_at`, `updated_at`

### `participants` Table  
- `id`, `event_id`, `participant_name`, `participant_email`, `added_at`, `added_by`

### `users` Table (Supabase Auth)  
- Extended with a custom `role` field (`admin` or `customer`)

---

## 📦 Deployment  
- **Frontend**: [Vercel](https://my-eventify.vercel.app/)  
- **Backend**: Supabase (Auth, Database, and Storage)

---

## 📘 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/salman9754/event-management-system.git
   cd event-management-system

## 📦 Install Dependencies

```bash
npm install
```

## ⚙️ Setup Supabase

1. Create a Supabase project.
2. Create the following tables:
   - `events`
   - `participants`
   - `users`
3. Enable Supabase **Auth** and **Storage**.
4. Configure **Row-Level Security (RLS)** and policies for secure access.

## 🔐 Add Environment Variables

In your `.env.local` file, add:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚀 Run the App

```bash
npm run dev
```

## 📌 Future Improvements

- Google Sign-In / Phone Authentication
- Notifications for event status updates
- Pagination and search filters
- Calendar integration
- User profile photo support

## 📄 License

This project is open-source and available under the **MIT License**.