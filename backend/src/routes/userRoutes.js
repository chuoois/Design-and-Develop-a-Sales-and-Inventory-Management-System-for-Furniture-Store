const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const userController = require('../controllers/userController');

// POST /api/users - tạo user mới, upload avatar (field name: "avatar")
router.post('/', upload.single('avatar'), userController.createUser);

// GET /api/users - lấy danh sách user
router.get('/', userController.listUsers);

module.exports = router;
