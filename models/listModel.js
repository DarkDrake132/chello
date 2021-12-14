const db = require("./db");
const Task = require("./taskModel");
const utils = require('../utils');

function randomIdGenerate() {
    return `LI${Date.now().toString(16)}`;
}

async function addList(data) {
    let query = `
        INSERT INTO list (list_id, name, description, created_at, is_hidden)
        VALUES ('${data.listId}','${data.listName}','${
        data.listDescription
    }','${utils.getNow()}',false)
    `;
    await db.executeQuery(query);
}

async function getListById(listId) {
    let listQuery = `
        SELECT name as "listName", description, to_char(created_at,'dd/mm/yyyy') as "createdAt", is_hidden as "isHidden"
        FROM list
        WHERE list_id='${listId}'
    `;
    let rawList = await db.getQuery(listQuery);
    let res = rawList[0];
    res.tasks = [];
    let taskQuery = `
        SELECT *
        FROM task_of_list
        WHERE list_id='${listId}'
    `;
    let tasks = await db.getQuery(taskQuery);
    for (let row of tasks) {
        let taskData = await Task.getTaskById(row.task_id);
        res.tasks.push({ taskId: row.task_id, ...taskData });
    }

    return res;
}

async function addTaskToList(taskId, listId) {
    var query = `
        INSERT INTO task_of_list (task_id,list_id)
        VALUES ('${taskId}','${listId}')
    `;
    await db.executeQuery(query);
}

async function removeTaskFromList(taskId, listId) {
    var query = `
        DELETE FROM task_of_list
        WHERE task_id='${taskId}' AND list_id='${listId}'
    `;
    await db.executeQuery(query);
}

module.exports = {
    randomIdGenerate,
    addList,
    getListById,
    addTaskToList,
    removeTaskFromList,
};
