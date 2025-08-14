module.exports.up = async (sequelize) => {
  const rows = [
    { defect_status_name: 'Open', color_code: '#F44336' },
    { defect_status_name: 'In Progress', color_code: '#FFC107' },
    { defect_status_name: 'Resolved', color_code: '#4CAF50' },
    { defect_status_name: 'Closed', color_code: '#9E9E9E' },
  ];
  for (const row of rows) {
    await sequelize.query(
      'INSERT INTO `defect_status` (`defect_status_name`, `color_code`) VALUES (?, ?)',
      { replacements: [row.defect_status_name, row.color_code] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = ['Open', 'In Progress', 'Resolved', 'Closed'];
  await sequelize.query(
    `DELETE FROM \`defect_status\` WHERE \`defect_status_name\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

