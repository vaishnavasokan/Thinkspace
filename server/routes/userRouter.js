const { getCurrentUser } = require('../middleware/userSession')
const authMiddleware = require("../middleware/auth")
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
const jwt = require('jsonwebtoken');
var user = require("../model/user");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post("/register", function (req, res) {

    var u1 = new user()
    const reqBody = req.body
    console.log("reqBody : ", reqBody);
    u1.userName = reqBody.userName;
    u1.email = reqBody.email;
    u1.password = reqBody.password
    u1.save((err) => {
        if (err)
            throw err;
        else {
            res.send({ message: 'User Account Created!', statusCode: 200 })
        }
    })
})

router.post("/login", function (req, res) {
    user.findOne({ userName: req.body.userName, password: req.body.password }, function (err, result) {
        if (err) {
            throw err
        }
        else if (result) {
            const userData = result
            const token = jwt.sign({ uid: userData._id }, 'api_key')
            console.log("userData   : ", userData);
            console.log("userToken   : ", token);
            res.send({ message: "Login Successful!", responseArray: { userData: result, apiToken: token }, statusCode: 200 });
        }
        else
            res.send({ message: "Invalid Login!", statusCode: 500 });
    })
})

router.get("/getUserDetails", authMiddleware, function (req, res) {

    const userId = getCurrentUser() !== null ? getCurrentUser().uid : null
    user.findOne({ _id: userId }, function (err, result) {
        if (err)
            res.send({ message: "User Not found!", statusCode: 500 });
        else {
            const userData = result
            res.send({ responseArray: { userData: userData }, statusCode: 200 });
        }
    })
})

module.exports = router;