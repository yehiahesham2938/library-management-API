const express = require("express")
const app = express();
const port = 3000;
const {Pool} = require("pg")
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'E-Library',
    password: 'yehia',
    port: 5432,
    idleTimoutMillis: 300
})
module.exports = {pool};

app.use(express.json());

app.use((request, response, next) => {
    const token = request.headers['authorization'];
    if(token == 'Bearer ZEWAIL'){
        next();
    }else{
        response.json({message: 'Invalid Authorization Token.'});
    }
});

// app.use(BEARERZEWAIL_Middleware);

const booksRouter = require('./Routes/Books.js');
const authorsRouter = require('./Routes/Authors.js')
const usersRouter = require('./Routes/Users.js')
const TransactionsRouter = require('./Routes/Transactions.js')


app.use('/users', usersRouter
);
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/transactions', TransactionsRouter);

app.listen(port, () => {
    console.log('server is running on localhost:', port)
})

//books 5 6 7
//users 2 4 5
