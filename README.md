# Login System

A Node.js + Express authentication API built with MongoDB and JWT. This project provides a simple user registration, login, and logout flow with password hashing, secure token generation, and cookie-based session handling.

## Features

- User registration with validation
- Login using either email or username
- Password hashing with bcrypt
- JWT access and refresh token generation
- Cookie-based authentication
- Logout support
- MongoDB integration with Mongoose
- File upload support via multer middleware
- Clean Express project structure

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cookie-parser
- cors
- multer
- nodemon

## Project Structure

```bash
LOGIN_SYSTEM/
├── .env
├── .gitignore
├── package.json
├── README.md
├── public/
├── src/
│   ├── app.js
│   ├── constants.js
│   ├── index.js
│   ├── controllers/
│   │   └── user.controllers.js
│   ├── db/
│   │   └── index.db.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.route.js
│   └── utils/
│       ├── ApiErrorHandler.js
│       ├── ApiResponseHandler.js
│       └── AsyncHandlers.js
└── node_modules/
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB connection string available
- npm or yarn installed

## Installation

1. Clone the repository
2. Open the project folder
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root and add the following values:

```env
PORT=4000
MONGO_URI=your_mongoDb
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRE=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d
```

Notes:

- `MONGO_URI` should point to your MongoDB server.
- `DB_NAME` is currently set in `src/constants.js` as `mohinur`.
- For local development, `CORS_ORIGIN=*` is acceptable; for production, use a specific origin.
- Cookies are configured with `secure: true`, so in local HTTP development you may need to adjust that setting for browser compatibility.

## Running the Application

Start the development server:

```bash
npm run dev
```

The server will run on the port defined in `.env` (default: `4000`).

## API Endpoints

### 1) Register User

- Method: `POST`
- URL: `/api/v1/user/register`
- Body:

```json
{
  "fullName": "John Doe",
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "123456"
}
```

### 2) Login User

- Method: `POST`
- URL: `/api/v1/user/login`
- Body:

```json
{
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "123456"
}
```

### 3) Logout User

- Method: `POST`
- URL: `/api/v1/user/logout`
- Requires authentication (JWT in cookies or Authorization header)

## Authentication Flow

The application uses JWT tokens:

- `accessToken` is used for protected routes.
- `refreshToken` is generated and stored in the user document.
- Tokens are sent via cookies and may also be read from the `Authorization` header.
- The `validJWT` middleware verifies the access token before allowing access.

## User Model

The `User` schema includes:

- `fullName`
- `userName`
- `email`
- `password`
- `refreshToken`
- timestamps

Password hashing is handled before save using bcrypt, and helper methods generate JWT tokens for access and refresh flows.

## Notes

- The project is designed as a backend authentication starter.
- It is suitable for learning authentication patterns, API design, and MongoDB-backed user management.
- The current setup is a good base for expanding into profile management, email verification, forgot/reset password, and role-based access control.

## Future Enhancements

Possible improvements:

- Email verification
- Password reset flow
- Role-based authorization
- Refresh token rotation
- Validation with Joi or Zod
- Input sanitization and rate limiting
- Logging and monitoring
- Docker setup

## License

This project is currently unlicensed unless you add a license file of your choice.

## Author

Mohinur Rahaman
