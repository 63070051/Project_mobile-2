const express = require("express");
const pool = require("../config");
const path = require("path");
const multer = require("multer");
const { json } = require("express");
const fs = require("fs");
const Joi = require("joi");
const router = express.Router();
let alert = require("alert");
let md5 = require('md5');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
        callback(
            null,
            file.originalname.split(path.extname(file.originalname))[0] +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage: storage });

router.post("/register/account", async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try{
        let profile = req.files
        let email = req.body.email;
        let password = req.body.password;
        let tokens = md5(password);
        if(profile == undefined){
            profile = "./static/assets/profile.webp"
        }
        const [user, field] = await conn.query(
          "INSERT INTO user(email, tokens, img) VALUES(?, ?, ?)",
          [email, tokens, profile]  
        );
        await conn.commit();
        return res.json("success");
    }
    catch(err){
        await conn.rollback();
        next(err);
    }
})

router.post("/login/account", async function (req, res, next) {
    try{
        let email = req.body.email;
        let password = req.body.password;
        let tokens = md5(password);
        const [checkuser, field] = await pool.query(
          "SELECT * FROM user WHERE email = ? AND tokens = ?",
          [email, tokens]  
        );
        return res.json(checkuser[0]);
    }
    catch(err){
        next(err);
    }
})

module.exports = router;