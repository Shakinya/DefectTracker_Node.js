const db = require('../db');
const Severity = db.Severity;

async function getAllSeverities() {
  return await Severity.findAll();
}

async function getSeverityById(id) {
  return await Severity.findByPk(id);
}

async function createSeverity(data) {
  return await Severity.create(data);
}

async function updateSeverity(id, data) {
  const found = await Severity.findByPk(id);
  if (!found) return null;
  return await found.update(data);
}

async function deleteSeverity(id) {
  const found = await Severity.findByPk(id);
  if (!found) return null;
  await found.destroy();
  return found;
}

module.exports = {
  getAllSeverities,
  getSeverityById,
  createSeverity,
  updateSeverity,
  deleteSeverity,
};

