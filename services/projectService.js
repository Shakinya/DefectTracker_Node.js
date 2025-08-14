const db = require('../db');
const Project = db.Project;

async function getAllProjects() {
	return await Project.findAll();
}

async function getProjectById(id) {
	return await Project.findByPk(id);
}

module.exports = {
	getAllProjects,
	getProjectById,
};

