# REGISTER APP BACKEND

## Run app in local
### 1. Clone github repository:
```bash
git clone https://github.com/nqq203/jwt-authentication-backend.git
```

### 2.Create an .env file with these content in root folder
```bash
NODE_ENV=production
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

### 3. Install dependencies
```bash
npm install
```

### 4. Initialize databse and dummy data
```bash
cd ./src/db
psql -U postgres -f init_db.sql
--- Enter your postgres pgAdmin password
node ./data_insertion.js
--- Insert data with encrypt password
```

### 5. Run project locally 
```bash
npm run start
```

## Run app local using docker container
- Open docker desktop for windows or start docker in linux
- Change the DB_HOST in .env into "db". Example: DB_HOST=db
```bash
docker-compose up -d --build
```