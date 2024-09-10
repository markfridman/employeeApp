# Employee Management Service

This is a TypeScript-based Node.js service for managing employee records. It provides a RESTful API for basic CRUD operations on employee data.

## Features

- Create, Read, Update, and Delete employee records
- RESTful API
- TypeScript for type safety
- Jest for unit and integration testing
- Docker support for easy deployment

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:
    git clone https://github.com/your-username/employee-management-service.git
    cd employee-management-service

2. Install dependencies:
    npm install

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:
    npm run dev

The server will start on `http://localhost:3000`.

### Production Mode

To run the application in production mode:

1. Build the TypeScript code:
    npm run build

2. Start the server:
    npm start

## API Endpoints

- `GET /api/employees`: Get all employees
- `GET /api/employees/:id`: Get an employee by ID
- `POST /api/employees`: Create a new employee
- `PUT /api/employees/:id`: Update an employee
- `DELETE /api/employees/:id`: Delete an employee

## Testing

To run the test suite:
    npm test

For watching mode (reruns all tests on file changes):
npm run test:watchAll

To generate a coverage report:
    npm run test:coverage

## Docker

To build and run the application using Docker:

1. Build the Docker image:
    docker build -t employee-management-service .

2. Run the container:
    docker run -p 3000:3000 employee-management-service

he service will be available at `http://localhost:3000`.

## Environment Variables

- `PORT`: The port number on which the server will run (default: 3000)
- `NODE_ENV`: The environment in which the application is running (e.g., 'development', 'production')




