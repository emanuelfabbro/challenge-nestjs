# NestJS MVC Application Boilerplate

A complete boilerplate for building MVC (Model-View-Controller) applications with NestJS.

## Features

- ✅ MVC architecture pattern
- ✅ TypeScript support
- ✅ Handlebars template engine
- ✅ TypeORM for database operations
- ✅ PostgreSQL integration
- ✅ Static asset serving
- ✅ Environment configuration
- ✅ ESLint and Prettier
- ✅ Unit and E2E testing with Jest

## Directory Structure

```
challenge-nestjs/
├── public/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Images and media
├── src/
│   ├── controllers/       # HTTP request handlers
│   ├── models/            # Database entities
│   ├── services/          # Business logic
│   ├── views/             # Handlebars templates
│   ├── config/            # Configuration files
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── test/                  # E2E tests
├── .env.example           # Environment variables template
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── nest-cli.json          # NestJS CLI configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (optional, for database features)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/emanuelfabbro/challenge-nestjs.git
cd challenge-nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

## Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

### Debug mode
```bash
npm run start:debug
```

The application will be available at `http://localhost:3000`

## Testing

### Unit tests
```bash
npm test
```

### E2E tests
```bash
npm run test:e2e
```

### Test coverage
```bash
npm run test:cov
```

## Development

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## MVC Architecture

### Controllers
Controllers handle incoming HTTP requests and return responses. They are located in `src/controllers/`.

Example:
```typescript
@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHome() {
    return { title: 'Home', message: 'Welcome!' };
  }
}
```

### Models
Models represent database entities using TypeORM. They are located in `src/models/`.

Example:
```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;
}
```

### Views
Views are Handlebars templates that render HTML. They are located in `src/views/`.

Example:
```handlebars
<h1>{{title}}</h1>
<p>{{message}}</p>
```

### Services
Services contain business logic and are injected into controllers. They are located in `src/services/`.

Example:
```typescript
@Injectable()
export class AppService {
  getWelcomeMessage(): string {
    return 'Welcome!';
  }
}
```

## Database Setup

1. Create a PostgreSQL database
2. Update `.env` with your database credentials
3. Run the application - TypeORM will automatically sync the schema in development mode

## License

MIT