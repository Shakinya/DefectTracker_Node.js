module.exports.up = async (sequelize) => {
  const rows = [
    { release_tag: 'ALPHA-R1', tc_tag: 'TC-ALPHA-001', owner_email: 'alice@example.com', description: 'Login passes in R1', test_case_status: 'PASS', test_date: '2024-04-01 10:00:00', test_time: '10:00:00' },
    { release_tag: 'BETA-R1',  tc_tag: 'TC-ALPHA-002', owner_email: 'bob@example.com',   description: 'Register new user',  test_case_status: 'NEW',  test_date: '2024-05-10 11:30:00', test_time: '11:30:00' },
  ];

  for (const r of rows) {
    const [[rel]] = await sequelize.query(
      'SELECT `id` FROM `releases` WHERE `release_id` = ? LIMIT 1',
      { replacements: [r.release_tag] }
    );
    if (!rel) throw new Error(`Release not found: ${r.release_tag}`);

    const [[tc]] = await sequelize.query(
      'SELECT `id` FROM `test_case` WHERE `test_case_id` = ? LIMIT 1',
      { replacements: [r.tc_tag] }
    );
    if (!tc) throw new Error(`Test case not found: ${r.tc_tag}`);

    const [[owner]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [r.owner_email] }
    );
    if (!owner) throw new Error(`Owner not found: ${r.owner_email}`);

    await sequelize.query(
      'INSERT INTO `release_test_case` (`description`, `release_test_case_id`, `test_case_status`, `test_date`, `test_time`, `owner_id`, `release_id`, `test_case_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `release_test_case` WHERE `release_test_case_id` = ?)',
      { replacements: [
        r.description,
        `${r.release_tag}-${r.tc_tag}`,
        r.test_case_status,
        r.test_date,
        r.test_time,
        owner.id,
        rel.id,
        tc.id,
        `${r.release_tag}-${r.tc_tag}`,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['ALPHA-R1-TC-ALPHA-001','BETA-R1-TC-ALPHA-002'];
  await sequelize.query(
    `DELETE FROM \`release_test_case\` WHERE \`release_test_case_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

