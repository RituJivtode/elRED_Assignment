const taskModel = require("../model/taskModel")
const mongoose = require("mongoose")



const isValid = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === null) {
        return false
    }
    if (typeof (value) === "number" && (value).toString().trim().length > 0) {
        return true
    }
    if (typeof (value) === "string" && (value).trim().length > 0) {
        return true
    }

}

const postTask = async function (req, res) {
    try {
        //reading input from request body
        let Body = req.body;

        if (Object.keys(Body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty, please provide input." })
        }


        if (!isValid(Body.taskId)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide taskId" });
        }
        //taskId format validation
        if (Body.taskId) {
            if (mongoose.Types.ObjectId.isValid(Body.taskId) == false) {
                return res
                    .status(400)
                    .send({ status: false, message: "taskId Invalid" });
            }
        }

        //mandatory fields
        if (!isValid(Body.name)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide name" });
        }

        //mandatory fields
        if (!isValid(Body.task)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide task" });
        }

        if (!isValid(Body.Date)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Date" });
        }

        //Date format("YYYY-MM-DD") validation
        const dateRgx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
            Body.Date
        );
        if (!dateRgx) {
            return res.status(400).send({
                status: false,
                message: "Please provide valid date formate YYYY-MM-DD",
            });
        }

        if (!isValid(Body.status)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide status" });
        }

        //Status enum validation
        if (!['Completed', 'Incomplete'].includes(Body.status)) {
            return res.status(400).send({
                status: false,
                message: "Status must be among these [Completed, Incomplete] ",
            });
        }



        //correct taskId validation
        let checktaskId = await userModel.findOne({ _id: Body.taskId });
        if (!checktaskId) {
            return res.status(404).send({ status: false, message: `user not found` });
        }

        //create Book authorization
        // const loggedtaskId = req.decodedToken.taskId;
        // if (loggedtaskId != Body.taskId) {
        //     return res.status(401).send({
        //         status: false,
        //         message: "Not authorised - use your own taskId",
        //     });
        // }

        //task posted
        let taskPosted = await taskModel.create(Body);
        res.status(201)
            .send({ status: true, message: "success", Body: taskPosted });
    } catch (err) {
        res.status(500).send({
            status: false,
            Error: "Server not responding",
            msg: err.message,
        });
    }
};


const editTask = async function (req, res) {
    try {
        let Body = req.body;

        const { taskId, task, Date, status, } = Body;

        if (Object.keys(Body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty, please provide input." })
        }


        if (!isValid(Body.taskId)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide taskId" });
        }
        //taskId format validation
        if (Body.taskId) {
            if (mongoose.Types.ObjectId.isValid(Body.taskId) == false) {
                return res
                    .status(400)
                    .send({ status: false, message: "taskId Invalid" });
            }
        }

        //mandatory fields
        if (!isValid(Body.task)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide task" });
        }

        if (!isValid(Body.Date)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide Date" });
        }

        //Date format("YYYY-MM-DD") validation
        const dateRgx = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(
            Body.Date
        );
        if (!dateRgx) {
            return res.status(400).send({
                status: false,
                message: "Please provide valid date formate YYYY-MM-DD",
            });
        }

        if (!isValid(Body.status)) {
            return res
                .status(400)
                .send({ status: false, message: "Please provide status" });
        }

        //Status enum validation
        if (!['Completed', 'Incomplete'].includes(Body.status)) {
            return res.status(400).send({
                status: false,
                message: "Status must be among these [Completed, Incomplete] ",
            });
        }



        let taskEdited = await taskModel.findByIdAndUpdate({ _id: taskId, isDeleted: false }, { $set: { task: task, Date: Date, status: status } }, { new: true });

        res.status(201).send({ status: true, msg: "done", Body: taskEdited });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}


const deleteTask = async function (req, res) {
    try {
        let taskId = req.params.taskId;
        let task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).send({ status: false, msg: "No such task exists" });
        }

        if (task.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "task not found, may be deleted" })
        }

        let user_id = task.userId;
        let id = req.userId;
        if (id != user_id) {
            return res.status(403).send({ status: false, msg: "Not authorized..!" });
        }

        let taskDeleted = await taskModel.findOneAndUpdate({ _id: taskId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true });
        res.status(200).send({ status: true, msg: "done", data: taskDeleted });
    }
    catch (err) {
        res.status(500).send({ status: false, msg: "Error", error: err.message })
    }
}



module.exports = { postTask, editTask, deleteTask }