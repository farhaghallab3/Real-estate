# EstateFlow Backend

Django REST Framework API for EstateFlow, a real estate sales CRM.

## Stack

- Django + Django REST Framework
- PostgreSQL (via `django-environ`, no hardcoded credentials)
- `django-cors-headers` (allows `http://localhost:3000` by default)

## Project layout

```
backend/
├── config/            # project settings, urls, wsgi/asgi
│   └── settings/
│       ├── base.py    # shared settings
│       ├── dev.py     # local development
│       └── prod.py    # production (not yet filled in)
├── users/
├── leads/
├── properties/
├── tasks/
├── viewings/
├── deals/
├── commissions/
├── requirements.txt
├── docker-compose.yml
└── .env.example
```

## Setup

1. **Create and activate a virtual environment** (from the `backend/` folder)

   ```bash
   python -m venv venv
   # macOS/Linux
   source venv/bin/activate
   # Windows
   venv\Scripts\activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your local PostgreSQL credentials:

   ```bash
   cp .env.example .env
   ```

   Make sure a PostgreSQL database matching `DB_NAME`/`DB_USER`/`DB_PASSWORD` exists before continuing — either a local install, or the bundled Docker setup below.

   **Option: run PostgreSQL via Docker** instead of a local install:

   ```bash
   docker compose up -d
   ```

   This starts a `postgres:16-alpine` container using the `DB_NAME`/`DB_USER`/`DB_PASSWORD` from your `.env`, publishes it on `DB_PORT` (defaults to `5433`, to avoid clashing with a native Postgres install on the standard `5432`), and persists data in a named Docker volume. Stop it with `docker compose down` (add `-v` to also wipe the data volume).

4. **Run migrations**

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (for the Django admin)

   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**

   ```bash
   python manage.py runserver
   ```

   - API health check: http://127.0.0.1:8000/api/health/ → `{"status": "ok"}`
   - Admin panel: http://127.0.0.1:8000/admin/

By default `manage.py` uses `config.settings.dev`. To run against production settings, set the `DJANGO_SETTINGS_MODULE=config.settings.prod` environment variable.
