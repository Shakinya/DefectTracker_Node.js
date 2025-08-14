module.exports.up = async (sequelize) => {
  const rows = [
    { priority: 'Low', color: '#8BC34A' },
    { priority: 'Medium', color: '#FFC107' },
    { priority: 'High', color: '#FF9800' },
    { priority: 'Critical', color: '#F44336' },
  ];
  for (const row of rows) {
    await sequelize.query(
      'INSERT INTO `priority` (`priority`, `color`) VALUES (?, ?)',
      { replacements: [row.priority, row.color] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = ['Low', 'Medium', 'High', 'Critical'];
  await sequelize.query(
    `DELETE FROM \`priority\` WHERE \`priority\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

