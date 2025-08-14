module.exports.up = async (sequelize) => {
  const rows = [
    { severity_name: 'Trivial', severity_color: '#9E9E9E', weight: 1 },
    { severity_name: 'Minor', severity_color: '#8BC34A', weight: 2 },
    { severity_name: 'Major', severity_color: '#FFC107', weight: 3 },
    { severity_name: 'Critical', severity_color: '#F44336', weight: 4 },
  ];
  for (const row of rows) {
    await sequelize.query(
      'INSERT INTO `severity` (`severity_name`, `severity_color`, `weight`) VALUES (?, ?, ?)',
      { replacements: [row.severity_name, row.severity_color, row.weight] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = ['Trivial', 'Minor', 'Major', 'Critical'];
  await sequelize.query(
    `DELETE FROM \`severity\` WHERE \`severity_name\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

