# College Booking App

Discover, compare, and apply to colleges with ease. Search for colleges, view details, add reviews, and submit admission applications online.

## Features

- **College Search**: Search and filter colleges by name
- **College Details**: View detailed information including admission dates, events, research works, and sports facilities
- **Admission System**: Submit online applications to multiple colleges
- **Reviews & Ratings**: Add and read reviews for colleges
- **User Authentication**: Sign up with email/password or Google
- **Profile Management**: Edit your profile information

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: Firebase (Email/Password, Google OAuth)
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Project Structure

```
college-booking-app/
├── client/              # Frontend (React + Vite)
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   └── services/   # API services
│   └── index.html
└── server/             # Backend (Express + MongoDB)
    └── src/
        ├── config/     # Database config
        ├── controllers/# Route controllers
        ├── models/     # Mongoose models
        ├── routes/     # API routes
        └── index.ts    # Entry point
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Firebase project

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-booking-app
```

2. Install dependencies:
```bash
cd client && npm install && cp .env.example .env
cd ../server && npm install && cp .env.example .env
```

3. Configure environment variables:

**Client (.env)**:
```
VITE_API_URL=http://localhost:5000
```

**Server (.env)**:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Start the application:
```bash
npm run dev
```

## Available Scripts

**Root:**
- `npm run dev` - Start both client and server (concurrently)

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type check

**Server:**
- `npm run dev` - Start development server with tsx
