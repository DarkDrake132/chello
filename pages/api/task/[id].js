const Task=require('../../../models/taskModel')

async function handler(req, res) {
    if (req.method === "GET") {
        let data = await Task.getTaskById(req.query.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("Task not found")
        }
    }

    if (req.method === "PUT") {
        await Task.updateTaskById({...req.body,taskId:req.query.id});
        let data = await Task.getTaskById(req.query.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("Task not found")
        }
    }
}

export default handler;