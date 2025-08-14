module.exports.up = async (sequelize) => {
  const rows = [
    { defect_ref: 'DEF-ALPHA-001', commenter_email: 'alice@example.com', comment: 'Investigating the issue', attachment: null },
    { defect_ref: 'DEF-ALPHA-001', commenter_email: 'bob@example.com',   comment: 'Reproduced on staging', attachment: null },
  ];

  for (const r of rows) {
    const [[defect]] = await sequelize.query('SELECT `id` FROM `defect` WHERE `defect_id` = ? LIMIT 1', { replacements: [r.defect_ref] });
    if (!defect) throw new Error(`Defect not found: ${r.defect_ref}`);
    const [[user]] = await sequelize.query('SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1', { replacements: [r.commenter_email] });
    if (!user) throw new Error(`User not found: ${r.commenter_email}`);

    await sequelize.query(
      'INSERT INTO `comments` (`attachment`, `comment`, `defect_id`, `user_id`) VALUES (?, ?, ?, ?)',
      { replacements: [r.attachment, r.comment, defect.id, user.id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  // remove comments for this defect only for safety
  const [[defect]] = await sequelize.query('SELECT `id` FROM `defect` WHERE `defect_id` = ? LIMIT 1', { replacements: ['DEF-ALPHA-001'] });
  if (defect) {
    await sequelize.query('DELETE FROM `comments` WHERE `defect_id` = ?', { replacements: [defect.id] });
  }
};

