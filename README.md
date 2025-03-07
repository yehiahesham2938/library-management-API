# library-management-API
A simple REST API built with Node.js, Express.js, and PostgreSQL for managing books, authors, users, and borrowing transactions in an e-library.

## Features
✔ Manage authors (Add, View, Update, Delete).

✔ Manage books (Add, View, Update, Delete)

✔ Manage users (Add, View, Update, Delete)

✔ Track borrowing & returning of books

## API Endpoints

#### 📚 Authors
- ```GET /authors → Get all authors```
- ``` POST /authors → Add new author```
- ```PUT /authors/:id → Update author```
- ```DELETE /authors/:id → Delete author```

#### 📖 Books
- ```GET /books → Get all books```
- ```POST /books → Add new book```
- ```PUT /books/:id → Update book```
- ```DELETE /books/:id → Delete book```

#### 👤 Users
- ```GET /users → Get all users```
- ```POST /users → Add new user```
- ```PUT /users/:id → Update user```
- ```DELETE /users/:id → Delete user```

#### 🔄 Transactions
- ``` POST /transactions/borrow → Borrow a book ```
- ```POST /transactions/return → Return a book```
