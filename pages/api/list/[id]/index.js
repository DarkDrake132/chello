const List=require('../../../../models/listModel')

async function handler(req, res) {
    // [GET] /api/list/{id}
    if (req.method === "GET") {
        let data = await List.getListById(req.query.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send("List not found")
        }
    }   
}

export default handler;