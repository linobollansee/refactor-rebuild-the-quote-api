# Quote API - RESTful API with NestJS

A simple, beginner-friendly Quote API built with NestJS following RESTful principles.

## Features

✅ RESTful API design with proper HTTP methods
✅ DTO (Data Transfer Object) layer with validation
✅ User CRUD operations (for upcoming authorization)
✅ Quote CRUD operations
✅ Validation pipes for input data
✅ Query parameters (filter, limit)

## Installation

```bash
npm install
```

## Running the App

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm start
```

The API will run on `http://localhost:3000`

## API Endpoints

### Quotes

| Method | Endpoint               | Description        | Body Example                                      |
| ------ | ---------------------- | ------------------ | ------------------------------------------------- |
| GET    | `/quotes`              | Get all quotes     | -                                                 |
| GET    | `/quotes?limit=5`      | Get limited quotes | -                                                 |
| GET    | `/quotes?author=Oscar` | Filter by author   | -                                                 |
| GET    | `/quotes/:id`          | Get quote by ID    | -                                                 |
| POST   | `/quotes`              | Create new quote   | `{"text": "Quote text", "author": "Author Name"}` |
| PUT    | `/quotes/:id`          | Update quote       | `{"text": "Updated text"}`                        |
| DELETE | `/quotes/:id`          | Delete quote       | -                                                 |

### Users

| Method | Endpoint          | Description       | Body Example                                               |
| ------ | ----------------- | ----------------- | ---------------------------------------------------------- |
| GET    | `/users`          | Get all users     | -                                                          |
| GET    | `/users?limit=10` | Get limited users | -                                                          |
| GET    | `/users/:id`      | Get user by ID    | -                                                          |
| POST   | `/users`          | Create new user   | `{"email": "user@example.com", "password": "password123"}` |
| PUT    | `/users/:id`      | Update user       | `{"email": "newemail@example.com"}`                        |
| DELETE | `/users/:id`      | Delete user       | -                                                          |

## Testing the API

### Option 1: Using REST Client Extension (Recommended)

Install the **REST Client** extension by Huachao Mao in VS Code, then open `api-tests.http` and click "Send Request" above any endpoint to test it.

The `api-tests.http` file includes 25 pre-configured test cases:

- All CRUD operations for Quotes and Users
- Query parameter tests (limit, filter)
- Validation tests
- Error handling tests

### Option 2: Using PowerShell Commands

#### Get All Quotes

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes -Method GET
```

#### Get Quote by ID

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes/1 -Method GET
```

#### Get with Query Parameters

```powershell
# Limit results
Invoke-RestMethod -Uri "http://localhost:3000/quotes?limit=1" -Method GET

# Filter by author
Invoke-RestMethod -Uri "http://localhost:3000/quotes?author=Oscar" -Method GET
```

#### Create a Quote

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes -Method POST -ContentType "application/json" -Body '{"text": "Life is what happens when you are busy making other plans.", "author": "John Lennon"}'
```

#### Update a Quote

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes/1 -Method PUT -ContentType "application/json" -Body '{"text": "Updated quote text"}'
```

#### Delete a Quote

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes/1 -Method DELETE
```

#### Create a User

```powershell
Invoke-RestMethod -Uri http://localhost:3000/users -Method POST -ContentType "application/json" -Body '{"email": "john@example.com", "password": "securepass123"}'
```

#### Get All Users

```powershell
Invoke-RestMethod -Uri http://localhost:3000/users -Method GET
```

#### Update a User

```powershell
Invoke-RestMethod -Uri http://localhost:3000/users/1 -Method PUT -ContentType "application/json" -Body '{"email": "newemail@example.com"}'
```

#### Delete a User

```powershell
Invoke-RestMethod -Uri http://localhost:3000/users/1 -Method DELETE
```

### Option 3: Using curl (Bash/Linux)

```bash
# Create a quote
curl -X POST http://localhost:3000/quotes \
  -H "Content-Type: application/json" \
  -d '{"text": "Life is what happens when you are busy making other plans.", "author": "John Lennon"}'

# Get all quotes
curl http://localhost:3000/quotes

# Get with filters
curl http://localhost:3000/quotes?author=Oscar&limit=2
```

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── quotes/
│   ├── quotes.module.ts    # Quotes module
│   ├── quotes.controller.ts # REST endpoints
│   ├── quotes.service.ts   # Business logic
│   ├── dto/
│   │   ├── create-quote.dto.ts
│   │   └── update-quote.dto.ts
│   └── entities/
│       └── quote.entity.ts
└── users/
    ├── users.module.ts     # Users module
    ├── users.controller.ts # REST endpoints
    ├── users.service.ts    # Business logic
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    └── entities/
        └── user.entity.ts
```

## Database

Data is stored in **SQLite** database (`quote-api.db`):

- Persistent storage (survives server restarts)
- TypeORM for database management
- Automatic table creation on first run
- Database file created in project root

### Database Features

- Auto-generated IDs
- Timestamps (createdAt)
- Unique email constraint for users
- LIKE queries for author filtering

## Validation

All DTOs use `class-validator` decorators:

- `@IsString()` - Validates string type
- `@IsEmail()` - Validates email format
- `@IsNotEmpty()` - Ensures field is not empty
- `@MinLength(6)` - Minimum length validation
- `@IsOptional()` - Field is optional

## Notes

- Data persists in SQLite database file
- Passwords are stored as plain text (for learning purposes only)
- Ready for future authentication/authorization implementation
- Database file: `quote-api.db` (can be deleted to reset data)
