const express = require("express");
const pool = require("../config");
const path = require("path");
const multer = require("multer");
const { json } = require("express");
const fs = require("fs");
const Joi = require("joi");
const router = express.Router();
let alert = require("alert");


router.get("/getUser", async function (req, res, next) {
    try {
        const [allUser, field] = await pool.query(
            "SELECT * FROM user"
        );
        res.json(allUser);
    } catch (error) {
        res.json(error);
    }
});

router.get("/getUserId", async function (req, res, next) {
    try {
        let email = req.body.email;
        const [user, field] = await pool.query(
            "SELECT * FROM user WHERE email = ?", 
            [email]
        );
        res.json(user[0]);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
