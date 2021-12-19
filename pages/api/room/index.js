const Room=require('../../../models/roomModel')

async function handler(req, res) {
    // [POST] /api/room
    if (req.method === "POST") {
        let newId = Room.randomIdGenerate();
        await Room.addRoom({ ...req.body, roomId:newId });
        res.status(200).json({roomId:newId});
    }
}

export default handler;