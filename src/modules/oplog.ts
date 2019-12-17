/**
 * 模块-日志
 */

import * as DB from "../lib/db";
import * as Time from "../lib/time";
import { TsKey } from "../lib/ts_key";

const tsKey: TsKey = new TsKey();
let nowTime;

async function exec(type: string, msg: any): Promise<any> {
    // 设置时间戳 单位 秒
    const ts = msg.ts || nowTime;
    // 组合数据表名
    const name = `${type}_${Time.getWeekStr(ts)}`;
    const key = await tsKey.genKey(ts);
    // 唯一标识id
    msg._id = key;
    // 插入数据 msg
    return await DB.Insert(name, msg);
}

function onTimer(ts?: number): void {
    nowTime = Time.getNowTime(ts);
    return ;
}

export {exec, onTimer};
