const db = require('./db')
const utils=require('../utils')

function randomIdGenerate() {
    return `RO${Date.now().toString(16)}`
}

async function addRoom(data) {
    var query = `
        INSERT INTO room (room_id, name, created_at, is_hidden)
        VALUES ('${data.roomId}','${data.roomName}','${utils.getNow()}',false)
    `
    await db.executeQuery(query);
}

module.exports = {randomIdGenerate,addRoom}

