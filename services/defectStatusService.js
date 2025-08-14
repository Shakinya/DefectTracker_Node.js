const db = require('../db');
const DefectStatus = db.DefectStatus;

async function getAllDefectStatuses() {
  return await DefectStatus.findAll();
}

async function getDefectStatusById(id) {
  return await DefectStatus.findByPk(id);
}

async function createDefectStatus(data) {
  return await DefectStatus.create(data);
}

async function updateDefectStatus(id, data) {
  const found = await DefectStatus.findByPk(id);
  if (!found) return null;
  return await found.update(data);
}

async function deleteDefectStatus(id) {
  const found = await DefectStatus.findByPk(id);
  if (!found) return null;
  await found.destroy();
  return found;
}

module.exports = {
  getAllDefectStatuses,
  getDefectStatusById,
  createDefectStatus,
  updateDefectStatus,
  deleteDefectStatus,
};

