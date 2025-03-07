const express = require('express');
const router = express.Router();
const { pool } = require('../index');

//Borrow Book API  Transaction
router.post('/borrow', async(request, response)=> {
    const {userID, BookID} = request.body;
    try{
        const query = await pool.query('SELECT * FROM books Where id = $1', [BookID]);
        const book = query.rows[0];
        if(!book)
        {
            return response.status(404).json({message: 'book not found'});
            
        }
        if(!book.available){
            return response.status(400).json({message: 'Book is already borrowed before'});

        }
        await pool.query('UPDATE books Set available = false Where id = $1',
             [BookID]);

    
    const Transaction = await pool.query('INSERT INTO transactions(user_id, book_id, action) Values ($1, $2, $3) RETURNING *',
        [userID, BookID, 'borrowed']
    );
    response.status(201).json(Transaction.rows[0]);
    }catch(error){
        response.status(500).json({message: 'Error Borrowing Book', error: error.message});
    }
});


//return Book transaction
router.post('/return', async  (request, response)=> {
    const {userID, BookID} = request.body;
    try{
        const query = await pool.query('Select * from books where id = $1',
            [BookID]
        );
        const book = query.rows[0];
        if(!book)
        {
            return response.status(404).json({message: 'Book Not Found'});
        }
        if(book.available){
            return response.status(400).json({message: 'Book was not borrowed'});

        }
        await pool.query('update books SET available = true WHERE id = $1',
            [BookID]
        );
        const transaction = await pool.query('INSERT INTO transactions (user_id, book_id, action) VALUES ($1, $2, $3) Returning *',
            [userID, BookID, 'returned']
        );
        response.status(201).json(transaction.rows[0]);


    }
    catch(error){
        response.status(500).json({message: 'error returning book', error: error.message});
    }
});


module.exports = router;