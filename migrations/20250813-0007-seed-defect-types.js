module.exports.up = async (sequelize) => {
  const rows = ['Bug', 'Improvement', 'Task', 'Epic', 'UI'];
  for (const name of rows) {
    await sequelize.query(
      'INSERT INTO `defect_type` (`defect_type_name`) VALUES (?)',
      { replacements: [name] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const rows = ['Bug', 'Improvement', 'Task', 'Epic', 'UI'];
  await sequelize.query(
    `DELETE FROM \`defect_type\` WHERE \`defect_type_name\` IN (${rows.map(() => '?').join(',')})`,
    { replacements: rows }
  );
};

