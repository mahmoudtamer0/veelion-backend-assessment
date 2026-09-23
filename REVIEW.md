I went through both modules (tasks and activity) before touching anything. Here's what I found, split by type.

Bugs:

Duplicate function in activity.service.js There were two functions doing the exact same thing (loadDataA and loadDataB), just called in different places. I merged them into one loadData function.


Activity IDs could collide Activity records used String(Date.now()) as an id. If two requests hit at the same millisecond, they'd get the same id. Tasks already use a proper createId() helper, activity should use the same thing for consistency

No link between tasks and activity The two modules didn't talk to each other at all. Creating/updating/deleting a task never created an activity log entry,
I added calls to createNewActivity(...) inside the tasks controller after create/update/delete succeed.

security:

No authentication anywhere Any request can create, update, or delete tasks and activity records, no login or token needed. This is the biggest gap in the project. I didn't add auth since it felt out of scope for this task, but it's the first thing I'd flag before this touches real data.

No body size limit express.json() is used with no limit, so someone could send a huge payload


Performance:

Sync file I/O in activity.service.js fs.readFileSync / fs.writeFileSync block the event loop on every single request. tasks.service.js already uses async file helpers, activity should match that


Read-modify-write with no locking Both modules read the whole JSON file, change it in memory, then write it back. If two requests land at the same time, one write can overwrite the other and you lose data silently

No pagination on GET /tasks Returns every task every time.




Maintainability / Code quality

Naming and style were inconsistent between modules tasks.controller.js used clear names (listTasks, getTask, etc). activity.controller.js used short unclear names (c, x, aSvc, b, one) and mixed get_activity

Inconsistent response tasks always returned { data: ... }

activity just returned the raw array/object. Fixed activity to match.


What I added: Reports module

New endpoint: GET /reports/tasks-summary. Same folder structure as the other two modules (controller/service/routes).

What I intentionally didn't do
No JWT / auth
No Cashing
No validation library (Joi, zod, etc), kept manual checks like the rest of the project already does
No database, no file locking
No tests (not asked for)

These would all be reasonable next steps for a real production app, but the task specifically said keep it simple, so I focused on fixing what was actually broken.

Thanks for reading, I hope you found it useful!

Mahmoud Tamer
mahmoud.tamer.developer@gmail.com
01123511914