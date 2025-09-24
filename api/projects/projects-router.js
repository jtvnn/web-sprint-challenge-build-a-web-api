// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const router = express.Router();

// get all projects
router.get("/", async (req, res) => {
  try {
    // DB query
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in GET /api/projects:", error);
    res
      .status(500)
      .json({ message: "Error retrieving projects", error: error.message });
  }
});

// get project by id
router.get("/:id", async (req, res) => {
  try {
    // parameter extraction
    const { id } = req.params;
    // DB query
    const project = await Projects.get(id);

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    console.error("Error in GET /api/projects/:id:", error);
    res
      .status(500)
      .json({ message: "Error retrieving project", error: error.message });
  }
});

// create new project
router.post("/", async (req, res) => {
  try {
    const { name, description, completed } = req.body;

    // validate required fields
    if (!name || !description) {
      return res.status(400).json({
        message: "Missing required fields: name and description are required",
      });
    }

    const newProject = {
      name,
      description,
      completed: completed || false,
    };

    // DB query
    const project = await Projects.insert(newProject);
    res.status(201).json(project);
  } catch (error) {
    console.error("Error in POST /api/projects:", error);
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
});


module.exports = router;
