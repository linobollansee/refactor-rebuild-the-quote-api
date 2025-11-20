# Complete Project Explanation / Vollständige Projekterklärung

## 📚 Table of Contents / Inhaltsverzeichnis

1. [What is this Project?](#what-is-this-project)
2. [Core Concepts](#core-concepts)
3. [Architecture Overview](#architecture-overview)
4. [File-by-File Explanation](#file-by-file-explanation)
5. [How Data Flows](#how-data-flows)
6. [Key TypeScript Concepts](#key-typescript-concepts)
7. [Testing the API](#testing-the-api)

---

## What is this Project? / Was ist dieses Projekt?

This is a **REST API** (web service) built with **NestJS** that manages:

- **Quotes** (text + author)
- **Users** (email + password)

Dies ist eine **REST-API** (Webservice), gebaut mit **NestJS**, die verwaltet:

- **Zitate** (Text + Autor)
- **Benutzer** (E-Mail + Passwort)

### Technology Stack / Technologie-Stack

- **NestJS 11** - Modern Node.js framework / Modernes Node.js-Framework
- **TypeORM** - Database ORM (Object-Relational Mapping)
- **SQLite** - Lightweight database stored in a file / Leichte Datenbank in einer Datei
- **TypeScript** - JavaScript with types / JavaScript mit Typen
- **class-validator** - Data validation / Datenvalidierung

---

## Core Concepts / Kernkonzepte

### 1. **REST API** (Representational State Transfer)

A way for applications to communicate over HTTP using standard methods:

Eine Möglichkeit für Anwendungen, über HTTP mit Standardmethoden zu kommunizieren:

| Method     | Purpose                                     | Example                                  |
| ---------- | ------------------------------------------- | ---------------------------------------- |
| **GET**    | Read data / Daten lesen                     | Get all quotes / Alle Zitate abrufen     |
| **POST**   | Create new / Neu erstellen                  | Create a quote / Zitat erstellen         |
| **PUT**    | Update existing / Vorhandenes aktualisieren | Update quote #5 / Zitat #5 aktualisieren |
| **DELETE** | Delete / Löschen                            | Delete quote #5 / Zitat #5 löschen       |

**Example Request:**

```
GET http://localhost:3000/quotes
→ Returns: [{"id": 1, "text": "To be or not to be", "author": "Shakespeare"}]
```

### 2. **MVC Pattern** (Model-View-Controller)

This project uses a similar pattern:

Dieses Projekt verwendet ein ähnliches Muster:

```
Controller (HTTP Layer)     ←→  Service (Business Logic)      ←→  Repository (Database)
   ↓                                 ↓                                ↓
quotes.controller.ts          quotes.service.ts              TypeORM Repository
users.controller.ts           users.service.ts               TypeORM Repository
```

**Flow / Ablauf:**

1. **Controller** receives HTTP request / empfängt HTTP-Anfrage
2. **Service** processes business logic / verarbeitet Geschäftslogik
3. **Repository** talks to database / kommuniziert mit Datenbank
4. Response flows back / Antwort fließt zurück

### 3. **Dependency Injection (DI)**

NestJS automatically creates and provides dependencies:

NestJS erstellt und stellt Abhängigkeiten automatisch bereit:

```typescript
// ❌ Manual way (not used)
const service = new QuotesService();
const controller = new QuotesController(service);

// ✅ NestJS way (automatic)
constructor(private readonly quotesService: QuotesService) {}
// NestJS creates QuotesService and injects it here
// NestJS erstellt QuotesService und injiziert es hier
```

### 4. **Decorators** (@ symbols)

Special markers that add functionality to classes and methods:

Spezielle Markierungen, die Klassen und Methoden Funktionalität hinzufügen:

```typescript
@Controller("quotes")    // Makes class handle /quotes route
@Get()                   // Handles GET requests
@Post()                  // Handles POST requests
@IsString()             // Validates that value is a string
@Entity()               // Marks class as database table
```

---

## Architecture Overview / Architekturübersicht

```
refactor-rebuild-the-quote-api/
│
├── src/
│   ├── main.ts                    # Application entry point / Anwendungseinstieg
│   ├── app.module.ts              # Root module / Wurzelmodul
│   │
│   ├── quotes/                    # Quotes feature module / Zitate-Funktionsmodul
│   │   ├── quotes.controller.ts  # HTTP endpoints / HTTP-Endpunkte
│   │   ├── quotes.service.ts     # Business logic / Geschäftslogik
│   │   ├── quotes.module.ts      # Module configuration / Modulkonfiguration
│   │   ├── entities/
│   │   │   └── quote.entity.ts   # Database table definition / Datenbanktabellendefinition
│   │   └── dto/
│   │       ├── create-quote.dto.ts  # Validation for creating / Validierung für Erstellen
│   │       └── update-quote.dto.ts  # Validation for updating / Validierung für Aktualisieren
│   │
│   └── users/                     # Users feature module / Benutzer-Funktionsmodul
│       ├── users.controller.ts   # HTTP endpoints / HTTP-Endpunkte
│       ├── users.service.ts      # Business logic / Geschäftslogik
│       ├── users.module.ts       # Module configuration / Modulkonfiguration
│       ├── entities/
│       │   └── user.entity.ts    # Database table definition / Datenbanktabellendefinition
│       └── dto/
│           ├── create-user.dto.ts   # Validation for creating / Validierung für Erstellen
│           └── update-user.dto.ts   # Validation for updating / Validierung für Aktualisieren
│
├── quote-api.db                   # SQLite database file / SQLite-Datenbankdatei
├── package.json                   # Dependencies / Abhängigkeiten
├── tsconfig.json                  # TypeScript configuration / TypeScript-Konfiguration
├── nest-cli.json                  # NestJS CLI configuration / NestJS-CLI-Konfiguration
└── api-tests.http                 # REST Client test file / REST-Client-Testdatei
```

---

## File-by-File Explanation / Datei-für-Datei-Erklärung

### 🚀 **main.ts** - Application Bootstrap

**Purpose:** Starts the NestJS application  
**Zweck:** Startet die NestJS-Anwendung

```typescript
import { NestFactory } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  // Create NestJS application instance
  // NestJS-Anwendungsinstanz erstellen
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all endpoints
  // Globale Validierung für alle Endpunkte aktivieren
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties / Unbekannte Eigenschaften entfernen
      forbidNonWhitelisted: true, // Throw error on unknown properties / Fehler bei unbekannten Eigenschaften
      transform: true, // Auto-convert types / Typen automatisch konvertieren
    })
  );

  // Start server on port 3000
  // Server auf Port 3000 starten
  await app.listen(3000);
}
bootstrap();
```

**Key Concepts:**

- **async/await:** Handles asynchronous operations / Behandelt asynchrone Operationen
- **ValidationPipe:** Automatically validates incoming data / Validiert eingehende Daten automatisch
- **Port 3000:** Where the API listens for requests / Wo die API auf Anfragen wartet

---

### 📦 **app.module.ts** - Root Module

**Purpose:** Configures the entire application  
**Zweck:** Konfiguriert die gesamte Anwendung

```typescript
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    // Database configuration
    // Datenbankkonfiguration
    TypeOrmModule.forRoot({
      type: "sqlite", // Database type / Datenbanktyp
      database: "quote-api.db", // File location / Dateispeicherort
      entities: [Quote, User], // Tables / Tabellen
      synchronize: true, // Auto-create tables / Tabellen automatisch erstellen
    }),

    // Feature modules
    // Funktionsmodule
    QuotesModule,
    UsersModule,
  ],
})
export class AppModule {}
```

**Key Concepts:**

- **@Module:** Defines a module (organizational unit) / Definiert ein Modul (Organisationseinheit)
- **TypeORM:** ORM that maps TypeScript classes to database tables / ORM, das TypeScript-Klassen auf Datenbanktabellen abbildet
- **synchronize: true:** Creates/updates tables automatically (only for development) / Erstellt/aktualisiert Tabellen automatisch (nur für Entwicklung)

---

### 🗄️ **Entities** - Database Tables

#### **quote.entity.ts**

**Purpose:** Defines the structure of the `quotes` table  
**Zweck:** Definiert die Struktur der `quotes`-Tabelle

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity() // Marks this class as a database table / Markiert diese Klasse als Datenbanktabelle
export class Quote {
  @PrimaryGeneratedColumn() // Auto-increment ID / Auto-Inkrement-ID
  id: number;

  @Column() // Regular column / Normale Spalte
  text: string;

  @Column()
  author: string;

  @CreateDateColumn() // Automatically set on creation / Automatisch beim Erstellen gesetzt
  createdAt: Date;
}
```

**Database Structure / Datenbankstruktur:**

```sql
CREATE TABLE quote (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### **user.entity.ts**

```typescript
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Email must be unique / E-Mail muss eindeutig sein
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

**Key Concepts:**

- **@Entity():** Creates a table / Erstellt eine Tabelle
- **@PrimaryGeneratedColumn():** Auto-incrementing ID / Auto-Inkrement-ID
- **@Column():** Regular field / Normales Feld
- **unique: true:** Prevents duplicates / Verhindert Duplikate

---

### 📝 **DTOs** - Data Transfer Objects

DTOs define **what data is allowed** and **validation rules**.

DTOs definieren **welche Daten erlaubt sind** und **Validierungsregeln**.

#### **create-quote.dto.ts**

```typescript
import { IsString, IsNotEmpty } from "class-validator";

export class CreateQuoteDto {
  @IsString() // Must be a string / Muss ein String sein
  @IsNotEmpty() // Cannot be empty / Kann nicht leer sein
  text: string;

  @IsString()
  @IsNotEmpty()
  author: string;
}
```

**What Happens When You Send:**

✅ **Valid Request:**

```json
{
  "text": "To be or not to be",
  "author": "Shakespeare"
}
→ Success! Data is validated and saved.
```

❌ **Invalid Request:**

```json
{
  "text": "",
  "author": "Shakespeare"
}
→ Error 400: text should not be empty
```

#### **update-quote.dto.ts**

```typescript
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateQuoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional() // Field is optional / Feld ist optional
  text?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  author?: string;
}
```

**Key Difference:**

- **Create:** All fields required / Alle Felder erforderlich
- **Update:** All fields optional / Alle Felder optional

---

### 🎮 **Controllers** - HTTP Handlers

Controllers handle incoming HTTP requests and return responses.

Controller behandeln eingehende HTTP-Anfragen und geben Antworten zurück.

#### **quotes.controller.ts**

```typescript
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { QuotesService } from "./quotes.service";
import { CreateQuoteDto } from "./dto/create-quote.dto";

@Controller("quotes") // Base route: /quotes
export class QuotesController {
  // Dependency Injection: NestJS provides QuotesService
  // Dependency Injection: NestJS stellt QuotesService bereit
  constructor(private readonly quotesService: QuotesService) {}

  // GET /quotes?limit=5&author=Oscar
  @Get()
  async findAll(
    @Query("limit") limit?: number, // Optional query param
    @Query("author") author?: string // Optional query param
  ): Promise<Quote[]> {
    return this.quotesService.findAll(limit, author);
  }

  // GET /quotes/5
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number // Converts "5" → 5
  ): Promise<Quote> {
    return this.quotesService.findOne(id);
  }

  // POST /quotes
  @Post()
  async create(
    @Body() createQuoteDto: CreateQuoteDto // Validates request body
  ): Promise<Quote> {
    return this.quotesService.create(createQuoteDto);
  }

  // PUT /quotes/5
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto
  ): Promise<Quote> {
    return this.quotesService.update(id, updateQuoteDto);
  }

  // DELETE /quotes/5
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.quotesService.remove(id);
  }
}
```

**Decorators Explained:**

- **@Controller('quotes'):** All routes start with `/quotes`
- **@Get():** Handles HTTP GET requests
- **@Post():** Handles HTTP POST requests
- **@Put():** Handles HTTP PUT requests
- **@Delete():** Handles HTTP DELETE requests
- **@Param('id'):** Extracts URL parameter (e.g., `/quotes/5` → `id = 5`)
- **@Query('limit'):** Extracts query parameter (e.g., `?limit=10` → `limit = 10`)
- **@Body():** Extracts and validates request body
- **ParseIntPipe:** Converts string to number and validates

---

### ⚙️ **Services** - Business Logic

Services contain the core logic and interact with the database.

Services enthalten die Kernlogik und interagieren mit der Datenbank.

#### **quotes.service.ts**

```typescript
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Quote } from "./entities/quote.entity";

@Injectable() // Allows this service to be injected / Ermöglicht Injektion dieses Services
export class QuotesService {
  constructor(
    @InjectRepository(Quote) // Inject database repository / Datenbank-Repository injizieren
    private quotesRepository: Repository<Quote>
  ) {}

  // Find all quotes with optional filters
  // Alle Zitate mit optionalen Filtern finden
  async findAll(limit?: number, author?: string): Promise<Quote[]> {
    const queryBuilder = this.quotesRepository.createQueryBuilder("quote");

    // Filter by author (case-insensitive)
    // Nach Autor filtern (Groß-/Kleinschreibung ignorieren)
    if (author) {
      queryBuilder.where("quote.author LIKE :author", {
        author: `%${author}%`, // %Oscar% finds "Oscar Wilde"
      });
    }

    // Limit results
    // Ergebnisse begrenzen
    if (limit) {
      queryBuilder.take(limit); // SQL: LIMIT x
    }

    return queryBuilder.getMany();
  }

  // Find one quote by ID
  // Ein Zitat nach ID finden
  async findOne(id: number): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({ where: { id } });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    return quote;
  }

  // Create a new quote
  // Neues Zitat erstellen
  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = this.quotesRepository.create(createQuoteDto);
    return this.quotesRepository.save(newQuote);
  }

  // Update an existing quote
  // Vorhandenes Zitat aktualisieren
  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.findOne(id); // Throws error if not found
    Object.assign(quote, updateQuoteDto); // Merge update data
    return this.quotesRepository.save(quote);
  }

  // Delete a quote
  // Zitat löschen
  async remove(id: number): Promise<void> {
    const result = await this.quotesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
  }
}
```

**Key Concepts:**

- **@Injectable():** Marks class for dependency injection / Markiert Klasse für Dependency Injection
- **Repository<Quote>:** TypeORM interface for database operations / TypeORM-Schnittstelle für Datenbankoperationen
- **QueryBuilder:** Constructs complex SQL queries / Konstruiert komplexe SQL-Abfragen
- **async/await:** Handles asynchronous database operations / Behandelt asynchrone Datenbankoperationen
- **NotFoundException:** Throws HTTP 404 error / Wirft HTTP-404-Fehler

#### **users.service.ts**

Similar to QuotesService, but includes **email uniqueness validation**:

Ähnlich wie QuotesService, enthält aber **E-Mail-Eindeutigkeitsprüfung**:

```typescript
async create(createUserDto: CreateUserDto): Promise<User> {
  // Check if email already exists
  // Prüfen, ob E-Mail bereits existiert
  const existingUser = await this.usersRepository.findOne({
    where: { email: createUserDto.email }
  });

  if (existingUser) {
    throw new ConflictException('Email already exists');  // HTTP 409
  }

  const newUser = this.usersRepository.create(createUserDto);
  return this.usersRepository.save(newUser);
}
```

---

### 📦 **Modules** - Organization Units

Modules organize related code together.

Module organisieren zusammengehörigen Code.

#### **quotes.module.ts**

```typescript
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuotesController } from "./quotes.controller";
import { QuotesService } from "./quotes.service";
import { Quote } from "./entities/quote.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote]), // Register Quote entity for this module
  ],
  controllers: [QuotesController], // HTTP handlers
  providers: [QuotesService], // Services available for injection
})
export class QuotesModule {}
```

**What This Does:**

1. Registers `Quote` entity with TypeORM
2. Makes `QuotesController` handle HTTP requests
3. Makes `QuotesService` available for dependency injection

---

## How Data Flows / Wie Daten fließen

### Example: Creating a New Quote

**1. Client sends HTTP request:**

```http
POST http://localhost:3000/quotes
Content-Type: application/json

