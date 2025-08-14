const severityService = require('../services/severityService');

async function getAll(req, res) {
  try {
    const data = await severityService.getAllSeverities();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getById(req, res) {
  try {
    const id = req.params.id;
    const data = await severityService.getSeverityById(id);
    if (!data) {
      return res.status(404).json({ message: 'Severity not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function create(req, res) {
  try {
    const body = req.body;
    const newData = await severityService.createSeverity(body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updated = await severityService.updateSeverity(id, body);
    if (!updated) {
      return res.status(404).json({ message: 'Severity not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const deleted = await severityService.deleteSeverity(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Severity not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAll, getById, create, update, remove };

