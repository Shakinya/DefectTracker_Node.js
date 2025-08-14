const db = require('../db');
const DefectType = db.DefectType;

async function getAllDefectTypes() {
  return await DefectType.findAll();
}

async function getDefectTypeById(id) {
  return await DefectType.findByPk(id);
}

async function createDefectType(data) {
  return await DefectType.create(data);
}

async function updateDefectType(id, data) {
  const found = await DefectType.findByPk(id);
  if (!found) return null;
  return await found.update(data);
}

async function deleteDefectType(id) {
  const found = await DefectType.findByPk(id);
  if (!found) return null;
  await found.destroy();
  return found;
}

module.exports = {
  getAllDefectTypes,
  getDefectTypeById,
  createDefectType,
  updateDefectType,
  deleteDefectType,
};

