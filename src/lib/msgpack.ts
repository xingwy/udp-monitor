/**
 * 数据格式
 */
const msgpack = require("msgpack5")();

function encode(data) {
    return msgpack.encode(data).toString("hex");
}
function decode(data) {
    return msgpack.decode(Buffer.from(data, "hex"));
}

export {msgpack, encode, decode};
