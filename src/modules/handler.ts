/**
 * 执行模块
 */

import * as DB from "../lib/db";
/**
 * 
 * @param msg 消息
 */
async function execute(msg) {
    //  msg {type, data, cmd}
    const type: string = msg.type;
    switch (type) {
        case "insert": await DB.Insert(msg.cmd, msg.data); break;
        case "update": await DB.Update(msg.cmd, msg.data); break;
    }
}

export {execute};
