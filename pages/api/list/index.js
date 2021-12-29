const List = require('../../../models/listModel')

async function handler(req, res) {
    // [POST] /api/list
    if (req.method === "POST") {
        let newId = List.randomIdGenerate();
        await List.addList({ ...req.body, listId:newId });
        res.status(200).json({listId:newId});
    }
}

export default handler;