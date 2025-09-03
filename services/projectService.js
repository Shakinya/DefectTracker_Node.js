const db = require('../db');
const Project = db.Project;
const defectService = require('./defectService');

async function getAllProjects() {
	return await Project.findAll();
}

async function getProjectById(id) {
	return await Project.findByPk(id);
}

async function getProjectCardColors() {
	const { sequelize } = db;
	const projects = await getAllProjects();

	const results = [];

	for (const project of projects) {
		const projectId = project.id;
		const projectName = project.project_name;

		// Check if project has any valid defects first
		const [validCountRows] = await sequelize.query(
			`SELECT COUNT(*) AS valid
			 FROM \`defect\` d
			 INNER JOIN \`defect_status\` ds ON d.\`defect_status_id\` = ds.\`id\`
			 WHERE d.\`project_id\` = :projectId
			 AND ds.\`defect_status_name\` NOT IN ('Rejected','Duplicate','Duplicated')`,
			{ replacements: { projectId } }
		);
		const validDefectCount = Number(validCountRows?.[0]?.valid || 0);

		if (validDefectCount === 0) {
			results.push({
				projectName,
				severityIndex: 'Low',
				remarkRatio: 'Low',
				densityMeter: 'Low',
				status: 'Low Risk',
				colorCode: 'Green',
			});
			continue;
		}

		// Existing services provide Low/Medium/High meanings
		const severity = await defectService.getDefectSeverityIndex(projectId);
		const density = await defectService.getDefectDensity(projectId);
		const remark = await defectService.getDefectRemarkRatio(projectId);

		// Normalize labels
		const severityLevel = (severity.meaning || '').trim(); // Low/Medium/High
		const remarkLevel = (remark.meaning || '').trim(); // Low/Medium/High
		const densityLevel = density.meaning === 'Moderate Risk' ? 'Medium'
			: density.meaning === 'High Risk' ? 'High'
			: 'Low';

		// Compute color code and status
		let colorCode = 'Green';
		let status = 'Low Risk';
		if (severityLevel === 'High' || remarkLevel === 'High' || densityLevel === 'High') {
			colorCode = 'Red';
			status = 'High Risk';
		} else if (severityLevel === 'Medium' || remarkLevel === 'Medium' || densityLevel === 'Medium') {
			colorCode = 'Yellow';
			status = 'Medium Risk';
		}

		results.push({
			projectName,
			severityIndex: severityLevel || 'Low',
			remarkRatio: remarkLevel || 'Low',
			densityMeter: densityLevel,
			status,
			colorCode,
		});
	}

	return results;
}

module.exports = {
	getAllProjects,
	getProjectById,
	getProjectCardColors,
};

