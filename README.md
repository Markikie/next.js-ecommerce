# Next.js E-commerce Project
A modern e-commerce application built with Next.js, featuring a responsive design and robust user interface.

## Features
- 🛍️ Product browsing and shopping cart functionality
- 👤 User authentication (login/signup)
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind CSS
- 📊 Dashboard interface
## Tech Stack
- Framework : Next.js 15.3.4
- UI Components :
  - Radix UI
  - Tailwind CSS
  - Lucide React Icons
  - Tabler Icons
- State Management : React
- Database : MySQL with Drizzle ORM
- Charts : Recharts
## Getting Started
### Prerequisites
- Node.js
- MySQL
### Installation
1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Set up environment variables:
   Create a .env file in the root directory and add necessary environment variables.
4. Start the development server:
```
npm run dev
```
The application will be available at http://localhost:3000

### Build
To create a production build:

```
npm run build
```
To start the production server:

```
npm start
```
## Project Structure
```
src/
├── app/                 # App router 
pages
├── components/          # Reusable 
components
│   ├── app/            # App-specific 
components
│   └── ui/             # UI components
├── db/                 # Database 
configuration
├── hooks/              # Custom React 
hooks
└── lib/                # Utility 
functions
```
## Development
- Uses Next.js App Router
- Implements modern React patterns
- Follows TypeScript best practices
- Includes ESLint configuration for code quality

## Docker-Compose
Pull Image from Docker Hub
- MySQL 8.0

## License
This project is private and confidential.