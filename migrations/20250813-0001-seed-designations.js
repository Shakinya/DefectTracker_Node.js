// Seed initial Designation data using a plain sequelize connection.
// Works with @sequelize/core v7 via sequelize.query

module.exports.up = async (sequelize) => {
  // Ensure table exists; if your schema is already created elsewhere, you can remove this
  // This will not create the table; it only inserts rows
  const inserts = [
    ['Software Engineer'],
    ['Senior Software Engineer'],
    ['Team Lead'],
    ['QA Engineer'],
    ['Project Manager'],
  ];

  for (const [designation] of inserts) {
    await sequelize.query(
      'INSERT INTO `designation` (`designation`) VALUES (?)',
      { replacements: [designation] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = [
    'Software Engineer',
    'Senior Software Engineer',
    'Team Lead',
    'QA Engineer',
    'Project Manager',
  ];
  await sequelize.query(
    `DELETE FROM \`designation\` WHERE \`designation\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

