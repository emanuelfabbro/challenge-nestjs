# 📘 Guía de Arquitectura y Decisiones Técnicas

Este documento detalla el razonamiento detrás de las decisiones de diseño, la arquitectura elegida y los patrones implementados en la solución del desafío técnico.

## 🏗️ 1. Arquitectura del Proyecto

Se optó por una **Arquitectura Modular** propia de NestJS, pero organizando internamente los componentes en capas lógicas para mantener la separación de responsabilidades (SoC).

### Estructura de Directorios
src/
├── common/             # Componentes transversales (Guards, Decorators, Filters)
├── modules/            # Módulos de funcionalidad (Features)
│   └── users/          # Dominio de Usuarios
│       ├── model/      # Capa de Datos
│       │   ├── dto/    # Data Transfer Objects (Validación de entrada)
│       │   └── entity/ # Definición de tablas DB
│       ├── users.controller.ts  # Capa de Entrada (HTTP)
│       └── users.service.ts     # Capa de Negocio
└── main.ts             # Punto de entrada
test/                   # Pruebas Unitarias y E2E separadas del código fuente

# Por qué esta estructura:
Escalabilidad: Cada módulo (users) es autocontenido. Si la aplicación crece, se pueden agregar nuevos módulos sin afectar a los existentes.

Claridad: Separa claramente los objetos de transferencia (DTO) de las entidades de persistencia (Entity), evitando exponer la estructura de la base de datos directamente al cliente.

# Decisiones Técnicas Clave

# A. Base de Datos en Memoria (SQLite + TypeORM)
Requisito: La prueba solicitaba "almacenamiento en memoria". Implementación: Se utilizó SQLite en modo :memory: gestionado por TypeORM.

Razón: Permite usar un ORM robusto y profesional (TypeORM) con todas sus características (repositorios, relaciones, migraciones automáticas con synchronize: true) sin la complejidad de configurar un contenedor de base de datos externo. Si se requiere pasar a Producción, solo basta cambiar la configuración a PostgreSQL o MySQL sin tocar el código.

# B. Patrón Repositorio
Se inyecta el repositorio genérico de TypeORM (Repository<User>) en el servicio.

Beneficio: Abstrae la lógica de acceso a datos. Facilita enormemente el Testing Unitario, ya que permite "mockear" la base de datos fácilmente sin depender de una conexión real.

# C. Validaciones y DTOs
Se implementaron DTOs (CreateUserDto) con decoradores de class-validator.

Validación Declarativa: Reglas como IsEmail, IsNotEmpty o ValidateNested aseguran la integridad de los datos antes de que lleguen al controlador.

Seguridad: ValidationPipe con whitelist: true evita la inyección masiva de parámetros no deseados.

# D. Seguridad y Permisos (Roles)
Para cumplir el requisito de "Manejo de permisos" en el borrado de usuarios:

Implementación: Se creó un Guard personalizado (RolesGuard) y un decorador (@Roles).

Flujo: El endpoint DELETE verifica la existencia de un header x-role: admin.

Por qué: Es una solución ligera y modular que demuestra el conocimiento de los Interceptors y Guards de NestJS sin la sobreingeniería de implementar un sistema completo de JWT/Auth0 para una prueba técnica de alcance limitado.

# Estrategia de Contenerización (Docker)
Se diseñó un Dockerfile utilizando Multi-stage builds:

# Builder Stage: Instala dependencias y compila el TypeScript a JavaScript (dist/).

# Production Stage: Copia solo los artefactos necesarios (dist/ y node_modules).

Resultado: Una imagen final ligera, segura y lista para producción, eliminando código fuente y herramientas de desarrollo innecesarias.

# Estrategia de Testing
Las pruebas se movieron a la carpeta test/ para mantener limpio el src/.

Unit Testing: Se realizaron pruebas aisladas para Service y Controller utilizando Jest.

Mocking: Se simularon todas las dependencias externas (Repositorios) para asegurar que los tests sean rápidos y deterministas.

Cobertura: Se alcanzó >60% de cobertura cubriendo "caminos felices", manejo de errores y casos de borde (ej. filtros de búsqueda).
