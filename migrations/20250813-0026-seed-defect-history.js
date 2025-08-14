module.exports.up = async (sequelize) => {
  const rows = [
    { defect_ref: 'DEF-ALPHA-001', release_tag: 'ALPHA-R1', assigned_by: 'alice@example.com', assigned_to: 'bob@example.com', previous_status: null, defect_status: 'Open', record_status: 'Created', defect_date: '2024-04-01 10:10:00', defect_time: '10:10:00' },
    { defect_ref: 'DEF-ALPHA-001', release_tag: 'ALPHA-R1', assigned_by: 'alice@example.com', assigned_to: 'bob@example.com', previous_status: 'Open', defect_status: 'In Progress', record_status: 'Updated', defect_date: '2024-04-02 09:00:00', defect_time: '09:00:00' },
  ];

  for (const r of rows) {
    const [[defect]] = await sequelize.query('SELECT `id` FROM `defect` WHERE `defect_id` = ? LIMIT 1', { replacements: [r.defect_ref] });
    if (!defect) throw new Error(`Defect not found: ${r.defect_ref}`);

    const [[release]] = await sequelize.query('SELECT `id` FROM `releases` WHERE `release_id` = ? LIMIT 1', { replacements: [r.release_tag] });
    if (!release) throw new Error(`Release not found: ${r.release_tag}`);

    await sequelize.query(
      'INSERT INTO `defect_history` (`assigned_by`, `assigned_to`, `defect_date`, `defect_ref_id`, `defect_status`, `defect_time`, `previous_status`, `record_status`, `release_id`, `defect_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      { replacements: [
        r.assigned_by,
        r.assigned_to,
        r.defect_date,
        r.defect_ref,
        r.defect_status,
        r.defect_time,
        r.previous_status,
        r.record_status,
        release.id,
        defect.id,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  await sequelize.query('DELETE FROM `defect_history` WHERE `defect_ref_id` = ?', { replacements: ['DEF-ALPHA-001'] });
};

