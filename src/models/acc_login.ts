/**
 * 登录记录表
 */
const Acc_login = {
    // 字段
    fields: [
        {name: "_id", type: "bigint", unique: true},
        {name: "session", type: "CHAR(40)", unique: true},
        {name: "Content", type: "CHAR(100)"},
        {name: "CreateTime", type: "bigint"},
    ],
    // 索引 多列和单列
    indexs: ["session"],
    // 主键
    primary_key: ["session"],
    // 外键
    foreign_key: [],
    name: "acc_login",
};

export { Acc_login as Mod };
