# Quote API - RESTful API with NestJS

**English** | [Deutsch](#deutsch)

A simple, beginner-friendly Quote API built with NestJS following RESTful principles, featuring SQLite database persistence.

---

## Features

✅ RESTful API design with proper HTTP methods  
✅ DTO (Data Transfer Object) layer with validation  
✅ User CRUD operations (for upcoming authorization)  
✅ Quote CRUD operations  
✅ Validation pipes for input data  
✅ Query parameters (filter, limit)  
✅ SQLite database with TypeORM

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Object-Relational Mapping
- **SQLite** - Lightweight database
- **class-validator** - DTO validation
- **TypeScript** - Type-safe JavaScript

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

#### Create a Quote

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes -Method POST -ContentType "application/json" -Body '{"text": "Life is what happens when you are busy making other plans.", "author": "John Lennon"}'
```

#### Get with Query Parameters

```powershell
# Limit results
Invoke-RestMethod -Uri "http://localhost:3000/quotes?limit=1" -Method GET

# Filter by author
Invoke-RestMethod -Uri "http://localhost:3000/quotes?author=Oscar" -Method GET
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

- **Persistent storage** - Data survives server restarts
- **TypeORM** - Database management
- **Automatic table creation** - Created on first run
- **Location** - Project root directory

### Database Features

- Auto-generated IDs (primary keys)
- Automatic timestamps (createdAt)
- Unique email constraint for users
- LIKE queries for filtering

### Reset Database

To start fresh with ID 1:

```powershell
# Stop server, delete database, restart
Remove-Item quote-api.db
npm run start:dev
```

## Validation

All DTOs use `class-validator` decorators:

- `@IsString()` - Validates string type
- `@IsEmail()` - Validates email format
- `@IsNotEmpty()` - Ensures field is not empty
- `@MinLength(6)` - Minimum length validation (e.g., passwords)
- `@IsOptional()` - Field is optional for updates

## Code Comments

All TypeScript files are fully commented in **English** and **German** for beginner-friendly understanding.

## Notes

- Data persists in SQLite database file
- Passwords are stored as plain text (for learning purposes only - never do this in production!)
- Ready for future authentication/authorization implementation
- Database file: `quote-api.db` (delete to reset data)

---

<a name="deutsch"></a>

# Quote API - RESTful API mit NestJS

[English](#quote-api---restful-api-with-nestjs) | **Deutsch**

Eine einfache, anfängerfreundliche Quote API, gebaut mit NestJS nach RESTful-Prinzipien, mit SQLite-Datenbank-Persistenz.

---

## Funktionen

✅ RESTful API-Design mit korrekten HTTP-Methoden  
✅ DTO (Data Transfer Object) Schicht mit Validierung  
✅ Benutzer CRUD-Operationen (für zukünftige Autorisierung)  
✅ Zitat CRUD-Operationen  
✅ Validierungs-Pipes für Eingabedaten  
✅ Abfrageparameter (Filter, Limit)  
✅ SQLite-Datenbank mit TypeORM

## Technologie-Stack

- **NestJS** - Progressives Node.js Framework
- **TypeORM** - Objekt-Relationales Mapping
- **SQLite** - Leichtgewichtige Datenbank
- **class-validator** - DTO-Validierung
- **TypeScript** - Typsicheres JavaScript

## Installation

```bash
npm install
```

## Die App starten

```bash
# Entwicklungsmodus mit Hot Reload
npm run start:dev

# Produktionsmodus
npm start
```

Die API läuft auf `http://localhost:3000`

## API-Endpunkte

### Zitate

| Methode | Endpunkt               | Beschreibung             | Body-Beispiel                                    |
| ------- | ---------------------- | ------------------------ | ------------------------------------------------ |
| GET     | `/quotes`              | Alle Zitate abrufen      | -                                                |
| GET     | `/quotes?limit=5`      | Begrenzte Zitate abrufen | -                                                |
| GET     | `/quotes?author=Oscar` | Nach Autor filtern       | -                                                |
| GET     | `/quotes/:id`          | Zitat nach ID abrufen    | -                                                |
| POST    | `/quotes`              | Neues Zitat erstellen    | `{"text": "Zitat Text", "author": "Autor Name"}` |
| PUT     | `/quotes/:id`          | Zitat aktualisieren      | `{"text": "Aktualisierter Text"}`                |
| DELETE  | `/quotes/:id`          | Zitat löschen            | -                                                |

### Benutzer

| Methode | Endpunkt          | Beschreibung               | Body-Beispiel                                              |
| ------- | ----------------- | -------------------------- | ---------------------------------------------------------- |
| GET     | `/users`          | Alle Benutzer abrufen      | -                                                          |
| GET     | `/users?limit=10` | Begrenzte Benutzer abrufen | -                                                          |
| GET     | `/users/:id`      | Benutzer nach ID abrufen   | -                                                          |
| POST    | `/users`          | Neuen Benutzer erstellen   | `{"email": "user@example.com", "password": "password123"}` |
| PUT     | `/users/:id`      | Benutzer aktualisieren     | `{"email": "neuemail@example.com"}`                        |
| DELETE  | `/users/:id`      | Benutzer löschen           | -                                                          |

## API testen

### Option 1: REST Client Extension (Empfohlen)

Installiere die **REST Client** Extension von Huachao Mao in VS Code, öffne dann `api-tests.http` und klicke auf "Send Request" über jedem Endpunkt.

Die `api-tests.http` Datei enthält 25 vorkonfigurierte Testfälle:

- Alle CRUD-Operationen für Zitate und Benutzer
- Abfrageparameter-Tests (Limit, Filter)
- Validierungstests
- Fehlerbehandlungstests

### Option 2: PowerShell-Befehle verwenden

#### Alle Zitate abrufen

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes -Method GET
```

#### Ein Zitat erstellen

```powershell
Invoke-RestMethod -Uri http://localhost:3000/quotes -Method POST -ContentType "application/json" -Body '{"text": "Das Leben ist das, was passiert, während du andere Pläne machst.", "author": "John Lennon"}'
```

#### Mit Abfrageparametern abrufen

```powershell
# Ergebnisse begrenzen
Invoke-RestMethod -Uri "http://localhost:3000/quotes?limit=1" -Method GET

# Nach Autor filtern
Invoke-RestMethod -Uri "http://localhost:3000/quotes?author=Oscar" -Method GET
```

### Option 3: curl verwenden (Bash/Linux)

```bash
# Ein Zitat erstellen
curl -X POST http://localhost:3000/quotes \
  -H "Content-Type: application/json" \
  -d '{"text": "Das Leben ist das, was passiert, während du andere Pläne machst.", "author": "John Lennon"}'

# Alle Zitate abrufen
curl http://localhost:3000/quotes

# Mit Filtern abrufen
curl http://localhost:3000/quotes?author=Oscar&limit=2
```

## Projektstruktur

```
src/
├── main.ts                 # Anwendungseinstiegspunkt
├── app.module.ts           # Hauptmodul
├── quotes/
│   ├── quotes.module.ts    # Zitate-Modul
│   ├── quotes.controller.ts # REST-Endpunkte
│   ├── quotes.service.ts   # Geschäftslogik
│   ├── dto/
│   │   ├── create-quote.dto.ts
│   │   └── update-quote.dto.ts
│   └── entities/
│       └── quote.entity.ts
└── users/
    ├── users.module.ts     # Benutzer-Modul
    ├── users.controller.ts # REST-Endpunkte
    ├── users.service.ts    # Geschäftslogik
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    └── entities/
        └── user.entity.ts
```

## Datenbank

Daten werden in **SQLite**-Datenbank (`quote-api.db`) gespeichert:

- **Persistente Speicherung** - Daten überleben Server-Neustarts
- **TypeORM** - Datenbankverwaltung
- **Automatische Tabellenerstellung** - Beim ersten Start erstellt
- **Speicherort** - Projekt-Hauptverzeichnis

### Datenbankfunktionen

- Automatisch generierte IDs (Primärschlüssel)
- Automatische Zeitstempel (createdAt)
- Eindeutige E-Mail-Beschränkung für Benutzer
- LIKE-Abfragen zum Filtern

### Datenbank zurücksetzen

Um mit ID 1 neu zu beginnen:

```powershell
# Server stoppen, Datenbank löschen, neu starten
Remove-Item quote-api.db
npm run start:dev
```

## Validierung

Alle DTOs verwenden `class-validator` Dekoratoren:

- `@IsString()` - Validiert String-Typ
- `@IsEmail()` - Validiert E-Mail-Format
- `@IsNotEmpty()` - Stellt sicher, dass Feld nicht leer ist
- `@MinLength(6)` - Mindestlängen-Validierung (z.B. Passwörter)
- `@IsOptional()` - Feld ist optional für Updates

## Code-Kommentare

Alle TypeScript-Dateien sind vollständig in **Englisch** und **Deutsch** kommentiert für anfängerfreundliches Verständnis.

## Hinweise

- Daten bleiben in der SQLite-Datenbankdatei erhalten
- Passwörter werden als Klartext gespeichert (nur zu Lernzwecken - niemals in Produktion!)
- Bereit für zukünftige Authentifizierungs-/Autorisierungsimplementierung
- Datenbankdatei: `quote-api.db` (löschen zum Zurücksetzen der Daten)
