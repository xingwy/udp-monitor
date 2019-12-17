/**
 * 端口监听服务
 */

// 模块
import * as Dgram from "dgram";
import * as MsgPack from "../src/lib/msgpack";


let logIndex = 0;
let roleIndex = 0;

const server = Dgram.createSocket("udp4");

function createLog() {
    const data = {
        CreateTime: Date.now() / 1000,
        Content: `content ${ Date.now() / 1000} -- ${logIndex}`,
        ts: Date.now() / 1000,
        session: "ssaacadadsae" + logIndex,
    };
    const msg = {
        type: "acc_login",
        cmd: "oplog",
        data,
    };
    logIndex++;
    console.log("send Log", msg);
    server.send(JSON.stringify(msg), 9000, "0.0.0.0");
}
// {name: "role_id", type: "INT", unique: true},
//         {name: "User", type: "CHAR(20)", unique: true},
function createRole() {
    const data = {
        role_id: roleIndex,
        User: "User" + roleIndex,
    };
    roleIndex ++;
    const msg = {
        type: "insert",
        cmd: "role",
        data,
    };

    setTimeout(updateRole, 10000, roleIndex);
    console.log("send create role: ", msg);
    server.send(JSON.stringify(msg), 9000, "0.0.0.0");
}

function updateRole(id) {
    const data = {
        role_id: id,
        role: {
            User: "Update at" + roleIndex,
        },
    };
    const msg = {
        type: "update",
        cmd: "role",
        data,
    };
    console.log("send update role: ", msg);
    server.send(JSON.stringify(msg), 9000, "0.0.0.0");
}


setInterval(createLog, 50);
// setInterval(createRole, 2000);

