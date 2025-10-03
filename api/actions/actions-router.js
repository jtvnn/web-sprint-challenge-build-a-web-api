// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');

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

// create new action
router.post('/', async (req, res) => {
  try {
    const { project_id, description, notes, completed } = req.body;
    
    // Validate required fields
    if (!project_id || !description || !notes) {
      return res.status(400).json({ 
        message: 'Missing required fields: project_id, description, and notes are required' 
      });
    }
    
    // Validate description length
    if (description.length > 128) {
      return res.status(400).json({ 
        message: 'Description must be 128 characters or less' 
      });
    }
    
    // Validate that project_id belongs to an existing project
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(400).json({ 
        message: 'Invalid project_id: project does not exist' 
      });
    }
    
    // Create action object
    const newAction = {
      project_id,
      description,
      notes,
      completed: completed || false
    };
    
    // DB Query to insert
    const action = await Actions.insert(newAction);
    res.status(201).json(action);
  } catch (error) {
    console.error('Error in POST /api/actions:', error);
    res.status(500).json({ message: 'Error creating action', error: error.message });
  }
});

module.exports = router;
