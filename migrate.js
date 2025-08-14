// Lightweight migration runner for @sequelize/core v7
const path = require('path');
const fs = require('fs');
const sequelize = require('./config/database');

async function runMigrations(direction = 'up') {
  const migrationsDir = path.resolve(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.error('No migrations directory found at', migrationsDir);
    process.exit(1);
  }

  // Load all migration files in sort order
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.js'))
    .sort();

  const migrations = files.map((file) => ({
    file,
    ...require(path.join(migrationsDir, file)),
  }));

  try {
    await sequelize.authenticate();
    console.log('DB connected');

    if (direction === 'down') {
      // run in reverse order
      for (let i = migrations.length - 1; i >= 0; i -= 1) {
        const m = migrations[i];
        if (typeof m.down === 'function') {
          console.log('Reverting', m.file);
          // pass the same sequelize instance and QueryInterface-like object
          await m.down(sequelize);
        }
      }
    } else {
      for (const m of migrations) {
        if (typeof m.up === 'function') {
          console.log('Applying', m.file);
          await m.up(sequelize);
        }
      }
    }

    await sequelize.close();
    console.log('Done');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const direction = process.argv[2] === 'down' ? 'down' : 'up';
runMigrations(direction);

