const db=require('./db')

function randomIdGenerate() {
    return `TA${Date.now().toString(16)}`;
}


async function getTaskById(taskId) {
    let taskQuery = `
        SELECT name as "taskName", description, have_deadline as "haveDeadline", to_char(duedate,'dd/mm/yyyy') as "dueDate", is_expired as "isExpired", is_hidden as "isHidden"
        FROM task
        WHERE task_id='${taskId}'
    `

    let taskData = await db.getQuery(taskQuery);
    if (taskData.length == 0) return null;
    let res = taskData[0];
    if (new Date(res.dueDate) < new Date()) res.isExpired = true; else res.isExpired = false;
    
    let labelQuery = `
        SELECT l.label_id as "labelId", l.name as "labelName", l.color as "color"
        FROM label l
        JOIN label_of_task t on l.label_id=t.label_id
        WHERE t.task_id='${taskId}'
    `
    let labelData = await db.getQuery(labelQuery);
    res.labels = labelData;
    return res;

}

function dateReformat(date) {
    let tokens = date.split('/');
    return `${tokens[2]}-${tokens[1]}-${tokens[0]}`;
}

async function addTask(data) {
    let query = `
        INSERT INTO task (task_id, name, description, have_deadline, duedate, is_expired, is_hidden)
        VALUES ('${data.taskId}','${data.taskName}','${data.description}','${data.haveDeadline}','${dateReformat(data.dueDate)}','${data.isExpired}','${data.isHidden}')
    `
    await db.executeQuery(query);

    for (let label of data.labels) {
        let labelQuery = `
            INSERT INTO label_of_task (task_id, label_id)
            VALUES ('${data.newId}','${label}')
        `
        await db.executeQuery(labelQuery);

    }
}

async function updateTaskById(data) {
    // update the basic information (not the label list)
    let updateQuery = `
        UPDATE task 
        SET name='${data.taskName}', description='${data.description}', have_deadline='${data.haveDeadline}', duedate='${dateReformat(data.dueDate)}', is_expired='${data.isExpired}', is_hidden='${data.isHidden}'
        WHERE task_id='${data.taskId}'
    `
    await db.executeQuery(updateQuery);

    let getLabelQuery = `
        SELECT *
        FROM label_of_task
        where task_id='${data.taskId}'
    `

    let oldLabels = await db.getQuery(getLabelQuery);

    // add new labels
    for (let newLabel of data.labels) {
        let isNew = true;
        for (let oldLabel of oldLabels) {
            if (oldLabel.label_id == newLabel) {
                isNew = false;
                break;
            }
        }

        if (isNew) {
            let addLabelQuery = `
            INSERT INTO label_of_task (task_id, label_id)
            VALUES ('${data.taskId}','${newLabel}')
            `
            await db.executeQuery(addLabelQuery);
        }
    }

    //remove old labels
    for (let oldLabel of oldLabels) {
        let isOld = true;
        for (let newLabel of data.labels) {
            if (oldLabel.label_id == newLabel) {
                isOld = false;
                break;
            }
        }

        if (isOld) {
            let removeLabelQuery = `
            DELETE FROM label_of_task
            WHERE label_id='${oldLabel.label_id}' AND task_id='${data.taskId}'
            `
            await db.executeQuery(removeLabelQuery);
        }
    }

    
}

module.exports={randomIdGenerate,getTaskById,addTask,updateTaskById}