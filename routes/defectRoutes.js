const express = require('express');
const router = express.Router();
const controller = require('../controllers/DefectController');

router.get('/severity-index', controller.getSeverityIndex);
router.get('/density', controller.getDefectDensity);
router.get('/remark-ratio', controller.getDefectRemarkRatio);

module.exports = router;