module.exports.up = async (sequelize) => {
  const mappings = [
    { role: 'Admin', privs: ['CREATE','READ','UPDATE','DELETE','ALLOCATE_MODULE','MANAGE_USERS'] },
    { role: 'Manager', privs: ['CREATE','READ','UPDATE','ALLOCATE_MODULE'] },
    { role: 'Developer', privs: ['READ','UPDATE'] },
    { role: 'Tester', privs: ['READ'] },
  ];

  for (const map of mappings) {
    const [[role]] = await sequelize.query(
      'SELECT `id` FROM `Role` WHERE `role` = ? LIMIT 1',
      { replacements: [map.role] }
    );
    if (!role) throw new Error(`Role not found: ${map.role}`);

    for (const p of map.privs) {
      const [[priv]] = await sequelize.query(
        'SELECT `id` FROM `privileges` WHERE `privilege_name` = ? LIMIT 1',
        { replacements: [p] }
      );
      if (!priv) throw new Error(`Privilege not found: ${p}`);

      await sequelize.query(
        'INSERT INTO `group_privilege` (`privilege_id`, `role_id`) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `group_privilege` WHERE `privilege_id` = ? AND `role_id` = ?)',
        { replacements: [priv.id, role.id, priv.id, role.id] }
      );
    }
  }
};

module.exports.down = async (sequelize) => {
  // Remove all rows we added by roles
  const roles = ['Admin','Manager','Developer','Tester'];
  for (const r of roles) {
    const [[role]] = await sequelize.query(
      'SELECT `id` FROM `Role` WHERE `role` = ? LIMIT 1',
      { replacements: [r] }
    );
    if (role) {
      await sequelize.query('DELETE FROM `group_privilege` WHERE `role_id` = ?', { replacements: [role.id] });
    }
  }
};

