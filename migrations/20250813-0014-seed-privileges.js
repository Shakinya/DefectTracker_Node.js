module.exports.up = async (sequelize) => {
  const names = [
    'CREATE',
    'READ',
    'UPDATE',
    'DELETE',
    'ALLOCATE_MODULE',
    'MANAGE_USERS',
  ];
  for (const name of names) {
    await sequelize.query(
      'INSERT INTO `privileges` (`privilege_name`) SELECT ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `privileges` WHERE `privilege_name` = ?)',
      { replacements: [name, name] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = ['CREATE','READ','UPDATE','DELETE','ALLOCATE_MODULE','MANAGE_USERS'];
  await sequelize.query(
    `DELETE FROM \`privileges\` WHERE \`privilege_name\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

