
/**
 * 模块-日志
 */

import * as DB from "../lib/db";
import * as Time from "../lib/time";


async function exec(type: string, msg: any): Promise<void> {
    const ts = msg.ts;
    const name = `${type}_${Time.getWeekStr(ts)}`;
    const cond = msg.query;
    const data = msg.update;
    await DB.Update(name, cond, data);
}

export {exec};
