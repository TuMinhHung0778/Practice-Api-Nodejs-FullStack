const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userModel, "users");

// userModel -> đây là Model đại diện cho collection trong MongoDB.
// users: Đây chính là collection (tương tự như "table" trong SQL).
// fullName, email, password: Đây là các field (hay còn gọi là thuộc tính/column trong SQL).

{
  /*
                     👉 Tóm lại:
- Trong MongoDB, ta không gọi là "table" mà gọi là collection.
- Các fullName, email, password được gọi là field (trường dữ liệu) trong document.
- Mỗi bản ghi trong collection được gọi là document (tương tự như "row" trong SQL).
 */
}
