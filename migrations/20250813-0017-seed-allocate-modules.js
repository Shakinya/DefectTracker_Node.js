module.exports.up = async (sequelize) => {
  const rows = [
    { user_email: 'alice@example.com', project_code: 'P-2024-001', module_code: 'ALPHA-AUTH', sub_module_code: 'AUTH-LOGIN' },
    { user_email: 'alice@example.com', project_code: 'P-2024-001', module_code: 'ALPHA-API',  sub_module_code: 'API-ORDERS' },
    { user_email: 'bob@example.com',   project_code: 'P-2024-002', module_code: 'BETA-CORE',  sub_module_code: 'BETA-CORE-MAIN' },
  ];

  for (const r of rows) {
    const [[user]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [r.user_email] }
    );
    if (!user) throw new Error(`User not found: ${r.user_email}`);

    const [[project]] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [r.project_code] }
    );
    if (!project) throw new Error(`Project not found: ${r.project_code}`);

    const [[module]] = await sequelize.query(
      'SELECT `id` FROM `modules` WHERE `module_id` = ? LIMIT 1',
      { replacements: [r.module_code] }
    );
    if (!module) throw new Error(`Module not found: ${r.module_code}`);

    let submoduleId = null;
    if (r.sub_module_code) {
      const [[submodule]] = await sequelize.query(
        'SELECT `id` FROM `sub_module` WHERE `sub_module_id` = ? LIMIT 1',
        { replacements: [r.sub_module_code] }
      );
      if (!submodule) throw new Error(`SubModule not found: ${r.sub_module_code}`);
      submoduleId = submodule.id;
    }

    await sequelize.query(
      'INSERT INTO `allocate_module` (`modules_id`, `project_id`, `sub_module_id`, `user_id`)\n' +
      'SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `allocate_module` WHERE `modules_id` = ? AND `project_id` = ? AND `sub_module_id` = ? AND `user_id` = ?)',
      { replacements: [module.id, project.id, submoduleId, user.id, module.id, project.id, submoduleId, user.id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const users = ['alice@example.com','bob@example.com'];
  for (const u of users) {
    const [[user]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [u] }
    );
    if (user) {
      await sequelize.query('DELETE FROM `allocate_module` WHERE `user_id` = ?', { replacements: [user.id] });
    }
  }
};

