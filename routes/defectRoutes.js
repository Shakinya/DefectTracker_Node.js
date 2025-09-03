const express = require('express');
const router = express.Router();
const controller = require('../controllers/DefectController');

router.get('/severity-index', controller.getSeverityIndex);
router.get('/density', controller.getDefectDensity);
router.get('/remark-ratio', controller.getDefectRemarkRatio);
router.get('/distribution-by-type', controller.getDefectDistributionByType);
router.get('/count-by-module', controller.getDefectCountByModule);
router.get('/severity-breakdown', controller.getDefectSeverityBreakdown);

module.exports = router;