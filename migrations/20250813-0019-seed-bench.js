module.exports.up = async (sequelize) => {
  const rows = [
    { bench_id: 'BENCH-ALICE', user_email: 'alice@example.com', allocated: 0, availability: 100 },
    { bench_id: 'BENCH-BOB', user_email: 'bob@example.com', allocated: 50, availability: 50 },
  ];

  for (const r of rows) {
    const [[user]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [r.user_email] }
    );
    if (!user) throw new Error(`User not found: ${r.user_email}`);

    await sequelize.query(
      'INSERT INTO `bench` (`allocated`, `availability`, `bench_id`, `user_id`)\n' +
      'SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `bench` WHERE `bench_id` = ?)',
      { replacements: [r.allocated, r.availability, r.bench_id, user.id, r.bench_id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['BENCH-ALICE','BENCH-BOB'];
  await sequelize.query(
    `DELETE FROM \`bench\` WHERE \`bench_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

