
/**
 * 获取时间段唯一key
 */
import * as DB from "./db";
import * as logger from "./log";
import * as util from "./util";

const model = "tskey";
class KeyInfo {
    public _allocAmount: number;
    constructor(public _key: number, public _index: number, public _end: number) {
        this._allocAmount = 10;
    }
}

export class TsKey {
    private _keys: KeyInfo[];
    private _limitAmount: number;
    private _curr: number;
    constructor() {
        this._keys = [];
        this._limitAmount = 5;
        this._curr = 0;
    }

    public normalizeKey(ts: number): number {
        return Math.floor(ts / 10) * 10;
    }

    public getKey(k: number): KeyInfo {
        // 每十秒会有一个新种子
        // console.log(this._keys);
        for (const key of this._keys) {
            if (key._key === k) {
                // key值缓存 以时间块区分
                return key;
            }
        }
        const info = new KeyInfo(k, 0, 0);
        // 缓存值
        this._keys[(this._curr++) % this._limitAmount] = info;
        return info;
    }
    public async genKey(ts: number): Promise<number> {
        // 新建keyInfo  normalizeKey  以十秒作为区间段
        const k = this.getKey(this.normalizeKey(ts));
        if (k._index >= k._end) {
            let result: any = {};

            try {
                result = await DB.FindOne(model, {ts: k._key});
                if (!util.isEmptyObject(result)) {
                    await DB.Insert(model, {ts: k._key, next: k._allocAmount});
                } else {
                    result.next += k._allocAmount;
                    await DB.Update(model, {ts: k._key}, {next: result.next});
                }
                result = await DB.FindOne(model, {ts: k._key});
            } catch (error) {
                logger.error(`查找key错误，无法生成key， 错误信息：${error}`);
            }

            k._index = 0;
            if (result.value && result.value.next) {
                k._index = result.value.next;
            }
            k._end = k._index + k._allocAmount;
            k._allocAmount *= 2;
        }
        k._index++;
        return ts * 0x80000 + k._index;
    }
}

