# ContractHub

A modern contract management dashboard built with React and Vite. This app allows users to view, filter, and manage contracts, with features like authentication, contract detail views, and document uploads.

---

## 🚀 Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd <project-directory>
 2. npm install
 3. Start the development server
   npm run dev
 4. Build for production
 npm run build
 5. Preview the production build
 npm run preview
 Tech Stack Choices
React 19: UI library for building interactive user interfaces.
Vite: Fast development server and build tool for modern web projects.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
ESLint: Linting for code quality and consistency.
PostCSS & Autoprefixer: For CSS processing and browser compatibility.
Local JSON files: Used as a mock backend for contracts and contract details.
📋 Assumptions Made
Authentication: Uses a mock login system. Any username is accepted, but the password must be test123. A mock JWT is stored in localStorage for session persistence.
Data Source: All contract data is loaded from static JSON files in the public directory. There is no real backend or database.
File Uploads: Uploads are simulated in the UI only; files are not actually sent to a server or persisted.
User Roles: All users are treated as administrators with full access to all features.
Responsiveness: The UI is designed to be responsive and work on modern browsers.
No Routing: The app uses conditional rendering for navigation instead of React Router.
Demo Content: Some sections (like Insights, Reports, and Settings) are placeholders for future features.



