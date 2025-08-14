const express = require('express');
const app = express();
const sequelize = require('./config/database');
const db = require('./db'); // This should initialize and export all models


const designationRoutes = require('./routes/designationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const priorityRoutes = require('./routes/priorityRoutes');
const severityRoutes = require('./routes/severityRoutes');
const defectStatusRoutes = require('./routes/defectStatusRoutes');
const releaseTypeRoutes = require('./routes/releaseTypeRoutes');
const defectTypeRoutes = require('./routes/defectTypeRoutes');

// Middleware
app.use(express.json());


// Register routes
app.use('/api/designations', designationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/priorities', priorityRoutes);
app.use('/api/severities', severityRoutes);
app.use('/api/defect-statuses', defectStatusRoutes);
app.use('/api/release-types', releaseTypeRoutes);
app.use('/api/defect-types', defectTypeRoutes);
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
