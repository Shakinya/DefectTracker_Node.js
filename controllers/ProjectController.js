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

async function getProjectCardColors(req, res) {
  try {
    const data = await projectService.getProjectCardColors();
    return res.json({
      status: 'success',
      message: 'Retrieved successfully',
      statusCode: 2000,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

module.exports = { getAll, getById, getProjectCardColors };

