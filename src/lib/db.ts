/**
 * 数据库驱动 执行语句封装
 */

import * as logger from "./log";
import * as DB from "./mysql";


const modelMap: Map<string, any> = new Map();
const schemaMap: Map<string, any> = new Map();

/**
 * @name syncModels 同步表信息
 * @param model 模型名称
 */
async function syncModels(): Promise<any> {
    try {
        const res =  await DB.exec(`SHOW TABLES;`);
        // 缓存表信息 存入Map
        res.forEach( (r) => {
            if (modelMap.has(r.Tables_in_game_log)) {
                return ;
            }
            modelMap.set(r.Tables_in_game_log, r);
        });
        console.log(modelMap);
        return res;
    } catch (err) {
        logger.error(`同步数据表失败，原因：${err}`);
    }
}
/**
 * @name CreateModel 创建模型
 * @param model 模型名称
 * @param opt 表Schema
 */
async function CreateModel(model: string, opt: any, recreate: boolean = false): Promise<any> {
    try {
        if (modelMap.has(model) && !recreate) {
            logger.info(`数据表：${model} 已存在，无需新建`);
            return false;
        }
        const res = await DB.exec(`CREATE TABLE ${recreate ? "" : "IF NOT EXISTS"} ${model} (${parseTabOpt(opt)}) ENGINE=InnoDB DEFAULT CHARSET=utf8;`);
        await syncModels();
        return res;
    } catch (err) {
        logger.error(`新建数据表失败，原因：${err}`);
        return false;
    }
}

/**
 * 
 * @param model 模型名称
 * @param opt 实例对象 
 */
async function Insert(model: string, opt: Object): Promise<any> {
    // 插入数据
    try {
        if (!modelMap.has(model)) {
            CreateModel(model, schemaMap.get(model));
        }
        const data = fieldsCheck(model, opt);
        if (!data) {
            throw new Error(`字段检查失败`);
        }
        return await DB.exec(`INSERT INTO ${model} ${fieldFormat(data)}`);
    } catch (err) {
        logger.error(`插入数据失败, 模型名称：${model}, 源数据：${JSON.stringify(opt)}, 原因：${err}`);
    }
}

async function Update(model: string, opt: Object): Promise<any> {
    return false;
}
async function Delete(model: string, opt: Object): Promise<any> {
    return false;
}
async function Find(model: string, opt: Object): Promise<any> {
    return false;
}

async function FindOne(model: string, opt: Object): Promise<any> {
    return false;
}
/**
 * 
 * @param opt 
 */
function parseTabOpt(opt: {fields: any[], indexs: string[], primary_key: string[], foreign_key: string[]}): string {
    // 字段描述
    let str: string = "";
    const fields: any[] = opt.fields;

    fields.forEach((f) => {
        str += `${f.name} ${f.type}`;

        // 是否有默认值
        if (f.hasOwnProperty("default")) {
            str += ` DEFAULT ${f.default}`;
        }
        // 是否必填字段
        if (f.hasOwnProperty("require") && f.require) {
            str += " NOT NULL";
        }
        // 是否唯一
        if (f.hasOwnProperty("unique") && f.unique) {
            str += ` UNIQUE`;
        }
        // 是否自增
        if (f.hasOwnProperty("increment") && f.increment) {
            str += ` AUTO_INCREMENT`;
        }
        str += ",";
    });
    // 指定主键
    const primary_key: string[] = opt.primary_key;
    if (primary_key && primary_key.length) {
        str += `PRIMARY KEY (${primary_key.join(",")}),`;
    }
    // 创建索引
    const indexs: string[] = opt.indexs;
    if (indexs && indexs.length) {
        str += `INDEX (${indexs.join(",")}),`;
    }
    // 删除末尾 符号
    str = str.substring(0, str.length - 1);
    return str;
}

/**
 * @name fieldsCheck 字段检查
 * @param model 
 * @param opt 
 */
function fieldsCheck(model: string, opt: any): any {
    // 失败返回false值， 成功模型实例对象
    if (!schemaMap.has(model)) {
        return false;
    }
    const Mod = schemaMap.get(model);
    const fields = Mod.fields;
    const result = {};
    for (const field of fields) {
        // 存在直接赋值
        if (opt.hasOwnProperty(field.name)) {
            result[field.name] = opt[field.name];
        } else {
            // 检查是否为必需字段
            if (!field.hasOwnProperty("require") || !field.require) {
                continue;
            }
            return false;
        }
    }
    return result;
}

/**
 * 
 * @param model 
 * @param opt 
 */

function fieldFormat(opt: any): string {
    let value = "";
    let key = "";
    // tslint:disable-next-line:forin
    for (const k in opt) {
        key += `${k},`;
        value += (typeof opt[k] === "string" ? `'${opt[k]}'` : opt[k]) + ",";
    }
    // 删除末尾 符号
    key = key.substring(0, key.length - 1);
    value = value.substring(0, value.length - 1);
    return `(${key}) VALUES (${value});`;
}
async function schemaInit(opt: any[]): Promise<void> {
    // schemaMap init 缓存表配置
    opt.forEach( async (o) => {
        if (!schemaMap.has(o.name)) {
            schemaMap.set(o.name, o.mod);
        }
    });
    console.log(schemaMap);
    return ;
}

export {CreateModel, Insert, Update, Delete, Find, FindOne, syncModels, schemaInit};
