module.exports.up = async (sequelize) => {
  const projects = [
    {
      project_id: 'P-2024-001',
      project_name: 'Alpha Platform',
      client_name: 'Acme Corp',
      project_status: 'ACTIVE',
      start_date: '2024-01-20 00:00:00',
      end_date: '2024-02-20 02:20:00',
      country: 'USA',
      description:'Hello',
      state: 'CA',
      email: 'alpha@acme.com',
      phone_no: '1112223333',
      kloc: 120.5,
      owner_email: 'alice@example.com',
    },
    {
      project_id: 'P-2024-002',
      project_name: 'Beta Mobile App',
      client_name: 'Globex',
      project_status: 'ACTIVE',
      start_date: '2024-02-10 00:00:00',
      end_date:  '2024-03-10 03:30:00',
      country: 'UK',
      description:'HII',
      state: 'London',
      email: 'beta@globex.com',
      phone_no: '2223334444',
      kloc: 80.0,
      owner_email: 'bob@example.com',
    },
  ];

  for (const p of projects) {
    const [userRows] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [p.owner_email] }
    );
    if (!userRows || userRows.length === 0) {
      throw new Error(`Owner user not found by email: ${p.owner_email}`);
    }
    const ownerId = userRows[0].id;

    await sequelize.query(
      'INSERT INTO `project` (`client_name`, `country`, `description`, `email`, `end_date`, `kloc`, `phone_no`, `project_id`, `project_name`, `project_status`, `start_date`, `state`, `user_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `project` WHERE `project_id` = ?)',
      { replacements: [
        p.client_name,         // client_name
        p.country,             // country
        p.description,                  // description
        p.email,               // email
        p.end_date,            // end_date
        p.kloc,                // kloc
        p.phone_no,            // phone_no
        p.project_id,          // project_id
        p.project_name,        // project_name
        p.project_status,      // project_status
        p.start_date,          // start_date
        p.state,               // state
        ownerId,               // user_id
        p.project_id,          // NOT EXISTS key
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['P-2024-001', 'P-2024-002'];
  await sequelize.query(
    `DELETE FROM \`project\` WHERE \`project_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

