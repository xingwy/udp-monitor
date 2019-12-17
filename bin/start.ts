
import * as DB from "../src//lib/db";
import * as server from "../src/lib/listen";
import * as Load from "../src/loader";
async function start() {
    await DB.syncModels();
    await Load.loaderModel();
    // 开启数据监控服务 
    server.start();
}

start();


// 入口文件，

