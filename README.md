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
Rename the `.env.example` file to `.env` and update the environment variables accordingly.

### 4. Prisma Setup
Run the following command to push the Prisma schema to your database:
```bash
npx prisma db push
```
If you need to apply migrations (recommended for production setups), use:
```bash
npx prisma migrate dev --name init
```

### 5. Add roles in the database and edit the enum in `src/types/auth.ts` if needed 
Run the following command in your database:
```sql
INSERT INTO "Role" VALUES (1, 'SuperAdmin'), (2, 'Admin'), (3, 'User');
```

### 6. Run the Development Server
Start the development server with:
```bash
npm run dev
```

## Usage
* Open http://localhost:5000/api-docs to view the documentation provided by Swagger UI.