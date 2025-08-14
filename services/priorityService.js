const db = require('../db');
const Priority = db.Priority;

async function getAllPriorities() {
  return await Priority.findAll();
}

async function getPriorityById(id) {
  return await Priority.findByPk(id);
}

async function createPriority(data) {
  return await Priority.create(data);
}

async function updatePriority(id, data) {
  const found = await Priority.findByPk(id);
  if (!found) return null;
  return await found.update(data);
}

async function deletePriority(id) {
  const found = await Priority.findByPk(id);
  if (!found) return null;
  await found.destroy();
  return found;
}

module.exports = {
  getAllPriorities,
  getPriorityById,
  createPriority,
  updatePriority,
  deletePriority,
};

