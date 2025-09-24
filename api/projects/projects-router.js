// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

// get all projects
router.get('/', async (req, res) => {
  try {
    // DB Query
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
});

// get project by id
router.get('/:id', async (req, res) => {
  try {
    // parameter extraction
    const { id } = req.params;
    // DB Query
    const project = await Projects.get(id);
    
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    console.error('Error in GET /api/projects/:id:', error);
    res.status(500).json({ message: 'Error retrieving project', error: error.message });
  }
});


module.exports = router;

