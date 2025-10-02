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

module.exports = router;
