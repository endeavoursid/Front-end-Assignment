# Frontend Assignment – React Components

This project implements **two reusable UI components** – `InputField` and `DataTable` – using **React, TypeScript, TailwindCSS, and Storybook**.  
The components are scalable, accessible, and theme-aware (light/dark mode).

---

## ✨ Components

### 🔹 InputField
A reusable text input with multiple states, variants, and sizes.

**Features**
- Label, placeholder, helper text, error message  
- States: default, disabled, invalid, loading  
- Variants: filled, outlined, ghost  
- Sizes: small, medium, large  
- Optional: clear button & password toggle  
- 🌙 Dark mode supported  

**Accessibility**
- Uses `aria-invalid` and `aria-describedby`  
- Fully keyboard & screen reader friendly  

---

### 🔹 DataTable
A flexible, accessible table for displaying structured data.

**Features**
- Configurable columns  
- Row selection (single/multiple)  
- Sorting by columns  
- Loading & empty states  
- 🌙 Dark mode supported  

**Accessibility**
- Semantic roles: `role="table"`, `role="row"`, `role="cell"`  
- Checkboxes/radios are labeled for screen readers  

---

## 🛠️ Setup

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd my-frontend-assignment
npm install

**Run the Vite development server:**

npm run dev

**Run Storybook for component documentation:**

npm run storybook

## 📘 Storybook Documentation

The component documentation is published live on Chromatic:  
👉 [View Storybook](https://www.chromatic.com/builds?appId=68a17ff07245cc53b64cca30)

```
