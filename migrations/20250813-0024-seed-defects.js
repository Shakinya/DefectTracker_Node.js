module.exports.up = async (sequelize) => {
  const rows = [
    {
      defect_id: 'DEF-ALPHA-001',
      description: 'Login fails with special characters',
      steps: 'Enter special chars in username; submit',
      assigned_by_email: 'alice@example.com',
      assigned_to_email: 'bob@example.com',
      project_code: 'P-2024-001',   // project id = 9
      module_code: 'ALPHA-AUTH',
      sub_module_code: 'AUTH-LOGIN',
      release_tag: 'ALPHA-R1',
      tc_tag: 'TC-ALPHA-001',
      severity_name: 'Major',
      priority_name: 'High',
      type_name: 'Bug',
      defect_status_name: 'Open',
    },
    {
      defect_id: 'DEF-ALPHA-002',
      description: 'Forgot password email not sent',
      steps: 'Click forgot password, enter valid email',
      assigned_by_email: 'alice@example.com',
      assigned_to_email: 'charlie@example.com',
      project_code: 'P-2024-001',   // project id = 9
      module_code: 'ALPHA-AUTH',
      sub_module_code: 'AUTH-PASSWORD',
      release_tag: 'ALPHA-R1',
      tc_tag: 'TC-ALPHA-002',
      severity_name: 'Critical',
      priority_name: 'High',
      type_name: 'Bug',
      defect_status_name: 'Open',
    },
    {
      defect_id: 'DEF-BETA-001',
      description: 'Search page crashes with empty query',
      steps: 'Open search, hit enter with no input',
      assigned_by_email: 'david@example.com',
      assigned_to_email: 'eva@example.com',
      project_code: 'P-2024-002',   // project id = 10
      module_code: 'BETA-SEARCH',
      sub_module_code: 'SEARCH-MAIN',
      release_tag: 'BETA-R1',
      tc_tag: 'TC-BETA-001',
      severity_name: 'Major',
      priority_name: 'Medium',
      type_name: 'Bug',
      defect_status_name: 'Open',
    },
    {
      defect_id: 'DEF-BETA-002',
      description: 'UI misalignment on checkout page',
      steps: 'Go to checkout with 3+ items, observe layout',
      assigned_by_email: 'david@example.com',
      assigned_to_email: 'frank@example.com',
      project_code: 'P-2024-002',   // project id = 10
      module_code: 'BETA-CHECKOUT',
      sub_module_code: 'CHECKOUT-UI',
      release_tag: 'BETA-R1',
      tc_tag: 'TC-BETA-002',
      severity_name: 'Minor',
      priority_name: 'Low',
      type_name: 'UI',
      defect_status_name: 'Open',
    },
  ];

  for (const r of rows) {
    const [[assignedBy]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [r.assigned_by_email] }
    );
    if (!assignedBy) throw new Error(`User not found: ${r.assigned_by_email}`);

    const [[assignedTo]] = await sequelize.query(
      'SELECT `id` FROM `user` WHERE `email` = ? LIMIT 1',
      { replacements: [r.assigned_to_email] }
    );
    if (!assignedTo) throw new Error(`User not found: ${r.assigned_to_email}`);

    const [[project]] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [r.project_code] }
    );
    if (!project) throw new Error(`Project not found: ${r.project_code}`);

    const [[moduleRow]] = await sequelize.query(
      'SELECT `id` FROM `modules` WHERE `module_id` = ? LIMIT 1',
      { replacements: [r.module_code] }
    );
    if (!moduleRow) throw new Error(`Module not found: ${r.module_code}`);

    const [[submodule]] = await sequelize.query(
      'SELECT `id` FROM `sub_module` WHERE `sub_module_id` = ? LIMIT 1',
      { replacements: [r.sub_module_code] }
    );
    if (!submodule) throw new Error(`SubModule not found: ${r.sub_module_code}`);

    const [[rtc]] = await sequelize.query(
      'SELECT `id` FROM `release_test_case` WHERE `release_test_case_id` = ? LIMIT 1',
      { replacements: [`${r.release_tag}-${r.tc_tag}`] }
    );
    if (!rtc) throw new Error(`ReleaseTestCase not found: ${r.release_tag}-${r.tc_tag}`);

    const [[severity]] = await sequelize.query(
      'SELECT `id` FROM `severity` WHERE `severity_name` = ? LIMIT 1',
      { replacements: [r.severity_name] }
    );
    if (!severity) throw new Error(`Severity not found: ${r.severity_name}`);

    const [[priority]] = await sequelize.query(
      'SELECT `id` FROM `priority` WHERE `priority` = ? LIMIT 1',
      { replacements: [r.priority_name] }
    );
    if (!priority) throw new Error(`Priority not found: ${r.priority_name}`);

    const [[dtype]] = await sequelize.query(
      'SELECT `id` FROM `defect_type` WHERE `defect_type_name` = ? LIMIT 1',
      { replacements: [r.type_name] }
    );
    if (!dtype) throw new Error(`Defect type not found: ${r.type_name}`);

    const [[dstatus]] = await sequelize.query(
      'SELECT `id` FROM `defect_status` WHERE `defect_status_name` = ? LIMIT 1',
      { replacements: [r.defect_status_name] }
    );
    if (!dstatus) throw new Error(`Defect status not found: ${r.defect_status_name}`);

    await sequelize.query(
      `INSERT INTO defect 
        (attachment, defect_id, description, re_open_count, steps, assigned_by, assigned_to, defect_status_id, type_id, modules_id, priority_id, project_id, release_test_case_id, severity_id, sub_module_id)
       SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
       FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM defect WHERE defect_id = ?)`,
      {
        replacements: [
          null,
          r.defect_id,
          r.description,
          0,
          r.steps,
          assignedBy.id,
          assignedTo.id,
          dstatus.id,
          dtype.id,
          moduleRow.id,
          priority.id,
          project.id,
          rtc.id,
          severity.id,
          submodule.id,
          r.defect_id,
        ],
      }
    );
  }
};

module.exports.down = async (sequelize) => {
  const defectIds = ['DEF-ALPHA-001', 'DEF-ALPHA-002', 'DEF-BETA-001', 'DEF-BETA-002'];
  await sequelize.query(
    `DELETE FROM defect WHERE defect_id IN (${defectIds.map(() => '?').join(',')})`,
    { replacements: defectIds }
  );
};

