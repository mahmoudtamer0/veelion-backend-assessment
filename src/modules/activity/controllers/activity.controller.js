const activityService = require('../services/activity.service');

function getActivity(req, res) {
  const activity = activityService.getAllActivity();
  res.status(200).json({ data: activity });
}

function addActivity(req, res) {
  const payload = req.body || {};

  if (typeof payload.action !== 'string' || !payload.action.trim()) {
    return res.status(400).json({ error: { message: 'action is required and must be string' } });
  }

  const newActivity = activityService.createNewActivity(payload);
  res.status(201).json({ data: newActivity });
}

module.exports = {
  getActivity,
  addActivity,
};