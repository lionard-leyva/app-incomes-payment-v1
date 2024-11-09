# Personal Finance Backend

A Node.js backend service for managing personal finances with clean architecture.

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run database migrations:
```bash
npm run migrate
```
4. Start the server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

### Create Transaction

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INCOME",
    "amount": 1000.00,
    "description": "Monthly salary"
  }'
```

### Create Expense

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "EXPENSE",
    "amount": 50.00,
    "description": "Grocery shopping"
  }'
```

### Get All Transactions

```bash
curl http://localhost:3000/api/transactions
```

### Get Current Balance

```bash
curl http://localhost:3000/api/transactions/balance
```

### Get Transaction by ID

```bash
curl http://localhost:3000/api/transactions/{id}
```

### Update Transaction

```bash
curl -X PUT http://localhost:3000/api/transactions/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "type": "EXPENSE",
    "amount": 75.00,
    "description": "Updated grocery bill"
  }'
```

### Delete Transaction

```bash
curl -X DELETE http://localhost:3000/api/transactions/{id}
```

## Docker Support

The project includes Docker support. To run using Docker:

```bash
docker-compose up
```

This will start both the application and a PostgreSQL database. The application will be available on port 3000.

## Environment Variables

The following environment variables can be configured:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=finance_db
```

## Project Structure

```
src/
├── application/        # Application business rules
│   └── use-cases/     # Use cases implementation
├── domain/            # Enterprise business rules
│   ├── entities/      # Business entities
│   └── repositories/  # Repository interfaces
└── infrastructure/    # Frameworks and drivers
    ├── db/           # Database configuration
    ├── repositories/ # Repository implementations
    ├── routes/       # Express routes
    └── server.js     # Express server setup
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm start`: Start the production server
- `npm test`: Run tests
- `npm run migrate`: Run database migrations

## API Response Examples

### Successful Transaction Creation
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "INCOME",
  "amount": 1000.00,
  "description": "Monthly salary",
  "date": "2024-01-20T12:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Invalid transaction type"
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error