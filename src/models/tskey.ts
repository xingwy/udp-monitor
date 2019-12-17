/**
 * 登录记录表
 */

const Acc_login = {
    // 字段
    fields: [
        {name: "_id", type: "INT", increment: true, unique: true},
        {name: "ts", type: "bigint", unique: true},
        {name: "next", type: "INT"},
    ],
    // 索引 多列和单列
    indexs: ["ts"],
    // 主键
    primary_key: ["ts"],
    // 外键
    foreign_key: [],
    name: "tskey",
};

export { Acc_login as Mod };
