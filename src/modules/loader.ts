/**
 * 加载模块
 */

import * as Path from "path";
import * as DB from "../lib/db";
import * as logger from "../lib/log";


// 配置
const config = require("../../config.json");


// 加载model
async function loaderModel(): Promise<any> {
    const models: any[] = config.MODELS;
    const opt: any[] = [];
    // 
    models.forEach((m) => {
        // 
        const mod = require(Path.join(process.cwd(), m.path));
        opt.push({
            name: m.name,
            mod: mod.Mod,
        });
    });
    await DB.schemaInit(opt);
}

export {loaderModel};
