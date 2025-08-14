module.exports.up = async (sequelize) => {
  const rows = [
    { module_id: 'ALPHA-AUTH', module_name: 'Authentication', project_code: 'P-2024-001' },
    { module_id: 'ALPHA-API', module_name: 'Public API', project_code: 'P-2024-001' },
    { module_id: 'BETA-CORE', module_name: 'Core', project_code: 'P-2024-002' },
  ];

  for (const r of rows) {
    const [proj] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [r.project_code] }
    );
    if (!proj || proj.length === 0) {
      throw new Error(`Project not found: ${r.project_code}`);
    }
    const projectId = proj[0].id;

    await sequelize.query(
      'INSERT INTO `modules` (`module_id`, `module_name`, `project_id`)\n' +
      'SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `modules` WHERE `module_id` = ?)',
      { replacements: [r.module_id, r.module_name, projectId, r.module_id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['ALPHA-AUTH', 'ALPHA-API', 'BETA-CORE'];
  await sequelize.query(
    `DELETE FROM \`modules\` WHERE \`module_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

