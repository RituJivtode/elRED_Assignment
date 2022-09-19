const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const taskController =require("../controller/taskController")
const mid = require("../middleware/auth")


// For login User...
router.post("/login", userController.login)

// For register User...
router.post("/postTask", taskController.postTask)

// For uploading images...
router.patch("/editTask/:taskId", mid.Authentication, taskController.editTask)

// For uploading images...
router.delete("/deleteTask/:taskId", mid.Authentication, taskController.deleteTask)


module.exports=router;