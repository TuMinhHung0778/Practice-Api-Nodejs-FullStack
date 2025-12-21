// có thể viết theo 2 kiểu class hoặc funtion component
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const { createAccesToken, createRefreshToken } = require("../auth/checkAuth");

const {
  ConflictRequestError,
  NotFoundError,
  AuthFailureError,
} = require("../core/error.response");

const { Created } = require("../core/success.response");

class UserController {
  // method api
  // Khi client gửi request POST lên endpoint này, callback (req, res) sẽ chạy.
  async register(req, res) {
    // Lấy dữ liệu từ phần body của request (JSON gửi từ client). Sử dụng destructuring để lấy 3 trường fullName, email, password.
    const { fullName, email, password } = req.body;

    // Gọi Mongoose: userModel.findOne({ email }) sẽ truy vấn collection users để tìm document có trường email bằng giá trị client gửi.
    const findUser = await userModel.findOne({ email });
    // Nếu đã có user dùng email này, lập tức trả về HTTP status 400 Bad Request.
    if (findUser) {
      // return res.status(400).json({
      //   messagge: "Email đã tồn tại",
      // });
      throw new ConflictRequestError("Email đã tồn tại");
    }

    // saltRounds là số vòng mã hóa của bcrypt. Con số càng lớn → hash càng an toàn → mất nhiều thời gian xử lý hơn.
    const saltRounds = 10;
    // tạo biến hashedPassword và dùng bcrypt.hash() để mã hóa mật khẩu user. Không bao giờ lưu password thô vào database, phải hash trước.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Tạo một user mới trong MongoDB.
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // response thong tin api
    new Created({
      message: "Đăng ký thành công",
      metadata: newUser,
    }).send(res);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    // check email & passwrod có chính xác không
    if (!findUser) {
      throw new NotFoundError("Tài khoản hoặc mật khẩu không chính xác!");
    }
    // decode password đã hash
    const isMathPassword = await bcrypt.compare(password, findUser.password);
    // password : mật khẩu user gửi lên |  findUser.password : mật khẩu user đã mã hóa

    if (!isMathPassword) {
      throw new AuthFailureError("Tài khoản hoặc mật khẩu không chính xác");
    }

    // nếu vượt qua hết các case trên thì return về cho user 1 cái token - install library 'npm i jsonwebtoken'
    const accessToken = createAccesToken({ id: findUser._id });
    const refreshToken = createRefreshToken({ id: findUser._id });
  }
}

module.exports = new UserController(); // 11:56