{
  "text": "To be or not to be",
  "author": "Shakespeare"
}
```

**2. Request hits QuotesController:**

```typescript
@Post()
async create(@Body() createQuoteDto: CreateQuoteDto) {
  return this.quotesService.create(createQuoteDto);
}
```

**3. ValidationPipe validates data:**

```typescript
// Checks:
// - text is a string ✓
// - text is not empty ✓
// - author is a string ✓
// - author is not empty ✓
```

**4. QuotesService processes:**

```typescript
async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
  const newQuote = this.quotesRepository.create(createQuoteDto);
  return this.quotesRepository.save(newQuote);
}
```

**5. TypeORM saves to database:**

```sql
INSERT INTO quote (text, author, createdAt)
VALUES ('To be or not to be', 'Shakespeare', '2025-11-20 10:00:00');
```

**6. Response sent back:**

```json
{
  "id": 1,
  "text": "To be or not to be",
  "author": "Shakespeare",
  "createdAt": "2025-11-20T10:00:00.000Z"
}
```

---

## Key TypeScript Concepts / Wichtige TypeScript-Konzepte

### 1. **Types & Interfaces**

```typescript
// Type annotation
// Typ-Annotation
const name: string = "John";
const age: number = 30;

// Function with types
// Funktion mit Typen
async findOne(id: number): Promise<Quote> {
  // id must be a number
  // Return value must be a Quote wrapped in a Promise
}
```

### 2. **async/await**

```typescript
// ❌ Callback hell (old way)
db.find(id, (err, quote) => {
  if (err) throw err;
  console.log(quote);
});

