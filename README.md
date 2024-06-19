# Node.js and Express.js Authentication Template

## Description
This project is a template for setting up authentication in a Node.js application using Express.js, TypeScript, Prisma and PostgreSQL.

## Prerequisites
- Node.js
- PostgreSQL database

## Installation Steps

### 1. Clone the Repository

### 2. Install Dependencies
Install the necessary dependencies by running:
```bash
npm install
```

### 3. Configure Environment Variables
Rename the .env.example file to .env and update the environment variables accordingly.

### 4. Prisma Setup
Run the following command to push the Prisma schema to your database:
```bash
npx prisma db push
```
If you need to apply migrations (recommended for production setups), use:
```bash
npx prisma migrate dev --name init
```

### 5. Run the Development Server
Start the development server with:
```bash
npm run dev
```

## Usage
* Open http://localhost:5000/api-docs to view the documentation provided by Swagger UI.
* Call http://localhost:5000/api/auth/sign-up in Postman with a JSON body (email and password) to sign up.
* Call http://localhost:5000/api/auth/sign-in in Postman with a JSON body (email and password) to sign in.