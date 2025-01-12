# twc-contacts-portal
A full-stack contact management application built with React, Nest.js. The application features secure authentication, CRUD operations for contacts.

## Features

- **Authentication & Authorization**
  - Cookie-based authentication system
  - Protected API endpoints

- **Login Panel**
  - Users can log in with credentials or Google SSO

- **Register Interface**
  - Users can register using an email and password

- **Conatcts Interface**
  - Users can view added contacts in a table. They can also update or delete a contact

- **Add Contact Interface**
  - Users can add a new contact by providing the full name, email, and gender
  

## Technology Stack

### Frontend (web)
- React with TypeScript
- Vite as build tool
- Tailwind CSS for styling

### Backend (api)
- NestJS framework
- MySQL database
- Swagger for API documentation

## Prerequisites

- Node.js
- MySQL
- npm package manager

## Project Structure

```
twc-contacts-portal/
├── api/                # NestJS backend
├── web/                # React frontend
├── docker-compose.yml
└── README.md
```

## Environment Configuration

### Backend (.env)
```
PORT                   # API server port (default: 3003)
NODE_ENV               # Environment (development/production)
MYSQL_HOST             # MySQL database host
MYSQL_PORT             # MySQL database port
MYSQL_USERNAME         # MySQL username
MYSQL_PASSWORD         # MySQL password
MYSQL_DATABASE         # MySQL database name
JWT_SECRET             # Secret key for JWT token generation
GOOGLE_CLIENT_ID  # Cloudinary cloud name for image uploads
GOOGLE_CLIENT_SECRET     # Cloudinary API key
GOOGLE_CALLBACK_URL  http://localhost:3003/auth/google/callback
FRONTEND_URL http://localhost:5173
DEMO_USER_EMAIL=admin@admin.com
DEMO_USER_PASSWORD=admin
```

### Frontend (.env)
```
VITE_BASE_URL   http://localhost:3003
```

## Installation & Setup

1. Clone the repository
```bash
git clone <https://github.com/Harshan-Pradeep/twc-contacts-portal.git>
cd twc-contacts-portal
```

2. Backend Setup
```bash
cd api
npm install
# Configure your .env file based on the template above
npm run start:dev
```

3. Frontend Setup
```bash
cd web
npm install
# Configure your .env file
npm run dev
```

## API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:3003/api-docs/#/
```

## Development

### Backend Development
```bash
cd api
# Start in development mode
npm run start:dev

# Start in production mode
npm run start:prod
```

### Frontend Development
```bash
cd web
npm run dev
```
