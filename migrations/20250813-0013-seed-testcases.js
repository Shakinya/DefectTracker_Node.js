module.exports.up = async (sequelize) => {
  const rows = [
    {
      test_case_id: 'TC-ALPHA-001',
      description: 'User can log in with valid credentials',
      steps: 'Open login page; Enter valid credentials; Click Login',
      project_code: 'P-2024-001',
      module_code: 'ALPHA-AUTH',
      sub_module_code: 'AUTH-LOGIN',
      severity_name: 'Major',
      defect_type_name: 'Bug',
    },
    {
      test_case_id: 'TC-ALPHA-002',
      description: 'User can reset password with valid email',
      steps: 'Open password reset page; Enter valid email; Submit',
      project_code: 'P-2024-001',
      module_code: 'ALPHA-AUTH',
      sub_module_code: 'AUTH-PASSWORD',
      severity_name: 'Minor',
      defect_type_name: 'Task',
    },
    {
      test_case_id: 'TC-BETA-001',
      description: 'Search functionality works correctly',
      steps: 'Open search page; Enter search term; Verify results',
      project_code: 'P-2024-002',
      module_code: 'BETA-SEARCH',
      sub_module_code: 'BETA-SEARCH',
      severity_name: 'Major',
      defect_type_name: 'Bug',
    },
    {
      test_case_id: 'TC-BETA-002',
      description: 'Checkout process completes successfully',
      steps: 'Add items to cart; Proceed to checkout; Complete payment',
      project_code: 'P-2024-002',
      module_code: 'BETA-CHECKOUT',
      sub_module_code: 'BETA-CHECKOUT',
      severity_name: 'Major',
      defect_type_name: 'Task',
    },
  ];

  for (const r of rows) {
    const [[project]] = await sequelize.query(
      'SELECT `id` FROM `project` WHERE `project_id` = ? LIMIT 1',
      { replacements: [r.project_code] }
    );
    if (!project) throw new Error(`Project not found: ${r.project_code}`);

    const [[module]] = await sequelize.query(
      'SELECT `id` FROM `modules` WHERE `module_id` = ? LIMIT 1',
      { replacements: [r.module_code] }
    );
    if (!module) throw new Error(`Module not found: ${r.module_code}`);

    const [[submodule]] = await sequelize.query(
      'SELECT `id` FROM `sub_module` WHERE `sub_module_id` = ? LIMIT 1',
      { replacements: [r.sub_module_code] }
    );
    if (!submodule) throw new Error(`SubModule not found: ${r.sub_module_code}`);

    const [[severity]] = await sequelize.query(
      'SELECT `id` FROM `severity` WHERE `severity_name` = ? LIMIT 1',
      { replacements: [r.severity_name] }
    );
    if (!severity) throw new Error(`Severity not found: ${r.severity_name}`);

    const [[dtype]] = await sequelize.query(
      'SELECT `id` FROM `defect_type` WHERE `defect_type_name` = ? LIMIT 1',
      { replacements: [r.defect_type_name] }
    );
    if (!dtype) throw new Error(`DefectType not found: ${r.defect_type_name}`);

    await sequelize.query(
      'INSERT INTO `test_case` (`description`, `steps`, `test_case_id`, `type_id`, `module_id`, `project_id`, `severity_id`, `sub_module_id`)\n' +
      'SELECT ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `test_case` WHERE `test_case_id` = ?)',
      { replacements: [
        r.description,
        r.steps,
        r.test_case_id,
        dtype.id,
        module.id,
        project.id,
        severity.id,
        submodule.id,
        r.test_case_id,
      ] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['TC-ALPHA-001', 'TC-ALPHA-002', 'TC-BETA-001', 'TC-BETA-002'];
  await sequelize.query(
    `DELETE FROM \`test_case\` WHERE \`test_case_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

