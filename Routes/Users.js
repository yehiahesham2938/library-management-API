const express = require('express')
const router = express.Router();
const { pool } = require('../index');


//Create New USER
router.post('/', async (request, response) => {
    const { username, password } = request.body;
    try {
      const query = await pool.query(
        'INSERT INTO users (username, pass) VALUES ($1, $2) RETURNING *',
        [username, password]
      );
      response.status(201).json(query.rows[0]);
    } catch (error) {
      response.status(500).json({ message: 'Failed to add user', error: error.message });
    }
  });


  //Fetch all users
  router.get('/', async (request, response) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      response.json(result.rows);
    } catch (error) {
      response.status(500).json({ message: 'Failed to retrieve users', error: error.message });
    }
  });

  // Update user
router.put('/:id', async (request, response) => {
    const { username, password } = request.body;
    try {
      const result = await pool.query(
        'UPDATE users SET username = $1, pass = $2 WHERE id = $3 RETURNING *',
        [username, password, request.params.id]
      );
      if (result.rows.length === 0){
        return response.status(404).json({ message: 'User not found' });
      } response.json(result.rows[0]);
    } catch (error) {
      response.status(500).json({ message: 'Failed to update user', error: error.message });
    }
  });

// Delete user
router.delete('/:id', async (request, response) => {
    try {
      const result = await pool.query(
        'DELETE FROM users Where id = $1 RETURNING *',
        [request.params.id]
      );
      if (result.rows.length === 0)
        {
            return response.status(404).json({ message: 'User not found' });
      
        } 
        response.json({message: 'User deleted Successfully.'})
    } catch (err) {
      response.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
  });
  
  module.exports = router;