module.exports.up = async (sequelize) => {
  const roles = ['Admin', 'Manager', 'Developer', 'Tester'];
  for (const role of roles) {
    await sequelize.query(
      'INSERT INTO `Role` (`role`) VALUES (?)',
      { replacements: [role] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const roles = ['Admin', 'Manager', 'Developer', 'Tester'];
  await sequelize.query(
    `DELETE FROM \`Role\` WHERE \`role\` IN (${roles.map(() => '?').join(',')})`,
    { replacements: roles }
  );
};