// ✅ async/await (modern way)
const quote = await this.quotesRepository.findOne({ where: { id } });
console.log(quote);
```

### 3. **Constructors**

```typescript
class QuotesController {
  // Constructor parameter with "private readonly" creates a class property
  // Konstruktorparameter mit "private readonly" erstellt eine Klasseneigenschaft
  constructor(private readonly quotesService: QuotesService) {}

  // Now you can use this.quotesService anywhere in the class
  // Jetzt können Sie this.quotesService überall in der Klasse verwenden
  async findAll() {
    return this.quotesService.findAll();
  }
}
```

### 4. **Decorators**

```typescript
// Class decorator
// Klassendekorator
@Controller('quotes')
export class QuotesController {}

// Method decorator
// Methodendekorator
@Get(':id')
async findOne() {}

// Parameter decorator
// Parameterdekorator
async findOne(@Param('id') id: number) {}

// Property decorator
// Eigenschaftsdekorator
@Column()
text: string;
```

### 5. **Optional Parameters**

```typescript
// ? makes parameter optional
// ? macht Parameter optional
async findAll(limit?: number, author?: string) {
  // limit and author might be undefined
  // limit und author könnten undefined sein
}
```

### 6. **Promises**

```typescript
// Promise<Quote> means:
// "This function returns a Promise that will eventually give you a Quote"
// "Diese Funktion gibt ein Promise zurück, das Ihnen irgendwann ein Quote liefert"
async findOne(id: number): Promise<Quote> {
  return await this.quotesRepository.findOne({ where: { id } });
}
```

---

## Testing the API / API testen

### Option 1: REST Client (VS Code Extension)

Use the `api-tests.http` file:

```http
### Get all quotes
GET http://localhost:3000/quotes

