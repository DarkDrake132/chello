const List=require('../../../../models/listModel')

async function handler(req, res) {
    // [PUT] /api/list/{id}/removeTask
    if (req.method === "PUT"){
        await List.removeTaskFromList(req.body.taskId,req.query.id)
        let data = await List.getListById(req.query.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("List not found")
        }
    }
}

export default handler;