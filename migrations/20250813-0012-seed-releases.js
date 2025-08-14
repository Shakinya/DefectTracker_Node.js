module.exports.up = async (sequelize) => {
  const rows = [
    { release_id: 'ALPHA-R1', release_name: 'Alpha Release 1', releasedate: '2024-04-01 00:00:00', status: 1, project_code: 'P-2024-001', release_type_name: 'Major' },
    { release_id: 'BETA-R1', release_name: 'Beta Release 1', releasedate: '2024-05-10 00:00:00', status: 1, project_code: 'P-2024-002', release_type_name: 'Minor' },
  ];

  for (const r of rows) {
    const [[project]] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [r.project_code] }
    );
    if (!project) throw new Error(`Project not found: ${r.project_code}`);
    const projectId = project.id;

    const [[rt]] = await sequelize.query(
      'SELECT `id` FROM `release_type` WHERE `release_type_name` = ? LIMIT 1',
      { replacements: [r.release_type_name] }
    );
    if (!rt) throw new Error(`Release type not found: ${r.release_type_name}`);
    const releaseTypeId = rt.id;

    await sequelize.query(
      'INSERT INTO `releases` (`release_id`, `release_name`, `releasedate`, `status`, `project_id`, `release_type_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `releases` WHERE `release_id` = ?)',
      { replacements: [r.release_id, r.release_name, r.releasedate, r.status, projectId, releaseTypeId, r.release_id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['ALPHA-R1', 'BETA-R1'];
  await sequelize.query(
    `DELETE FROM \`releases\` WHERE \`release_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

