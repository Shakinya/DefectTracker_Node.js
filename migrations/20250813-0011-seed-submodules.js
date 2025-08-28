module.exports.up = async (sequelize) => {
  const rows = [
    { sub_module_id: 'AUTH-LOGIN', sub_module_name: 'Login Flow', module_code: 'ALPHA-AUTH' },
    { sub_module_id: 'AUTH-PASSWORD', sub_module_name: 'Password Management', module_code: 'ALPHA-AUTH' },
    { sub_module_id: 'AUTH-REGISTER', sub_module_name: 'Registration Flow', module_code: 'ALPHA-AUTH' },
    { sub_module_id: 'API-ORDERS', sub_module_name: 'Orders Endpoint', module_code: 'ALPHA-API' },
    { sub_module_id: 'BETA-CORE-MAIN', sub_module_name: 'Core Main', module_code: 'BETA-CORE' },
    { sub_module_id: 'SEARCH-MAIN', sub_module_name: 'Search Main', module_code: 'BETA-SEARCH' },
    { sub_module_id: 'BETA-SEARCH', sub_module_name: 'Search Functionality', module_code: 'BETA-SEARCH' },
    { sub_module_id: 'CHECKOUT-UI', sub_module_name: 'Checkout UI', module_code: 'BETA-CHECKOUT' },
    { sub_module_id: 'BETA-CHECKOUT', sub_module_name: 'Checkout Process', module_code: 'BETA-CHECKOUT' },
  ];

  for (const r of rows) {
    const [mod] = await sequelize.query(
      'SELECT `id` FROM `modules` WHERE `module_id` = ? LIMIT 1',
      { replacements: [r.module_code] }
    );
    if (!mod || mod.length === 0) {
      throw new Error(`Module not found: ${r.module_code}`);
    }
    const moduleId = mod[0].id;

    await sequelize.query(
      'INSERT INTO `sub_module` (`sub_module_id`, `sub_module_name`, `modules_id`)\n' +
      'SELECT ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `sub_module` WHERE `sub_module_id` = ?)',
      { replacements: [r.sub_module_id, r.sub_module_name, moduleId, r.sub_module_id] }
    );
  }
};

module.exports.down = async (sequelize) => {
  const ids = ['AUTH-LOGIN', 'AUTH-PASSWORD', 'AUTH-REGISTER', 'API-ORDERS', 'BETA-CORE-MAIN', 'SEARCH-MAIN', 'BETA-SEARCH', 'CHECKOUT-UI', 'BETA-CHECKOUT'];
  await sequelize.query(
    `DELETE FROM \`sub_module\` WHERE \`sub_module_id\` IN (${ids.map(() => '?').join(',')})`,
    { replacements: ids }
  );
};

