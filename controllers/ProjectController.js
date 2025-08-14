const projectService = require('../services/projectService');

async function getAll(req, res) {
  try {
    const data = await projectService.getAllProjects();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getById(req, res) {
  try {
    const id = req.params.id;
    const data = await projectService.getProjectById(id);
    if (!data) return res.status(404).json({ message: 'Project not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAll, getById };

