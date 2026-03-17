🗳️ Digital Vote UI
A modern, high-performance web interface for a digital voting system, built with Angular 21. This frontend communicates with a .NET backend to manage candidates and process real-time voting.

🚀 Key Features
Scalable Architecture: Organized into modular components (Navbar, Candidate List) and dedicated services for clean concern separation.

Secure Environment Management: Implements Angular's native environment configuration to handle API endpoints securely, ensuring sensitive infrastructure data is kept out of version control.

Modern Build Tooling: Optimized using the latest Angular build system (esbuild) and Vitest for ultra-fast unit testing.

Reactive Data Flow: Uses RxJS for efficient handling of asynchronous API calls and state management.

🛠️ Tech Stack
Framework: Angular 21 (Standalone Components)

Language: TypeScript

Testing: Vitest

Styling: SCSS

HTTP Client: Angular Common/HTTP

🔧 Installation & Setup
Clone the repository:

Bash
git clone [your-repo-link]
Install dependencies:

Bash
npm install
Important: Create a local environment file at src/environments/environment.ts with your backend URL:

TypeScript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:your-port/api'
};
Run the development server:

Bash
ng serve