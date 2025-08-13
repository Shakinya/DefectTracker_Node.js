const db = require('../db');
const Designation = db.Designation;

// Get all designations
async function getAllDesignations() {
  return await Designation.findAll();
}

// Get designation by ID
async function getDesignationById(id) {
  return await Designation.findByPk(id);
}

// Create a new designation
async function createDesignation(data) {
  return await Designation.create(data);
}

// Update a designation
async function updateDesignation(id, data) {
  const designation = await Designation.findByPk(id);
  if (!designation) return null;
  return await designation.update(data);
}

// Delete a designation
async function deleteDesignation(id) {
  const designation = await Designation.findByPk(id);
  if (!designation) return null;
  await designation.destroy();
  return designation;
}

module.exports = {
  getAllDesignations,
  getDesignationById,
  createDesignation,
  updateDesignation,
  deleteDesignation
};
