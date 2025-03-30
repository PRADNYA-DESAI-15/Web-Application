# Web Application with Django & ReactJS

This is a web application built using **Django** for the backend and **ReactJS** for the frontend. It includes authentication, file management, a user dashboard, and profile management.

## Features

### 🔐 Authentication
- User registration & login with email/password
- Token-based authentication using Django Rest Framework (DRF)

### 📂 File Management
- Users can upload files (PDF, Excel, TXT)
- View uploaded files in a table
- Download files

### 📊 Dashboard
- Displays total files uploaded
- Shows breakdown of file types
- Displays number of files uploaded by each user

### 👤 User Profile
- Edit username
- Add and manage multiple addresses
- Add/edit phone number

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

---

## 🖥️ Backend Setup (Django)

### 2️⃣ Create & Activate a Virtual Environment
```sh
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Linux/macOS)
venv\Scripts\activate  # Activate (Windows)
```

### 3️⃣ Install Dependencies
```sh
pip install -r requirements.txt
```

### 4️⃣ Set Up Database (MySQL)
1. Create a MySQL database.
2. Update `settings.py` with your database credentials:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'your_db_name',
        'USER': 'your_db_user',
        'PASSWORD': 'your_db_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 5️⃣ Apply Migrations
```sh
python manage.py migrate
```

### 6️⃣ Create Superuser
```sh
python manage.py createsuperuser
```

### 7️⃣ Start Django Server
```sh
python manage.py runserver
```

---

## 🎨 Frontend Setup (ReactJS)

### 8️⃣ Navigate to Frontend Directory
```sh
cd frontend
```

### 9️⃣ Install Dependencies
```sh
npm install
```

### 🔟 Start React Development Server
```sh
npm start
```

This will start the frontend on `http://localhost:3000`.

---

## 📡 API Endpoints
| Endpoint           | Method | Description |
|-------------------|--------|-------------|
| `/api/register/`  | POST   | User registration |
| `/api/login/`     | POST   | User login |
| `/api/upload/`    | POST   | Upload file |
| `/api/files/`     | GET    | List uploaded files |
| `/api/profile/`   | GET    | Get user profile |
| `/api/profile/update-username/` | PUT | Update username |
| `/api/profile/update-phone/` | PUT | Update phone number |
| `/api/profile/address/` | POST/DELETE | Add/Delete address |

---

## 🛠️ Technologies Used
- **Backend**: Django, Django Rest Framework, MySQL
- **Frontend**: ReactJS, Bootstrap, Axios
- **Authentication**: JWT (JSON Web Tokens)

---

## 🎯 Deployment Guide
### 🔹 Backend (Django)
1. Set `DEBUG = False` in `settings.py`.
2. Configure `ALLOWED_HOSTS` with your domain.
3. Run migrations and collect static files:
   ```sh
   python manage.py migrate
   python manage.py collectstatic
   ```
4. Use **Gunicorn** for production server:
   ```sh
   gunicorn backend.wsgi:application --bind 0.0.0.0:8000
   ```

### 🔹 Frontend (React)
1. Build the React app:
   ```sh
   npm run build
   ```
2. Serve using **Nginx or Apache**.

---