### Create a quote
POST http://localhost:3000/quotes
Content-Type: application/json

{
  "text": "To be or not to be",
  "author": "Shakespeare"
}

### Get quote by ID
GET http://localhost:3000/quotes/1

### Update quote
PUT http://localhost:3000/quotes/1
Content-Type: application/json

{
  "text": "Updated quote text"
}

### Delete quote
DELETE http://localhost:3000/quotes/1
```

Click "Send Request" above each `###` section.

### Option 2: PowerShell

```powershell
# Get all quotes
Invoke-RestMethod -Uri "http://localhost:3000/quotes" -Method Get

# Create a quote
$body = @{
    text = "To be or not to be"
    author = "Shakespeare"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/quotes" -Method Post -Body $body -ContentType "application/json"

# Get quote by ID
Invoke-RestMethod -Uri "http://localhost:3000/quotes/1" -Method Get

# Update quote
$updateBody = @{
    text = "Updated quote"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/quotes/1" -Method Put -Body $updateBody -ContentType "application/json"

# Delete quote
Invoke-RestMethod -Uri "http://localhost:3000/quotes/1" -Method Delete
```

### Option 3: curl (Git Bash)

```bash
# Get all quotes
curl http://localhost:3000/quotes

# Create a quote
curl -X POST http://localhost:3000/quotes \
  -H "Content-Type: application/json" \
  -d '{"text":"To be or not to be","author":"Shakespeare"}'

# Get quote by ID
curl http://localhost:3000/quotes/1

# Update quote
curl -X PUT http://localhost:3000/quotes/1 \
  -H "Content-Type: application/json" \
  -d '{"text":"Updated quote"}'

# Delete quote
curl -X DELETE http://localhost:3000/quotes/1
```

