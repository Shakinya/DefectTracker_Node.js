const designationService = require('../services/designationService');

// GET /api/designations
async function getAll(req, res) {
  try {
    const data = await designationService.getAllDesignations();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /api/designations/:id
async function getById(req, res) {
  try {
    const id = req.params.id;
    const data = await designationService.getDesignationById(id);
    if (!data) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST /api/designations
async function create(req, res) {
  try {
    const body = req.body;
    const newData = await designationService.createDesignation(body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// PUT /api/designations/:id
async function update(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updated = await designationService.updateDesignation(id, body);
    if (!updated) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE /api/designations/:id
async function remove(req, res) {
  try {
    const id = req.params.id;
    const deleted = await designationService.deleteDesignation(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
