module.exports.up = async (sequelize) => {
  const rows = [
    {
      name: 'Default SMTP',
      from_email: 'no-reply@example.com',
      from_name: 'No Reply',
      username: 'no-reply@example.com',
      password: 'app-password',
      smtp_host: 'smtp.example.com',
      smtp_port: 587,
    },
  ];

  for (const r of rows) {
    await sequelize.query(
      'INSERT INTO `smtp_config` (`from_email`, `from_name`, `name`, `password`, `smtp_host`, `smtp_port`, `username`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `smtp_config` WHERE `name` = ?)',
      { replacements: [r.from_email, r.from_name, r.name, r.password, r.smtp_host, r.smtp_port, r.username, r.name] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const names = ['Default SMTP'];
  await sequelize.query(
    `DELETE FROM \`smtp_config\` WHERE \`name\` IN (${names.map(() => '?').join(',')})`,
    { replacements: names }
  );
};

