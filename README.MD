<p align="center">
  <img src="src/docs/Gemini_Generated_Image_z8bb3az8bb3az8bb.png" alt="Educational Platform Architecture" width="850">
</p>

# 🎓 Educational Management Platform - Frontend

A sophisticated, type-safe administrative dashboard built using **React**, **TypeScript**, and the **Refine** framework. This frontend application acts as the control center for the educational platform, offering dynamic CRUD operations, role-based access control, and highly optimized network request handling.

Designed to connect seamlessly with a secure Node.js/Express backend powered by **Better Auth** using cookie-based sessions.

---

## 🚀 Key Features

* **Refine CRUD Core:** Fully automated and highly customizable interfaces for managing **Subjects**, **Classes**, **Users**, **Roles**, and **Schedules**.
* **Dynamic Role-Based Access Control (RBAC):** Integrated using Refine's `accessControlProvider`. Automatically hides/disables UI components (like action buttons, restricted data tables) and strictly guards client-side routing based on authenticated user roles (`Guest`, `Student`, `Teacher`, `Admin`).
* **Optimized Live Search (Debounce + Cleanup):** Implements smart debouncing (500ms delay) on search input fields to minimize API stress. Includes explicit hook cleanups upon component unmount to completely eliminate React state update memory leaks.
* **Secure Scoped Cookie Bridge:** Leverages a localized native `fetch` interceptor that automatically injects `credentials: "include"` into every outbound request, ensuring seamless session validation via HTTP-only cookies.
* **Type Safety:** 100% strict TypeScript coverage for all data models, API payloads (`ListResponse`, `CreateResponse`), and data provider configurations.

## 🛠️ Tech Stack

* **Core:** React 18+, TypeScript
* **Framework:** [Refine Framework](https://refine.dev/) (Enterprise-grade internal tool framework)
* **Build Tool:** Vite

## 📁 Project Structure

```text
src/
├── constants/       # Global constants (e.g., BACKEND_BASE_URL)
├── providers/       # Custom Refine Providers (dataProvider, accessControlProvider)
├── hooks/           # Custom React hooks (useDebounce, useSubjectsList, etc.)
├── components/      # Reusable UI components (Sidebar, Layout, CanAccess wrappers)
├── pages/           # Resource pages (Subjects, Classes, Dashboard, Users)
├── types/           # Strict TypeScript interfaces and type definitions
├── App.tsx          # Main application configuration & Refine initialization
└── main.tsx         # Application entry point
