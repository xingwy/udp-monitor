/**
 * 端口监听服务
 */

// 模块
import * as Dgram from "dgram";
import * as Net from "net";
import * as Path from "path";
import * as logger from "./log";
import * as MsgPack from "./msgpack";

// 配置
const config = require("../../config.json");
const UDP_INFO: {Port: number, Host: string} = config.UDP_INFO;
const EVENT_MAP: {Handler: {name: string, path: string}} = config.EVENT_MAP;
// Todo 处理对应的数据  存入数据库
const handler = require(Path.join(process.cwd(), EVENT_MAP.Handler.path));

// UDP服务
const server = Dgram.createSocket("udp4");

server.on("connect", () => {
    logger.info(`UDP Server connect success`);
});

server.on("listening", () => {
    const addressInfo = <Net.AddressInfo> (server.address());
    logger.info(`UDP Server on listening host: ${addressInfo.address} port: ${addressInfo.port}`);
});

server.on("message", (msg: Buffer, rinfo: Dgram.RemoteInfo) => {
    // 处理消息
    // 数据转换
    const data = JSON.parse(msg.toString());
    // 加入任务队列
    handler.task.pushTask(data);
});

server.on("error", (err: Object) => {
    // 处理错误对象
});

server.on("close", () => {
    // 关闭连接
});

// 后面考虑抽出来， 在外面调用

function start() {
    server.bind(UDP_INFO.Port, UDP_INFO.Host);
}
// 导出模块
export {start};
