/**
 * 任务队列
 */

export class Task {
    private taskQuene: any[];
    private isRun: boolean;
    private count: number;
    private done: any;
    constructor(done: any, count?: number) {
        this.isRun = false;
        // 最大一次消费数
        this.count = count || 100;
        // 执行方法
        this.done = done;
        this.taskQuene = [];
    }

    /**
     * 加入任务队列
     * @param msg 参数
     */
    public pushTask(msg: any) {
        // 加入任务
        this.taskQuene.push(msg);
        // 如果执行队列暂停 唤醒执行队列
        if (!this.isRun) {
            this.run();
        }
    }

    /**
     * 获取剩余任务长度
     */
    public getTaskLength(): number {
        return this.taskQuene.length;
    }

    /**
     * 执行任务队列
     */
    private async run(): Promise<void> {
        const max = Math.min(this.count, this.taskQuene.length);
        let index = 0;
        // logger.log(`任务长度：${this.getTaskLength()}  当前消费个数： ${max}`);
        while (index < max) {
            this.isRun = true;
            // 获取参数
            const param = this.taskQuene.shift();
            // 执行
            try {
                await this.done(param);
            } catch (error) {
                // 执行失败加入队尾  后期待优化
                this.taskQuene.push(param);
            }
            index++;
        }
        // 执行结束 退出消费
        this.isRun = false;
        return ;
    }

    // /**
    //  * 
    //  * @param msg 消息
    //  */
    // private async done(msg): Promise<boolean> {
    //     //  msg {type, data, cmd} 
    //     try {
    //         if (handleEvent.has(msg.cmd)) {
    //             const handler = handleEvent.get(msg.cmd);
    //             await handler.exec(msg.type, msg.data);
    //             return true;
    //         }
    //     } catch (error) {
    //         Logger.error(`执行出错，模块：${msg.cmd},错误参数：${error}`);
    //         return false;
    //     }
    //     return false;
    // }
}
