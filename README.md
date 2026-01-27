# 🚀 Challenge Tecnico - NestJS API

API REST desarrollada con **NestJS** para la gestión de usuarios y perfiles. Este proyecto implementa una arquitectura modular, buenas prácticas de desarrollo, contenerización con Docker y documentación automática.

## 📋 Características

- **CRUD Completo:** Gestión de Usuarios y Perfiles (1:1).
- **Validaciones:** Datos de entrada validados estrictamente (DTOs).
- **Base de Datos:** SQLite en memoria.
- **Seguridad:** Protección de endpoints críticos mediante Guards y Roles.
- **Docker:** Configuración optimizada (Multi-stage build).
- **Documentación:** Swagger/OpenAPI integrado.
- **Testing:** Pruebas unitarias con alta cobertura (>60%).

## 🛠️ Stack Tecnológico

- **Framework:** NestJS (Node.js + TypeScript)
- **Base de Datos:** SQLite (`:memory:`)
- **ORM:** TypeORM
- **Validación:** class-validator & class-transformer
- **Testing:** Jest
- **Contenedores:** Docker

---

## 🚀 Guía de Inicio Rápido

### Prerrequisitos
- Node.js (v18+)
- Docker (Opcional, pero recomendado)

### 1. Instalación
```bash
npm install
```

### 2. Ejecución Local (Desarrollo)
El servidor iniciará en http://localhost:3000
```bash
npm run start:dev
```

### 3. Ejecución con Docker
# Construir la imagen

```bash
docker build -t nest-backend-test .
```

# Correr el contenedor (mapeando puerto 3000)

```bash
docker run --rm -p 3000:3000 nest-backend-test
```

### 4. Testing
El proyecto cuenta con pruebas unitarias para Servicios y Controladores, alcanzando un coverage superior al 80%.

# Ejecutar tests

```bash
npm run test
```

# Ejecutar tests con cobertura
```bash
npm run test:cov
```

# Documentación de API
Una vez iniciada la aplicación, visita la documentación interactiva generada con Swagger:

👉 http://localhost:3000/docs

Endpoints Principales
POST /users: Crear usuario y perfil.

GET /users?term=...: Listar usuarios (con filtro opcional).

DELETE /users/:id: Eliminar usuario (Requiere header x-role: admin).

# Estructura del Proyecto
Consulta el archivo GUIDE.md para una explicación detallada de la arquitectura y decisiones técnicas.