/**
 * 日志表
 */
const Oplog = {
    // 字段
    fields: [
        {name: "index_inc", type: "INT",  increment: true, unique: true},
    ],
    // 索引 多列和单列
    indexs: ["index_inc"],
    // 主键
    primary_key: ["index_inc"],
    // 外键
    foreign_key: [],
    name: "oplog",
};

export { Oplog as Mod };
