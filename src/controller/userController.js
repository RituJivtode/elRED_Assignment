const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const nodemailer = require ("nodemailer") 
require ("dotenv").config() // env variables


const isValid = function(value) {
    if (typeof(value) === 'undefined' || typeof(value) === null) {
        return false
    }
    if (typeof(value) === "number" && (value).toString().trim().length > 0) {
        return true
    }
    if (typeof(value) === "string" && (value).trim().length > 0) {
        return true
    }

}




// nodemailer stuff
let transporter = nodemailer.createTransport ( {
  service : " gmail " ,
 auth : {
    user : process.env.AUTH_EMAIL ,
    pass : process.env.AUTH_PASS ,
 }
} )
   
// testing success
transporter.verify ( ( error , success ) => {
  if ( error ) {
    console.log ( error ) ;
 } else {
    console.log ( " Ready for messages " ) ;
    console.log ( success ) 
 }
})


const login = async function(req, res) {
    try {

        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        //****------------------- Email validation -------------------****** //

        if (!isValid(body.email)) {
            return res.status(400).send({ status: false, msg: "Email is required" })
        };

        // For a Valid Email...
        if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(body.email))) {
            return res.status(400).send({ status: false, message: ' Email should be a valid' })
        };

        //******------------------- password validation -------------------****** //

        if (!isValid(body.password)) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }

        //******------------------- checking User Detail -------------------****** //


        let checkUser = await userModel.findOne({ email: body.email });

        if (!checkUser) {
            return res.status(401).send({ Status: false, message: "email is not correct" });
        }

        let passwordMatch = await userModel.findOne({password:body.password})
        if (!passwordMatch) {
            return res.status(401).send({ status: false, msg: "incorect password" })
        }
        //******------------------- generating token for user -------------------****** //
        let userToken = jwt.sign({

            UserId: checkUser._id,
            batch: "Uranium"

        }, 'elRED_Project', { expiresIn: '30s' }); // token expiry for 30s

        return res.status(200).send({ status: true, message: "User login successfull", data: { userId: checkUser._id, token: userToken } });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = {login}