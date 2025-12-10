const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

const connectDB = require("./config/connectDB");

// tạo biến userModel lấy data từ model-schema
const userModel = require("./models/user.model");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// register api
app.post("/api/register", async (req, res) => {
  // req : lấy thông tin từ người dùng gửi lên
  // res : thông tin từ server trả về
  const { fullName, email, password } = req.body;

  // lưu thông tin người dùng vào database
  const newUser = await userModel.create({
    // nếu các field trong Collection(tương tự Table trong sql) khác tên với{  fullName, email, password } = req.body; thì ->
    // fullName2: fullName,

    fullName,
    email,
    password,
  });
  return res.status(201).json({
    message: "Đăng ký thành công",
    metadata: newUser,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
