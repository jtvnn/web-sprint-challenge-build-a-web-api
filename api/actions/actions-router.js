// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

// get all actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.error('Error in GET /api/actions:', error);
    res.status(500).json({ message: 'Error retrieving actions', error: error.message });
  }
});

// get action by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    console.error('Error in GET /api/actions/:id:', error);
    res.status(500).json({ message: 'Error retrieving action', error: error.message });
  }
});

module.exports = router;
