# Employee Management Application - Client

This is the frontend for the Employee Management Application, built with React, Redux, and Vite.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login/logout)
- View list of employees
- Add new employees
- Edit existing employee information
- Delete employees
- Responsive design using Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

To install the Employee Management Application client, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/employee-management-app.git
   ```

2. Navigate to the client directory:
   ```
   cd employee-management-app/client
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:

```
npm run dev
```

This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Running Tests

To run the tests, use the following command:

```
npm test
```

This will run all tests and display the results in the console.

## Building for Production

To build the application for production, use the following command:

```
npm run build
```

This will create a `dist` folder with the production-ready files.

## Project Structure

```
client/
├── public/
├── src/
│   ├── __tests__/
│   ├── components/
│   ├── services/
│   ├── store/
│   │   └── slices/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Technologies Used

- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- Vite
- TypeScript
- Jest
- React Testing Library

## License

This project is licensed under the [MIT License](LICENSE).