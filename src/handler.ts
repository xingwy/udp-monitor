/**
 * 执行模块
 */

import * as DB from "./lib/db";
import * as Logger from "./lib/log";
import * as Loader from "./loader";
import {Task} from "./modules/common/task";

// 加载业务模块
const handleEvent: any = Loader.loaderModules();


async function execute(msg): Promise<boolean> {
    //  msg {type, data, cmd} 
    try {
        if (handleEvent.has(msg.cmd)) {
            const handler = handleEvent.get(msg.cmd);
            await handler.exec(msg.type, msg.data);
            return true;
        }
    } catch (error) {
        Logger.error(`执行出错，模块：${msg.cmd},错误参数：${error}`);
        return false;
    }
    return false;
}

let task = new Task(execute);

export {task};
