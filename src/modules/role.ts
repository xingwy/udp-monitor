
/**
 * 模块-角色
 */

import * as DB from "../lib/db";

const name = "role";

async function exec(type: string, msg: any): Promise<void> {
    // 判断操作方式
    const role_id = msg.role_id;
    if (type === "insert") {
        await DB.Insert(name, msg);
    } else if (type === "update") {
        await DB.Update(name, {role_id}, msg.role);
    }
}

export {exec};