---

## Common Errors & Solutions / Häufige Fehler & Lösungen

### 400 Bad Request - Validation Error

```json
{
  "statusCode": 400,
  "message": ["text should not be empty"],
  "error": "Bad Request"
}
```

**Cause:** Data doesn't match DTO validation rules  
**Ursache:** Daten entsprechen nicht den DTO-Validierungsregeln

**Solution:** Check that all required fields are provided and valid  
**Lösung:** Überprüfen Sie, dass alle erforderlichen Felder vorhanden und gültig sind

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Quote with ID 999 not found",
  "error": "Not Found"
}
```

**Cause:** Resource doesn't exist in database  
**Ursache:** Ressource existiert nicht in der Datenbank

**Solution:** Check that the ID is correct  
**Lösung:** Überprüfen Sie, dass die ID korrekt ist

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

**Cause:** Trying to create user with duplicate email  
**Ursache:** Versuch, Benutzer mit doppelter E-Mail zu erstellen

**Solution:** Use a different email address  
**Lösung:** Verwenden Sie eine andere E-Mail-Adresse

---

## Database Structure / Datenbankstruktur

The SQLite database (`quote-api.db`) contains two tables:

Die SQLite-Datenbank (`quote-api.db`) enthält zwei Tabellen:

### quotes table

| Column    | Type     | Constraints               |
| --------- | -------- | ------------------------- |
| id        | INTEGER  | PRIMARY KEY AUTOINCREMENT |
| text      | TEXT     | NOT NULL                  |
| author    | TEXT     | NOT NULL                  |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP |

### users table

| Column    | Type     | Constraints               |
| --------- | -------- | ------------------------- |
| id        | INTEGER  | PRIMARY KEY AUTOINCREMENT |
| email     | TEXT     | NOT NULL, UNIQUE          |
| password  | TEXT     | NOT NULL                  |
| createdAt | DATETIME | DEFAULT CURRENT_TIMESTAMP |

**View database:**

```bash
# Install SQLite browser or use command line
sqlite3 quote-api.db

