const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// Add Author
router.post('/', async (request, response) => {
  const { name } = request.body;
  try {
    const query = await pool.query('INSERT INTO authors (name) VALUES ($1) RETURNING *', [name]);
    response.status(201).json(query.rows[0]);
  } catch (error) {
    response.status(500).json({ message: 'Failed to create author', error: error.message });
  }
});

// Get all authors
router.get('/', async (request,response) => {
    try {
      const query = await pool.query('SELECT * FROM authors');
      response.json(query.rows);
    } catch (error) {
      response.status(500).json({ message: 'Failed to retrieve authors', error: error.message });
    }
  });
  
  // Update author
router.put('/:id', async (request, response) => {
    const {name} = request.body;
    try {      const query = await pool.query(
        'UPDATE authors SET name = $1 WHERE id = $2 RETURNING *',
        [name, request.params.id]
      );
      if (query.rows.length === 0)
        {
        return response.status(404).json({ message: 'Author not found' });
      } response.json(query.rows[0]);
    } 
    catch (error) {
      response.status(500).json({ message: 'Failed to update author', error: error.message });
    }
  });
  
  // Delete author
  router.delete('/:id', async (request, response) => {
    try {
      const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [request.params.id]);
      if (result.rows.length === 0) return response.status(404).json({ message: 'Author not found' });
    response.json({message: 'Author deleted Successfully.'})
    } catch (error) {
      response.status(500).json({ message: 'Failed to delete author', error: error.message });
    }
  });
  
  module.exports = router;