const path = require('node:path');

const { readJsonArray } = require('../../../utils/jsonStore');

const TASKS_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getTasksSummary() {
    const tasks = await readJsonArray(TASKS_FILE_PATH);
    const activity = await readJsonArray(ACTIVITY_FILE_PATH);

    const byStatus = {
        done: tasks.filter((t) => t.completed === true).length,
        todo: tasks.filter((t) => t.completed === false).length,
    };

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentActivityCount = activity.filter(
        (a) => new Date(a.when).getTime() >= oneDayAgo
    ).length;

    return {
        total: tasks.length,
        byStatus,
        recentActivityCount,
    };
}

module.exports = {
    getTasksSummary,
};