# Cash Flow

Современный сервис управления личными финансами с визуализацией денежного потока и удобным ежедневным учётом.

## 🎯 Основные идеи

-   Минималистичный интерфейс для учёта доходов и расходов
-   Визуализация денежного потока
-   Управление финансовыми целями
-   Планируется: AI-ассистент и мобильное приложение

## 🏗️ Архитектура

Проект состоит из двух частей:

-   **Backend** (`/backend`) — NestJS сервер с микросервисной архитектурой
-   **Frontend** (`/frontend`) — Next.js клиентское приложение

### Технологический стек

**Backend:**

-   NestJS, Prisma, PostgreSQL, RabbitMQ, JWT, TypeScript

**Frontend:**

-   Next.js 16, React 19, Tailwind CSS 4, Radix UI, TypeScript

## 🚀 Быстрый старт

### Предварительные требования

-   Node.js 18+
-   Docker и Docker Compose
-   npm/yarn/pnpm

### Установка

1. **Клонируйте репозиторий:**

    ```bash
    git clone <repository-url>
    cd cash-flow
    ```

2. **Настройте Backend:**

    ```bash
    cd backend
    npm install
    ```

    Создайте `.env` файл:

    ```env
    POSTRGES_URI=postgresql://user:password@localhost:5436/cashflow
    POSTGRES_USER=user
    POSTGRES_PASSWORD=password
    RABBITMQ_DEFAULT_USER=admin
    RABBITMQ_DEFAULT_PASS=admin
    RABBITMQ_DEFAULT_HOST=localhost
    PORT=3000
    JWT_SECRET=your-secret-key-here
    ```

3. **Настройте Frontend:**

    ```bash
    cd ../frontend
    npm install
    ```

4. **Запустите инфраструктуру:**

    ```bash
    cd ../backend
    docker-compose up -d
    ```

5. **Примените миграции:**

    ```bash
    cd backend
    npx prisma migrate dev
    npx prisma generate
    ```

6. **Запустите Backend:**

    ```bash
    cd backend
    npm run start:dev
    ```

7. **Запустите Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```

## 📁 Структура проекта

```
cash-flow/
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── domains/  # Доменные модули (DDD)
│   │   ├── lib/      # Общие утилиты
│   │   └── rmq/      # RabbitMQ интеграция
│   └── prisma/       # Схема и миграции БД
├── frontend/         # Next.js frontend
│   ├── app/          # App Router
│   ├── features/     # Бизнес-логика (FSD)
│   ├── widgets/      # Композитные компоненты
│   └── shared/       # Переиспользуемые компоненты
└── README.md
```

## 🏛️ Архитектурные практики

### Backend

-   **Domain-Driven Design** — разделение по доменам
-   **Layered Architecture** — Controllers → Services → Data Access
-   **Microservices** — RabbitMQ для межсервисного взаимодействия
-   **DTO Pattern** — валидация через class-validator

### Frontend

-   **Feature-Sliced Design** — организация по слоям (app, features, widgets, shared)
-   **Component-Based Architecture** — модульные компоненты
-   **Server-Side Rendering** — через Next.js App Router

## 📚 Документация

-   [Backend README](./backend/README.md) — документация по backend
-   [Frontend README](./frontend/README.md) — документация по frontend

## 🛠️ Разработка

**Backend:**

```bash
cd backend
npm run start:dev    # Разработка
npm run build        # Сборка
npm run lint         # Линтинг
npm run test         # Тесты
```

**Frontend:**

```bash
cd frontend
npm run dev          # Разработка
npm run build        # Сборка
npm run lint         # Линтинг
```

## 🐳 Docker

Инфраструктура (PostgreSQL, RabbitMQ) запускается через Docker Compose:

```bash
cd backend
docker-compose up -d        # Запуск
docker-compose down         # Остановка
```

-   PostgreSQL: порт 5436
-   RabbitMQ: порты 5672 (AMQP), 15672 (Management UI)

## 🔐 Безопасность

-   JWT токены для аутентификации
-   Хеширование паролей (bcrypt)
-   Валидация входных данных
-   CORS настройки
-   Guards для защиты маршрутов

## 📝 Лицензия

Проект находится в разработке.
