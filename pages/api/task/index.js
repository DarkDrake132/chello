const Task=require('../../../models/taskModel')

async function handler(req, res) {
    if (req.method === "POST") {
        let newId = Task.randomIdGenerate();
        await Task.addTask({ ...req.body, newId });
        res.status(200).json({taskId:newId});
    }
}

export default handler;