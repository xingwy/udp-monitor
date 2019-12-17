/**
 * 时间工具, 获取时间数据
 */

const moment = require("moment");
const TIME = {
    ONE_DAY: 86400,
};
function getWeekStr(ts: number): string {
    const date = new Date(ts * 1000);
    date.setHours(0, 0, 0, 0);
    date.setTime(date.getTime() - ((date.getDay() === 0 ? 7 : date.getDay()) - 1) * TIME.ONE_DAY * 1000);
    return moment(date.getTime()).format("YYYYMMDD");
}

function getNowTime(ts?: number): number {
    const base = ts || Date.now();
    return Math.floor(base / 1000);
}

export { getWeekStr, getNowTime };
