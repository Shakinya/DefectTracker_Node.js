module.exports.up = async (sequelize) => {
  const rows = ['Major', 'Minor', 'Patch', 'Hotfix'];
  for (const name of rows) {
    await sequelize.query(
      'INSERT INTO `release_type` (`release_type_name`) VALUES (?)',
      { replacements: [name] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const rows = ['Major', 'Minor', 'Patch', 'Hotfix'];
  await sequelize.query(
    `DELETE FROM \`release_type\` WHERE \`release_type_name\` IN (${rows.map(() => '?').join(',')})`,
    { replacements: rows }
  );
};

