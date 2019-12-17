/**
 * 加载模块
 */

import * as Path from "path";
import * as DB from "./lib/db";
import * as logger from "./lib/log";


// 配置
const config = require("../config.json");


// 加载model
async function loaderModel(): Promise<any> {
    const models: any[] = config.MODELS;
    const opt: any[] = [];
    // 加载配置模型
    models.forEach((m) => {
        // 引用模型
        const mod = require(Path.join(process.cwd(), m.path));
        opt.push({
            name: m.name,
            mod: mod.Mod,
        });
    });
    await DB.schemaInit(opt);
}
function loaderModules(): Map<string, any> {
    const modules: any[] = config.MODULES;
    const modulesMap: Map<string, any> = new Map();
    // 加载配置模块
    modules.forEach( (m) => {
        try {
            const mod = require(Path.join(process.cwd(), m.path));
            if (modulesMap.has(m.name)) {
                return ;
            }
            modulesMap.set(m.name, mod);
        } catch (error) {
            console.log(error);
        }
    });
    return modulesMap;
}
export {loaderModel, loaderModules};
