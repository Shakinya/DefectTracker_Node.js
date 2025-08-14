module.exports.up = async (sequelize) => {
  const rows = [
    { user_email: 'alice@example.com', project_code: 'P-2024-001', role_name: 'Developer', start_date: '2024-01-20 00:00:00', end_date: '2024-03-31 00:00:00', percentage: 50, status: 1 },
    { user_email: 'bob@example.com',   project_code: 'P-2024-002', role_name: 'Tester',    start_date: '2024-02-10 00:00:00', end_date: '2024-04-30 00:00:00', percentage: 75, status: 1 },
  ];

  for (const r of rows) {
    const [[user]] = await sequelize.query('SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1', { replacements: [r.user_email] });
    if (!user) throw new Error(`User not found: ${r.user_email}`);
    const [[project]] = await sequelize.query('SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1', { replacements: [r.project_code] });
    if (!project) throw new Error(`Project not found: ${r.project_code}`);
    const [[role]] = await sequelize.query('SELECT `id` FROM `Role` WHERE `role` = ? LIMIT 1', { replacements: [r.role_name] });
    if (!role) throw new Error(`Role not found: ${r.role_name}`);

    await sequelize.query(
      'INSERT INTO `project_allocation_history` (`start_date`, `end_date`, `percentage`, `status`, `project_id`, `role_id`, `user_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `project_allocation_history` WHERE `project_id` = ? AND `user_id` = ? AND `role_id` = ? AND `start_date` = ?)',
      { replacements: [
        r.start_date,
        r.end_date,
        r.percentage,
        r.status,
        project.id,
        role.id,
        user.id,
        project.id,
        user.id,
        role.id,
        r.start_date,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const rows = [
    { user_email: 'alice@example.com', project_code: 'P-2024-001' },
    { user_email: 'bob@example.com',   project_code: 'P-2024-002' },
  ];
  for (const r of rows) {
    const [[user]] = await sequelize.query('SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1', { replacements: [r.user_email] });
    const [[project]] = await sequelize.query('SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1', { replacements: [r.project_code] });
    if (user && project) {
      await sequelize.query('DELETE FROM `project_allocation_history` WHERE `project_id` = ? AND `user_id` = ?', { replacements: [project.id, user.id] });
    }
  }
};

