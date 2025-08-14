module.exports.up = async (sequelize) => {
  const rows = [
    { user_email: 'alice@example.com', defect_email_status: 1, module_allocation_email_status: 1, project_allocation_email_status: 0, submodule_allocation_email_status: 1 },
    { user_email: 'bob@example.com',   defect_email_status: 1, module_allocation_email_status: 0, project_allocation_email_status: 1, submodule_allocation_email_status: 0 },
  ];

  for (const r of rows) {
    const [[user]] = await sequelize.query('SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1', { replacements: [r.user_email] });
    if (!user) throw new Error(`User not found: ${r.user_email}`);

    await sequelize.query(
      'INSERT INTO `email_user` (`defect_email_status`, `module_allocation_email_status`, `project_allocation_email_status`, `submodule_allocation_email_status`, `user_id`)\n' +
      'SELECT ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `email_user` WHERE `user_id` = ?)',
      { replacements: [
        r.defect_email_status,
        r.module_allocation_email_status,
        r.project_allocation_email_status,
        r.submodule_allocation_email_status,
        user.id,
        user.id,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const users = ['alice@example.com','bob@example.com'];
  for (const u of users) {
    const [[user]] = await sequelize.query('SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1', { replacements: [u] });
    if (user) await sequelize.query('DELETE FROM `email_user` WHERE `user_id` = ?', { replacements: [user.id] });
  }
};

