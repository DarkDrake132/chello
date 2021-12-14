function getNow() { // return current time in dd/mm/yyyy hh:mm:ss
    let raw = new Date();
    return `${raw.getFullYear()}-${
        raw.getMonth() + 1
    }-${raw.getDate()} ${raw.getHours()}:${raw.getMinutes()}:${raw.getSeconds()}`;
}

module.exports = {getNow}