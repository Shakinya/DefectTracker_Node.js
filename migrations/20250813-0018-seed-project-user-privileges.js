module.exports.up = async (sequelize) => {
  const entries = [
    { user_email: 'alice@example.com', project_code: 'P-2024-001', privs: ['READ','UPDATE'] },
    { user_email: 'bob@example.com', project_code: 'P-2024-002', privs: ['READ'] },
  ];

  for (const e of entries) {
    const [[user]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [e.user_email] }
    );
    if (!user) throw new Error(`User not found: ${e.user_email}`);

    const [[project]] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [e.project_code] }
    );
    if (!project) throw new Error(`Project not found: ${e.project_code}`);

    for (const pname of e.privs) {
      const [[priv]] = await sequelize.query(
        'SELECT `id` FROM `privileges` WHERE `privilege_name` = ? LIMIT 1',
        { replacements: [pname] }
      );
      if (!priv) throw new Error(`Privilege not found: ${pname}`);

      await sequelize.query(
        'INSERT INTO `project_user_privilege` (`privilege_id`, `project_id`, `user_id`) SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `project_user_privilege` WHERE `privilege_id` = ? AND `project_id` = ? AND `user_id` = ?)',
        { replacements: [priv.id, project.id, user.id, priv.id, project.id, user.id] }
      );
    }
  }
};

module.exports.down = async (sequelize) => {
  const users = ['alice@example.com', 'bob@example.com'];
  for (const u of users) {
    const [[user]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [u] }
    );
    if (user) {
      await sequelize.query('DELETE FROM `project_user_privilege` WHERE `user_id` = ?', { replacements: [user.id] });
    }
  }
};

