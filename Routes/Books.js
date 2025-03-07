const express = require('express');
const router = express.Router();
const{pool} = require('../index')



// API For Books Creation
router.post('/', async(request, response) => {
    const{title, authorID, available } = request.body;
    try{
       const query = await pool.query(
        'INSERT INTO books (title, author_id, available) Values ($1, $2, $3) Returning *',
        [title, authorID, available === undefined ? true : available]
       );
       response.json({message: 'Books added Successfully.'})
    }catch(error){
        response.status(500).json({message: 'Failed to Add Book', error: error.message});
    }
});

// API For books Retrieving
router.get('/', async(request, response)=>{
    try{
        const query = await pool.query('SELECT * from books');
        response.json(query.rows);
        if(query.rows.length ===0 ) return response.status(404).json({message: 'Books not found'});

    }catch(error){
        response.status(500).json({message: 'Failed to Get Books', error: error.message});

    }
    
});

// API for Updating Books
router.put('/:id', async(request, response) => {
    const{ title, authorID, available} = request.body;
    try{
        const query = await pool.query('UPDATE books set title = $1, author_id = $2, available = $3 WHERE id = $4 Returning *',
            [title, authorID, available, request.params.id]
        );
        if(query.rows.length ===0 ) return response.status(404).json({message: 'Books not found'});
        response.status(200).json(query.rows[0]);
    }catch(error){
        response.status(500).json({message: 'Failed to UPdate Book', error: error.message});

    }
});


// API For Book Deletion
router.delete('/:id', async (request, response)=> {
    try{
        const query = await pool.query('DELETE FROM books Where id = $1 RETURNING *', [request.params.id]);
        if(query.rows.length === 0){
            return response.status(404).json({message: 'Book Not Found'});
        }
        // response.status(204).send();
        response.json({message: 'Books deleted Successfully.'})

    }catch (error){
        response.status(500).json({message: 'Failed to Delete Book', error: error.message});

    }
});
module.exports = router;