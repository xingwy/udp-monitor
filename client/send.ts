/**
 * 端口监听服务
 */

// 模块
import * as Dgram from "dgram";
import * as MsgPack from "../src/lib/msgpack";


let i = 0;
const server = Dgram.createSocket("udp4");
setInterval(function() {
    const data = {
        field1: "" + (i % 1000),
        field2: "field2_" + i,
        field3: "field3_" + i,
        field4: "field4_" + i,
    };
    const msg = {
        type: "insert",
        cmd: "User",
        data,
    };
    i++;
    console.log("send", msg);
    server.send(JSON.stringify(msg), 9000, "0.0.0.0");
    },
// tslint:disable-next-line:align
10000);

