# ⚡ VOLT — Магазин техники

## Быстрый старт

### 1. База данных (PostgreSQL)
```sql
CREATE DATABASE online_store;
```

### 2. Сервер
Открой `server/.env` и заполни свои данные:
```
PORT=8000
DB_NAME=online_store
DB_USER=postgres
DB_PASSWORD=твой_пароль
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=любая_секретная_строка
```
Затем:
```bash
cd server
npm install
npm run dev
```

### 3. Клиент
Открой `client/.env` — по умолчанию уже настроен на localhost:
```
VITE_API_URL=http://localhost:8000/
```
Затем:
```bash
cd client
npm install
npm run dev
```

Открывай http://localhost:5173 🚀

## Структура
```
volt/
├── client/   ← React + Vite + MobX (фронт)
└── server/   ← Node.js + Express + PostgreSQL (бэк)
```
