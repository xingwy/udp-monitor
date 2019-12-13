/**
 * 用户表
 */
const User = {
    // 字段
    fields: [
        {name: "_id", type: "INT(4)",  increment: true, unique: true},
        {name: "field1", require: true, type: "CHAR(4)"},
        {name: "field2", require: true, type: "VARCHAR(20)", unique: true},
        {name: "field3", require: true, type: "VARCHAR(20)"},
        {name: "field4", require: true, type: "VARCHAR(20)"},
    ],
    // 索引 多列和单列
    indexs: ["_id"],
    // 主键
    primary_key: ["_id", "field1"],
    // 外键
    foreign_key: [],
    name: "User",
};

export { User as Mod };
