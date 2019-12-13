/**
 * 数据库连接管理
 */

//  模块引用
import * as Mysql from "mysql";
import * as logger from "./log";

// 配置
const config = require("../../config.json");
const MYSQL = config.MYSQL;
const MYSQL_ConfInfo = MYSQL.Conf;
const MAX_LIMIT = MYSQL.MaxLimit;

// 连接池表
const DB_POOLS: Map<string, Object> = new Map();

/**
 * @name connect - 连接池
 * @param name database名称
 * @param reconnect 是否重连
 */
function connect(name: string, reconnect: boolean = false): Object {
    const db_name: string = name || MYSQL_ConfInfo.database;
    if (reconnect || !DB_POOLS.has(db_name)) {
        DB_POOLS.set(db_name, Mysql.createPool(MYSQL_ConfInfo));
    }
    // 返回Map缓存
    return DB_POOLS.get(db_name);
}


function exec(sql: string, opt: Object = {}, name: string = MYSQL_ConfInfo.database): any {
    const db_name: string = name || MYSQL_ConfInfo.database;
    const pool: any = connect(db_name);
    return new Promise((ok, fail) => {
        try {
            // 获取连接池连接
            pool.getConnection( (err_con, res_con) => {
                if (err_con) {
                    // 异常错误 记录并重连执行
                    logger.error(`获取连接失败，错误信息：${JSON.stringify(err_con)}`);
                    connect(db_name, true);
                    exec(sql, opt, db_name);
                    return ;
                }
                const callback = (err_query, res_query) => {
                    if (err_query) {
                        // 语句执行失败
                        fail(err_query);
                        logger.error(`数据库操作失败，执行语句：${sql}，错误信息：${JSON.stringify(err_query)}`);
                    }
                    ok(res_query);
                };
                isEmptyObject(opt) ? res_con.query(sql, callback) : res_con.query(sql, opt, callback);
            });
        } catch (e) {
        }
    });
}

function isEmptyObject(opt: Object): boolean {
    if (JSON.stringify(opt) === "{}") {
        return false;
    }
    return true;
}
// 导出一个执行命令API  exec(sql);
export { exec };
