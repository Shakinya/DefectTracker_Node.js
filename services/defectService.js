const db = require('../db');

async function getDefectSeverityIndex(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for severity index calculation.');
    }

    // Count only valid defects (exclude rejected and duplicate/duplicated statuses)
    const [breakdown] = await sequelize.query(
        'SELECT s.`id`, s.`severity_name` AS severity, s.`weight` AS weight, COUNT(d.`id`) AS defect_count '
        + 'FROM `severity` s '
        + 'LEFT JOIN `defect` d ON d.`severity_id` = s.`id` AND d.`project_id` = :projectId '
        + 'LEFT JOIN `defect_status` ds ON d.`defect_status_id` = ds.`id` '
        + 'WHERE (d.`id` IS NULL OR ds.`defect_status_name` NOT IN (\'Rejected\', \'Duplicate\', \'Duplicated\')) '
        + 'GROUP BY s.`id`, s.`severity_name`, s.`weight` ',
        { replacements: { projectId } }
    );

    const totalCount = breakdown.reduce((sum, r) => sum + Number(r.defect_count || 0), 0);
    const weightedSum = breakdown.reduce((sum, r) => sum + Number(r.weight || 0) * Number(r.defect_count || 0), 0);
    const maxWeight = breakdown.reduce((m, r) => Math.max(m, Number(r.weight || 0)), 0);

    const severityIndex = totalCount === 0 ? 0 : weightedSum / totalCount;
    const severityIndexPct = totalCount === 0 || maxWeight === 0 ? 0 : (weightedSum / (maxWeight * totalCount)) * 100;

    // Color coding for DSI percentage
    let dsiColor = 'Green';
    let dsiMeaning = 'Low';
    let dsiRange = '<25%';
    if (severityIndexPct >= 50) {
        dsiColor = 'Red';
        dsiMeaning = 'High';
        dsiRange = '>=50%';
    } else if (severityIndexPct >= 25) {
        dsiColor = 'Yellow';
        dsiMeaning = 'Medium';
        dsiRange = '25%–<50%';
    }

    return {
        projectId: projectId,
        severityIndex,
        severityIndexPct,
        color: dsiColor,
        meaning: dsiMeaning,
        range: dsiRange,
        totalDefects: totalCount,
        breakdown: breakdown.map(r => ({
            severity: r.severity,
            weight: Number(r.weight),
            defectCount: Number(r.defect_count),
        })),
    };
}

async function getDefectDensity(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for defect density calculation.');
    }

    const [projectRows] = await sequelize.query(
        'SELECT `project_name`, `client_name`, `kloc` FROM `project` WHERE `id` = ? LIMIT 1',
        { replacements: [projectId] }
    );

    if (!projectRows || projectRows.length === 0) {
        throw new Error(`Project with ID ${projectId} not found.`);
    }

    const project = projectRows[0];
    const kloc = Number(project.kloc || 0);

    // Count only valid defects (exclude rejected and duplicate/duplicated statuses)
    const [defectCountRows] = await sequelize.query(
        `SELECT COUNT(*) AS total_defects 
         FROM \`defect\` d
         INNER JOIN \`defect_status\` ds ON d.\`defect_status_id\` = ds.\`id\`
         WHERE d.\`project_id\` = ? 
         AND ds.\`defect_status_name\` NOT IN ('Rejected', 'Duplicate', 'Duplicated')`,
        { replacements: [projectId] }
    );

    const totalDefects = Number(defectCountRows[0].total_defects || 0);

    let defectDensity = 0;
    if (kloc > 0) {
        defectDensity = totalDefects / kloc;
    }

    let color = "Green";
    let meaning = "Low Risk";
    let range = "0-7.0";

    if (defectDensity > 7 && defectDensity <= 10) {
        color = "Yellow";
        meaning = "Moderate Risk";
        range = "7.0-10.0";
    } else if (defectDensity > 10) {
        color = "Red";
        meaning = "High Risk";
        range = "Above 10.0";
    }

    return {
        defects: totalDefects,
        projectId: projectId,
        defectDensity: parseFloat(defectDensity.toFixed(2)),
        color,
        meaning,
        range,
        projectName: project.project_name,
        clientName: project.client_name,
        kloc: parseFloat(kloc.toFixed(2))
    };
}

// module.exports = {
//     getDefectSeverityIndex,
//     getDefectDensity,
// };

async function getDefectRemarkRatio(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for defect remark ratio calculation.');
    }

    // Total defects (all statuses)
    const [totalRows] = await sequelize.query(
        'SELECT COUNT(*) AS total FROM `defect` WHERE `project_id` = ?',
        { replacements: [projectId] }
    );
    const totalDefects = Number(totalRows[0]?.total || 0);

    // Valid defects (exclude rejected and duplicate/duplicated)
    const [validRows] = await sequelize.query(
        `SELECT COUNT(*) AS valid
         FROM \`defect\` d
         INNER JOIN \`defect_status\` ds ON d.\`defect_status_id\` = ds.\`id\`
         WHERE d.\`project_id\` = ?
         AND ds.\`defect_status_name\` NOT IN ('Rejected','Duplicate','Duplicated')`,
        { replacements: [projectId] }
    );
    const validDefects = Number(validRows[0]?.valid || 0);

    const ratioPct = totalDefects === 0 ? 0 : (validDefects / totalDefects) * 100;

    // Color coding for Defect to Remark Ratio
    let color = 'Red';
    let meaning = 'High';
    let range = '<90%';
    if (ratioPct >= 98) {
        color = 'Green';
        meaning = 'Low';
        range = '98%–100%';
    } else if (ratioPct >= 90) {
        color = 'Yellow';
        meaning = 'Medium';
        range = '90%–<98%';
    }

    return {
        projectId: Number(projectId),
        totalDefects,
        validDefects,
        ratioPct: Number(ratioPct.toFixed(2)),
        color,
        meaning,
        range,
    };
}

module.exports = {
    getDefectSeverityIndex,
    getDefectDensity,
    getDefectRemarkRatio,
};


// module.exports.getDefectRemarkRatio = getDefectRemarkRatio;

