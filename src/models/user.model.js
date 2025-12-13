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

// fullName, email, password gọi là field, tương đương với cột (column) bên MySQL/PostgreSQL.
{
  /*
                    | MySQL    | MongoDB    |
                    | -------- | ---------- |
                    | Database | Database   |
                    | Table    | Collection |
                    | Row      | Document   |
                    | Column   | Field      |

 */
}
