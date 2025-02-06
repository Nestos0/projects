// server.js
const express = require("express");
const bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/api/account", async (req, res) => {
  // 解析用户提交的数据
  const { username, password, email } = req.body;

  try {
    // 使用参数化查询防止 SQL 注入
    const result = await client.query(
      `INSERT INTO users (username, password, email, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING id`,
      [username, password, email], // 参数化输入
    );

    console.log("数据库插入成功:", result.rows[0]);

    // 发送 JSON 响应，包含数据库返回的 id
    res.json({
      message: "表单提交成功！",
      data: { username, email, id: result.rows[0].id },
    });
  } catch (err) {
    if (err.code === "23505") {
      // 处理唯一约束冲突（用户名已存在）
      return res
        .status(409)
        .json({ error: "用户名已存在，请选择其他用户名。" });
    }
    console.error("查询错误:", err);
    res.status(500).json({ error: "查询数据库时发生错误" });
  }
});

// // 处理表单提交
// app.post("/submit", (req, res) => {
//   const { username, email } = req.body;

//   console.log("接收到的表单数据：");
//   console.log("请求体:", req.body);
//   console.log("用户名:", username);
//   console.log("邮箱:", email);

//   res.json({ message: "表单提交成功！", data: { username, email } });
// });

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
