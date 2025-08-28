module.exports.up = async (sequelize) => {
  const users = [
    {
      email: 'alice@example.com',
      first_name: 'Alice',
      last_name: 'Johnson',
      password: 'password123',
      phone_no: '1234567890',
      user_id: 'U1001',
      user_gender: 'Female',
      user_status: 'Active',
      join_date: '2024-01-15 00:00:00',
      designation: 'Software Engineer',
    },
    {
      email: 'bob@example.com',
      first_name: 'Bob',
      last_name: 'Smith',
      password: 'password123',
      phone_no: '9876543210',
      user_id: 'U1002',
      user_gender: 'Male',
      user_status: 'Active',
      join_date: '2024-02-01 00:00:00',
      designation: 'Senior Software Engineer',
    },
    {
      email: 'carol@example.com',
      first_name: 'Carol',
      last_name: 'Davis',
      password: 'password123',
      phone_no: '5556667777',
      user_id: 'U1003',
      user_gender: 'Female',
      user_status: 'Active',
      join_date: '2024-03-05 00:00:00',
      designation: 'QA Engineer',
    },
    {
      email: 'charlie@example.com',
      first_name: 'Charlie',
      last_name: 'Wilson',
      password: 'password123',
      phone_no: '1112223333',
      user_id: 'U1004',
      user_gender: 'Male',
      user_status: 'Active',
      join_date: '2024-01-20 00:00:00',
      designation: 'Software Engineer',
    },
    {
      email: 'david@example.com',
      first_name: 'David',
      last_name: 'Brown',
      password: 'password123',
      phone_no: '4445556666',
      user_id: 'U1005',
      user_gender: 'Male',
      user_status: 'Active',
      join_date: '2024-02-10 00:00:00',
      designation: 'Senior Software Engineer',
    },
    {
      email: 'eva@example.com',
      first_name: 'Eva',
      last_name: 'Martinez',
      password: 'password123',
      phone_no: '7778889999',
      user_id: 'U1006',
      user_gender: 'Female',
      user_status: 'Active',
      join_date: '2024-03-01 00:00:00',
      designation: 'QA Engineer',
    },
    {
      email: 'frank@example.com',
      first_name: 'Frank',
      last_name: 'Taylor',
      password: 'password123',
      phone_no: '0001112222',
      user_id: 'U1007',
      user_gender: 'Male',
      user_status: 'Active',
      join_date: '2024-03-15 00:00:00',
      designation: 'Software Engineer',
    },
  ];

  for (const u of users) {
    const [designationRows] = await sequelize.query(
      'SELECT `id` FROM `designation` WHERE `designation` = ? LIMIT 1',
      { replacements: [u.designation] }
    );
    if (!designationRows || designationRows.length === 0) {
      throw new Error(`Designation not found: ${u.designation}`);
    }
    const designationId = designationRows[0].id;

    // Insert only if user_id not already present
    await sequelize.query(
      'INSERT INTO `user` (`email`, `first_name`, `last_name`, `password`, `phone_no`, `user_id`, `user_gender`, `user_status`, `join_date`, `designation_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `user` WHERE `user_id` = ?)',
      { replacements: [
        u.email,
        u.first_name,
        u.last_name,
        u.password,
        u.phone_no,
        u.user_id,
        u.user_gender,
        u.user_status,
        u.join_date,
        designationId,
        u.user_id,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const userIds = ['U1001', 'U1002', 'U1003', 'U1004', 'U1005', 'U1006', 'U1007'];
  await sequelize.query(
    `DELETE FROM \`user\` WHERE \`user_id\` IN (${userIds.map(() => '?').join(',')})`,
    { replacements: userIds }
  );
};

