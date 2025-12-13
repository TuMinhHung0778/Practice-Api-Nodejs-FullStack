const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../auth/checkAuth");

const usersController = require("../controllers/users.controller");


// bọc asyncHandler vào các router này để client gửi request thì phải qua middleware là asyncHandler -> để nó check
router.post("/register", asyncHandler(usersController.register));
router.post("/login", asyncHandler(usersController.login));

module.exports = router;
