const express = require('express');

const reportsController = require('../controllers/reports.controller');

const reportsRouter = express.Router();

reportsRouter.get('/tasks-summary', reportsController.getTasksSummary);

module.exports = reportsRouter;