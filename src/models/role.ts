/**
 * 角色表
 */
const Oplog = {
    // 字段
    fields: [
        {name: "role_id", type: "INT", unique: true},
    ],
    // 索引 多列和单列
    indexs: ["role_id"],
    // 主键
    primary_key: ["role_id"],
    // 外键
    foreign_key: [],
    name: "role_id",
};

export { Oplog as Mod };
