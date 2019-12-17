/**
 * 日志表
 */
const Oplog = {
    // 字段
    fields: [
        {name: "_id", type: "INT", unique: true},
        {name: "CreateTime", type: "INT"},
        {name: "Content", type: "VARCHAR(100)"},
    ],
    // 索引 多列和单列
    indexs: ["_id"],
    // 主键
    primary_key: ["_id"],
    // 外键
    foreign_key: [],
    name: "oplog",
};

export { Oplog as Mod };
