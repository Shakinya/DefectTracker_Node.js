const db = require('../db');
const ReleaseType = db.ReleaseType;

async function getAllReleaseTypes() {
  return await ReleaseType.findAll();
}

async function getReleaseTypeById(id) {
  return await ReleaseType.findByPk(id);
}

async function createReleaseType(data) {
  return await ReleaseType.create(data);
}

async function updateReleaseType(id, data) {
  const found = await ReleaseType.findByPk(id);
  if (!found) return null;
  return await found.update(data);
}

async function deleteReleaseType(id) {
  const found = await ReleaseType.findByPk(id);
  if (!found) return null;
  await found.destroy();
  return found;
}

module.exports = {
  getAllReleaseTypes,
  getReleaseTypeById,
  createReleaseType,
  updateReleaseType,
  deleteReleaseType,
};

