const db = require('./db')
const Task=require('./taskModel')

function randomIdGenerate() {
    return `LI${Date.now().toString(16)}`
}

function getNow() {
    let raw = new Date();
    return `${raw.getFullYear()}-${raw.getMonth()+1}-${raw.getDate()} ${raw.getHours()}:${raw.getMinutes()}:${raw.getSeconds()}`
}

async function addList(data) {
    let query = `
        INSERT INTO list (list_id, name, description, created_at, is_hidden)
        VALUES ('${data.listId}','${data.listName}','${data.listDescription}','${getNow()}',false)
    `
    await db.executeQuery(query);
}

async function getListById(listId) {
    let listQuery = `
        SELECT name as "listName", description, to_char(created_at,'dd/mm/yyyy') as "createdAt", is_hidden as "isHidden"
        FROM list
        WHERE list_id='${listId}'
    `
    let rawList = await db.getQuery(listQuery);
    let res = rawList[0];
    res.tasks = [];
    let taskQuery = `
        SELECT *
        FROM task_of_list
        WHERE list_id='${listId}'
    `
    let tasks = await db.getQuery(taskQuery);
    for (let row of tasks) {
        let taskData = await Task.getTaskById(row.task_id);
        res.tasks.push({ taskId:row.task_id,...taskData });
    }

    return res;
}

module.exports={randomIdGenerate,addList,getListById}