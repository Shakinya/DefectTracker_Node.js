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

async function getDefectDistributionByType(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for defect distribution calculation.');
    }

    // Get defect distribution by type, excluding rejected and duplicate/duplicated statuses
    const [defectTypeStats] = await sequelize.query(
        `SELECT 
            dt.defect_type_name AS defectType,
            COUNT(d.id) AS defectCount
         FROM defect_type dt
         LEFT JOIN defect d ON d.type_id = dt.id 
            AND d.project_id = :projectId
         LEFT JOIN defect_status ds ON d.defect_status_id = ds.id
         WHERE (d.id IS NULL OR ds.defect_status_name NOT IN ('Rejected', 'Duplicate', 'Duplicated'))
         GROUP BY dt.id, dt.defect_type_name
         HAVING defectCount > 0
         ORDER BY defectCount DESC`,
        { replacements: { projectId } }
    );

    // Calculate total defect count
    const totalDefectCount = defectTypeStats.reduce((sum, item) => sum + Number(item.defectCount), 0);

    // Calculate percentages and find most common defect type
    let mostCommonDefectType = null;
    let mostCommonDefectCount = 0;

    const defectTypes = defectTypeStats.map(item => {
        const defectCount = Number(item.defectCount);
        const percentage = totalDefectCount === 0 ? 0 : (defectCount / totalDefectCount) * 100;

        // Track most common defect type
        if (defectCount > mostCommonDefectCount) {
            mostCommonDefectCount = defectCount;
            mostCommonDefectType = item.defectType;
        }

        return {
            defectType: item.defectType,
            defectCount: defectCount,
            percentage: parseFloat(percentage.toFixed(1))
        };
    });

    return {
        defectTypes,
        totalDefectCount,
        mostCommonDefectType,
        mostCommonDefectCount
    };
}

async function getDefectCountByModule(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for defect count by module calculation.');
    }

    // Get defect count by module, excluding rejected and duplicate/duplicated statuses
    const [moduleStats] = await sequelize.query(
        `SELECT 
            m.id AS moduleId,
            m.module_name AS name,
            COUNT(d.id) AS value
         FROM modules m
         LEFT JOIN defect d ON d.modules_id = m.id 
            AND d.project_id = :projectId
         LEFT JOIN defect_status ds ON d.defect_status_id = ds.id
         WHERE m.project_id = :projectId
         AND (d.id IS NULL OR ds.defect_status_name NOT IN ('Rejected', 'Duplicate', 'Duplicated'))
         GROUP BY m.id, m.module_name
         HAVING value > 0
         ORDER BY value DESC`,
        { replacements: { projectId } }
    );

    // Calculate total defect count
    const totalDefectCount = moduleStats.reduce((sum, item) => sum + Number(item.value), 0);

    // Calculate percentages
    const moduleData = moduleStats.map(item => {
        const defectCount = Number(item.value);
        const percentage = totalDefectCount === 0 ? 0 : (defectCount / totalDefectCount) * 100;

        return {
            moduleId: Number(item.moduleId),
            name: item.name,
            value: defectCount,
            percentage: parseFloat(percentage.toFixed(2))
        };
    });

    return moduleData;
}

async function getDefectSeverityBreakdown(projectId) {
    const { sequelize } = db;

    if (!projectId) {
        throw new Error('Project ID is required for defect severity breakdown.');
    }

    // Project metadata
    const [projectRows] = await sequelize.query(
        'SELECT `project_name` FROM `project` WHERE `id` = ? LIMIT 1',
        { replacements: [projectId] }
    );
    const projectName = projectRows?.[0]?.project_name || '';

    // Totals for all defects (including rejected/duplicate/duplicated)
    const [totalRows] = await sequelize.query(
        `SELECT COUNT(*) AS total
         FROM \`defect\`
         WHERE \`project_id\` = ?`,
        { replacements: [projectId] }
    );
    const totalDefects = Number(totalRows?.[0]?.total || 0);

    // Breakdown by severity and status (include all statuses)
    const [rows] = await sequelize.query(
        `SELECT 
            s.severity_name AS severity,
            s.severity_color AS severityColor,
            ds.defect_status_name AS statusName,
            ds.color_code AS statusColor,
            COUNT(d.id) AS count
         FROM severity s
         LEFT JOIN defect d ON d.severity_id = s.id AND d.project_id = :projectId
         LEFT JOIN defect_status ds ON d.defect_status_id = ds.id
         GROUP BY s.id, s.severity_name, s.severity_color, ds.defect_status_name, ds.color_code
         HAVING count > 0
         ORDER BY s.id, count DESC`,
        { replacements: { projectId } }
    );

    const bySeverity = new Map();
    for (const r of rows) {
        const sev = r.severity || 'Unknown';
        const statusName = r.statusName || 'Unknown';
        const count = Number(r.count || 0);

        if (!bySeverity.has(sev)) {
            bySeverity.set(sev, { severity: sev, severityColor: r.severityColor || 'Gray', total: 0, statuses: [] });
        }
        const item = bySeverity.get(sev);
        item.total += count;
        item.statuses.push({ name: statusName, value: count, color: r.statusColor || 'Gray' });
    }

    const defectSummary = Array.from(bySeverity.values());

    return {
        projectId: Number(projectId),
        projectName,
        totalDefects,
        defectSummary,
    };
}

module.exports = {
    getDefectSeverityIndex,
    getDefectDensity,
    getDefectRemarkRatio,
    getDefectDistributionByType,
    getDefectCountByModule,
    getDefectSeverityBreakdown,
};


// module.exports.getDefectRemarkRatio = getDefectRemarkRatio;

