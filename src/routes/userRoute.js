const express = require('express')
const userController = require('../controllers/userController')
const controller = require('../controllers/controller')
const verifyTokeMiddleware = require('../middleware/verifyToken')

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/me', verifyTokeMiddleware.verifyToken, controller.aboutMe)
router.get("/:id", userController.getUserById);
router.post('/create', userController.createUser)

router.put("/update/:id", verifyTokeMiddleware.verifyToken,userController.updateUser);

router.delete("/delete/:id",userController.deleteUser);

module.exports = router