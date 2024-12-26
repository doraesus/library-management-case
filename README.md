
# Library Management System

## Overview
This project is a Library Management System designed to simulate the operations of a library. The project includes both the backend and frontend in the same repository.

## Requirements
1. Node.js: Ensure that Node.js is installed on your machine.
2. npm: Node Package Manager (npm) is installed with Node.js.
3. SQLite: The project uses SQLite as the database. Ensure that SQLite is installed on your machine. You can download it from https://www.sqlite.org/download.html
4. Dependencies: The project has dependencies listed in the package.json files for both the backend and frontend. These dependencies need to be installed using npm.
5. Git: Ensure that Git is installed on your machine for version control.
   

## Installation
Clone the repository:
```bash
git clone https://github.com/doraesus/library-management-case.git
```

### Backend

1. Navigate to the backend project directory:
    ```bash
    cd library-management-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm run dev
    ```

- Backend application runs on localhost:3000. 
- The project uses SQLite as the database.
- The seed data is defined in the library-management-backend/seeds directory and is automatically added when the backend server starts.
- The database schema and seed data are also defined in the library-management-backend/ddl directory. If you want to use another db (for example MySQL), please follow instructions:
  - Install MySQL or ensure that MySQL is installed on your machine.
  - Create a MySQL Database:
      ```bash
       mysql -u root -p
       CREATE DATABASE library_management;
      ```
  - Run the DDL Files:
    ```bash
       mysql -u root -p library_management < yourDirectory/library-management-case/library-management-backend/ddl/schema.sql
       mysql -u root -p library_management < yourDirectory/library-management-case/library-management-backend/ddl/seed.sql
    ```
  - Install MySQL Node.js Package:
      ```bash
       cd library-management-backend
       npm install mysql2
      ```
  - Update Database Configuration:
    - Update the database configuration in yourDirectory/library-management-case/library-management-backend/config/database.js to use MySQL (or however you need):
       ```bash
       const { Sequelize } = require('sequelize');
       // Initialize Sequelize with MySQL
       const sequelize = new Sequelize('library_management', 'root', 'password', {
         host: 'localhost',
         dialect: 'mysql',
         logging: false,
       });
      module.exports = sequelize;
      ```
  - Ensure the backend dependencies are installed:
     ```bash
    npm install
    ```
  - Start the backend server:
    ```bash
    npm run dev
    ```

#### Endpoints
* GET /books: Get all books.
* GET /books/:bookId: Get book details by ID.
* GET /books/:bookId/with-borrower: Get book details with borrower information.
* GET /users: Get all users.
* GET /users/eligible-borrowers: Get all eligible borrowers.
* GET /users/:userId/books: Get user details with borrowed books.
* POST /users/:userId/borrow/:bookId: Borrow a book.
* POST /users/:userId/return/:bookId: Return a book.

---


### Frontend

2. Navigate to the frontend project directory:
    ```bash
    cd library-management-frontend
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start application:
    ```bash
    npm start
    ```

Frontend application runs on localhost:9000 and listens port 3000 for backend application. 

#### Features

* View list of users and their borrowed books.
* View list of books and their details.
* Borrow and return books.

#### Demo

https://github.com/user-attachments/assets/11fcd9d9-42aa-4830-b06f-a6d7ef2a7510



