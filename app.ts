// import * as dgram from 'dgram';
// import * as fs from 'fs';
// import * as http from 'http';
// import * as net from 'net';
import * as Path from "path";
import * as DB from "./src//lib/db";
import * as server from "./src/lib/listen";
import * as logger from "./src/lib/log";
import * as Load from "./src/modules/loader";
// import {init} from "./src/lib/mysql";

// global.appRoot = Path.resolve(__dirname);

async function start() {
    await DB.syncModels();
    await Load.loaderModel();
    // 开启数据监控服务 
    server.start();
}

start();


// 入口文件，