# View tables
.tables

# View quotes
SELECT * FROM quote;

# View users
SELECT * FROM user;
```

---

## Summary / Zusammenfassung

This project demonstrates:

Dieses Projekt demonstriert:

✅ **REST API design** with HTTP methods  
✅ **NestJS framework** with decorators and modules  
✅ **TypeORM** for database operations  
✅ **Dependency Injection** for clean architecture  
✅ **Data validation** with class-validator  
✅ **TypeScript** for type safety  
✅ **SQLite** for persistent storage

**Data Flow:**

```
Client Request
    ↓
Controller (HTTP handling)
    ↓
Service (Business logic)
    ↓
Repository (Database)
    ↓
SQLite Database
```

**Key Files:**

- `main.ts` - Application start / Anwendungsstart
- `app.module.ts` - Configuration / Konfiguration
- `*.controller.ts` - HTTP endpoints / HTTP-Endpunkte
- `*.service.ts` - Business logic / Geschäftslogik
- `*.entity.ts` - Database tables / Datenbanktabellen
- `*.dto.ts` - Validation rules / Validierungsregeln

---

## Next Steps / Nächste Schritte

To expand this project, you could add:

Um dieses Projekt zu erweitern, könnten Sie hinzufügen:

1. **Authentication** - JWT tokens for secure login / JWT-Tokens für sichere Anmeldung
2. **Relations** - Link quotes to users / Zitate mit Benutzern verknüpfen
3. **Pagination** - Better handling of large datasets / Bessere Handhabung großer Datensätze
4. **Swagger** - Auto-generated API documentation / Auto-generierte API-Dokumentation
5. **Testing** - Unit and E2E tests / Unit- und E2E-Tests
6. **Environment variables** - Configuration management / Konfigurationsverwaltung
7. **Password hashing** - Encrypt passwords with bcrypt / Passwörter mit bcrypt verschlüsseln

---

**Happy Coding! / Viel Spaß beim Programmieren!** 🚀
