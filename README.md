# Sistema Backend y Frontend

Aplicación web para la gestión de Modalidades y Carreras, desarrollada con Django REST Framework en el backend y React en el frontend.

---

## Requisitos previos

Antes de iniciar, asegúrese de tener instalado:

- Python 3.9 o superior  
- Node.js 18 o superior  
- npm  
- Git  

---

## Instalación del proyecto

### Backend (Django REST Framework)

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd backend
```

Windows
```
python -m venv venv
venv\Scripts\activate
```

Linux/Mac
```
python3 -m venv venv
source venv/bin/activate
```

Instalar dependencias
```
pip install -r requirements.txt
```

Ejecutar migraciones:
```
python manage.py makemigrations
python manage.py migrate
```
Ejecutar el servidor:
```
python manage.py runserver
```

El servidor de backend estara encendido en:

http://127.0.0.1:8000/

Configuración de la API

URL base de la API:

http://127.0.0.1:8000/api/


Ejemplos de endpoints:

http://localhost:8000/api/v1_0_0/carreras/

http://localhost:8000/api/v1_0_0/modalidades/

La API soporta:

CRUD completo

Filtros por estado y modalidad

Búsqueda por nombre

### Frontend (React)

Ir a la carpeta del frontend:
```
cd proyecto
```

Instalar dependencias:
```
npm install
```

Ejecutar la aplicación:
```
npm run dev
```

El frontend estará disponible en:

http://localhost:5173/


## Tecnologías utilizadas
### Backend

Python

Django

Django REST Framework

Django Filter

SQLite

### Frontend

React

Vite

Bootstrap

Axios
