const defectService = require('../services/defectService');

async function getSeverityIndex(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }

    const data = await defectService.getDefectSeverityIndex(parsedId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getDefectDensity(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }

    const data = await defectService.getDefectDensity(parsedId);
    res.json({
      status: 'success',
      message: 'Defect density calculated successfully',
      data,
      statusCode: 2000,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

async function getDefectRemarkRatio(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }
    const data = await defectService.getDefectRemarkRatio(parsedId);
    return res.json({
      status: 'success',
      message: 'Defect Remark Ratio calculated successfully',
      data,
      statusCode: 2000,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

async function getDefectDistributionByType(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }
    
    const data = await defectService.getDefectDistributionByType(parsedId);
    return res.json({
      status: 'success',
      message: 'Defect statistics fetched successfully',
      data,
      statusCode: 2000,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

async function getDefectCountByModule(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }
    
    const data = await defectService.getDefectCountByModule(parsedId);
    return res.json({
      status: 'success',
      message: 'Defect summary fetched successfully',
      data,
      statusCode: 2000,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

async function getDefectSeverityBreakdown(req, res) {
  try {
    const { projectId } = req.query;
    const parsedId = Number(projectId);
    if (!projectId || Number.isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ message: 'projectId query parameter is required and must be a positive number' });
    }

    const data = await defectService.getDefectSeverityBreakdown(parsedId);
    return res.json({
      status: 'success',
      statusCode: 2000,
      data,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message, statusCode: 5000 });
  }
}

module.exports = { getSeverityIndex, getDefectDensity, getDefectRemarkRatio, getDefectDistributionByType, getDefectCountByModule, getDefectSeverityBreakdown };

//module.exports.getDefectRemarkRatio = getDefectRemarkRatio;

