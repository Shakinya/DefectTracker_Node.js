const express = require('express');
const app = express();
const sequelize = require('./config/database');
const db = require('./db'); // This should initialize and export all models


const designationRoutes = require('./routes/designationRoutes');

// Middleware
app.use(express.json());


// Register routes
app.use('/api/designations', designationRoutes);
//app.use('/api/role', roleRoutes);





// Sync database and start server
sequelize.sync({ force: false }) // set to true only if you want to reset the DB on every run
  .then(() => {
    console.log('Database synced!');
    
    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
