# 🧵 Tailor Management System

<p align="center">
  <strong>A premium, modern, and highly interactive business management dashboard tailored for tailor shops, customer portfolios, and billing operations.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-44CC11?style=for-the-badge" alt="License" />
</p>

---

## 📝 About

The **Tailor Management System** is a production-grade admin dashboard built to streamline administrative workflows for custom tailoring businesses and multi-shop enterprises. The platform serves as a central control hub for admins and managers, facilitating seamless management of customer relations, invoice tracking, tailor scheduling, and operational metrics.

Built with a focus on high performance, clean aesthetics, and fluid interaction, the frontend is fully implemented with mock datasets and stateful interactive components. A fully configured API layer using Axios is ready to be linked with back-end endpoints.

> 🛠️ **Development Role:** Full Stack Developer (Frontend is fully developed and operational; backend API integration is planned and scaffolded).

---

## ✨ Key Features

This client application provides a complete dashboard interface with state-of-the-art interactive modules:

- 📱 **Mobile-First Responsive Design:** Optimized for smartphones, tablets, and desktop displays with smooth animations and dynamic sidebars.
- 🎨 **Modern React & Tailwind UI:** A clean visual aesthetic featuring card elements, glassmorphism overlays, and curated warm color palettes designed for business owners.
- 📊 **Business Overview Dashboard:** High-level metrics showing active/inactive tailors, total registered shops, billing invoices, and general system health indicators.
- 👥 **Customer Management:** Full customer listing with global search, filtering by city or status, detailed sidebars, and functional editing/deletion modals.
- ✂️ **Tailor & Shop Directories:** Quick access directories to onboard, edit, view detail cards, and manage individual tailor profiles and locations.
- 🧾 **Invoice & Revenue Tracking:** Real-time billing trackers demonstrating total revenue, paid transactions, outstanding dues, and payment statuses (Paid, Partial, Due).
- 📈 **Measurement Tracking Visualizations:** Interactive custom charts (`MeasurementsChart.tsx`) displaying onboarding stats and monthly metrics.
- 🔍 **Global Search & Multi-Filters:** Custom dropdowns and searchable inputs allowing granular filtration across cities, status flags, and custom dates.
- ⚡ **Optimized Performance:** Fast rendering built on Vite, React 19, and Framer Motion for micro-interactions and transitions.

---

## 🛠️ Tech Stack

- **Core Framework:** [React.js](https://react.dev/) (v19) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Charts & Visualizations:** [Recharts](https://recharts.org/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **API Communication:** [Axios](https://axios-http.com/) *(Instance configured in `src/api/axios.js` for local/production servers)*

---

## 📂 Folder Structure

The codebase is organized in a modular structure to enforce clear separation of concerns, scalability, and ease of maintenance:

```text
tailor-frontend/
├── public/                  # Static assets and graphics
├── src/
│   ├── api/                 # API connection module & Axios setup (scaffolded)
│   │   ├── adminApi.js
│   │   ├── authApi.js
│   │   ├── axios.js         # Axios client instance configuration
│   │   ├── customerApi.js
│   │   ├── dashboardApi.js
│   │   └── measurementApi.js
│   ├── assets/              # App images, graphics, and dashboard cards
│   ├── components/          # Reusable UI widgets, sidebars, and modals
│   │   ├── AdminDetailSidebar.tsx
│   │   ├── CustomerDetailSidebar.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   ├── EditCustomerModal.tsx
│   │   ├── EditTailorModal.tsx
│   │   ├── MeasurementsChart.tsx
│   │   ├── Sidebar.tsx
│   │   ├── chart.tsx
│   │   └── ...
│   ├── config/              # Application configs (scaffolded)
│   ├── context/             # Global React Context providers (scaffolded)
│   ├── hooks/               # Custom React hooks (scaffolded)
│   ├── layouts/             # Shared page layouts
│   │   └── AdminLayout.tsx  # Main administration sidebar layout
│   ├── lib/                 # Third-party utilities (scaffolded)
│   ├── pages/               # Page view components
│   │   ├── AddAdmin.tsx
│   │   ├── AddTailor.tsx
│   │   ├── AllAdmins.tsx
│   │   ├── AllTailors.tsx
│   │   ├── Customers.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Invoices.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   └── Settings.tsx
│   ├── routes/              # App routing configuration and route guards
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── styles/              # Global styles stylesheets (scaffolded)
│   ├── types/               # TypeScript type definitions and interfaces
│   │   └── index.ts
│   ├── utils/               # Formatting functions & constants
│   │   └── cities.js        # City helper listings
│   ├── App.tsx              # Main container with Toaster and Loaders
│   ├── index.css            # Tailwind directives and CSS injections
│   └── main.tsx             # React DOM application mount entry point
├── package.json             # NPM dependencies & running scripts
├── tailwind.config.js       # Tailwind CSS configurations
├── tsconfig.json            # TypeScript rules
└── vite.config.js           # Vite server configurations
```

---

## 🚀 Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed before running the steps below.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/tailor-management-system.git
cd tailor-management-system
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 📸 Screenshots

Here are previews demonstrating key screens and components of the system:

### Admin Dashboard Overview
*Interactive statistics panels, monthly measurement charts, system status indicators, and recent tailor shop registrations.*
> **[Placeholder for Dashboard Screenshot]**

### Customer Portfolio Management
*Searchable table interface with detailed slide-over sidebars for customer profiles and editing modal dialogues.*
> **[Placeholder for Customer Directory Screenshot]**

### Invoice & Revenue Center
*Comprehensive listing of transactions, payment statuses (Paid/Due/Partial), financial stats, and invoice details.*
> **[Placeholder for Invoices Screenshot]**

---

## 🔮 Future Improvements

Since the frontend client is fully developed, planned next phases of development focus on server-side integration and automated billing tools:

- 🔌 **Full Backend Integration:** Connecting the API layer (`src/api`) to active Node.js/Express or Python services.
- 🔐 **Robust Authentication:** Replacing local state guards with JWT-based authentication, token refreshing, and OAuth options.
- 🗄️ **Persistent Database:** Integration with PostgreSQL or MongoDB to persist customers, tailors, and invoice records.
- 📑 **PDF Export & Automated Receipts:** Add functional export buttons to convert invoices to formatted PDFs ready for client printing.
- 💬 **SMS & Email Notifications:** Automated alerts sent to clients upon measurement capture or order status updates.
- 🛡️ **Role-Based Access Control (RBAC):** Restrict dashboard operations depending on user level (Super Admin vs. Individual Tailor Shop).
- 📊 **Enhanced Business Analytics:** Historical sales charts, tailor performance scores, and exportable financial reports.

---

## 👨‍💻 Author

**Your Name**  
*Full Stack Developer*

* [GitHub](https://github.com/your-username)
* [LinkedIn](https://linkedin.com/in/your-username)
* [Portfolio Website](https://your-portfolio.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
