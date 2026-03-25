# 🚀 JWT Web Application

A full-stack web application built using **Django (backend)** and **React (frontend)**, featuring **JWT authentication**, **PostgreSQL database**, and **Redux** for global state management. The project includes both **user** and **admin** functionalities and is fully **Dockerized** for easy setup and execution.

---

## 🧰 Tech Stack

* **Backend:** Django, Django REST Framework
* **Frontend:** React (Vite), Redux
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)
* **Containerization:** Docker, Docker Compose

---

## ✨ Features

### 👤 User Features

* User registration and login using JWT authentication
* Home page with navigation
* Profile page with profile image upload

### 🛠️ Admin Features

* Admin login
* View and search users
* Create, update, and delete users

---

## 📦 Prerequisites

Make sure you have installed:

* Docker
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## ⚙️ Installation & Setup (Docker)

### 1. Clone the repository

```bash
git clone https://github.com/rahilaaaa/admin_management
cd admin_management
```

---

### 2. Create `.env` file

Create a `.env` file inside:

```
backend/sample_jwt/
```

Add the following:

```env
DEBUG=True
SECRET_KEY=your_secret_key

DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

---

### 3. Run the project

```bash
docker compose up --build
```

This will start:

* Backend (Django)
* Frontend (React - Vite)
* Database (PostgreSQL)

---

### 4. Apply migrations

Wait **10–15 seconds** for containers to fully start, then run:

```bash
docker compose exec backend python manage.py migrate
```

---

### 5. Create superuser (Admin)

```bash
docker compose exec backend python manage.py createsuperuser
```

---

## 🌐 Access the Application

* **Frontend:** http://localhost:5173
* **Backend API:** http://localhost:8000

---

---

## 📑 API Documentation

Interactive API documentation is available using Swagger UI.

### 🔗 Swagger UI
http://localhost:8000/api/docs/

### 🔗 OpenAPI Schema
http://localhost:8000/api/schema/

### 📌 Features
- View all available API endpoints
- Test APIs directly from the browser
- See request/response formats
- Supports JWT authentication

### 🔐 Authentication
To access protected endpoints:

1. Obtain JWT token from login API
2. Click **Authorize** in Swagger UI
3. Enter token in this format:


## 🛑 Stop the Application

```bash
docker compose down
```

---

## 📁 Project Structure

```
admin_management/
├── backend/
│   ├── sample_jwt/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 📌 Notes

* Do NOT use `localhost` inside Docker containers — use service names like `db`
* Frontend is powered by **Vite** (default port: 5173)
* Media files are stored in:

```
backend/sample_jwt/media/
```

---

## 🐞 Troubleshooting

### Port already in use

Change ports in `docker-compose.yml` or stop the running service.

---

### Backend not connecting to database

Ensure:

```python
DB_HOST = "db"
```

---

### Containers not starting

Check logs:

```bash
docker compose logs
```

---

## 🚀 Future Improvements

* Add Nginx for production deployment
* Implement CI/CD pipeline
* Deploy to AWS (EC2 / Docker)


---

## 👨‍💻 Author

**Rahila MK**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
