// server.js
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // 只允许 Vue 开发服务器访问
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// 配置 PostgreSQL 数据库连接参数
const client = new Client({
  user: "fictyra-db", // 数据库用户名
  host: "localhost", // 数据库服务器地址
  database: "fictyra_db", // 数据库名称，确保已创建
  password: "Fictyra861111!", // 数据库密码（请替换为你的密码）
  port: 5432, // 数据库端口（默认 PostgreSQL 端口）
});

// 连接到数据库
client
  .connect()
  .then(() => console.log("已连接到数据库"))
  .catch((err) => console.error("数据库连接错误:", err.stack));

// 定义根路由，查询数据库并展示数据
app.get("/api/novels_db", async (req, res) => {
  try {
    // 示例查询：从 novels 表中获取前 10 条记录（请确保数据库中存在该表）
    const result = await client.query(
      "SELECT id, title, author, description, cover_image FROM novels ORDER BY id LIMIT 10",
    );

    res.send(result.rows);
  } catch (err) {
    console.error("查询错误:", err);
    res.status(500).send("查询数据库时发生错误");
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
