const express = require("express");
const pool = require("../config");
const path = require("path");
const multer = require("multer");
const { json } = require("express");
const fs = require("fs");
const Joi = require("joi");
const router = express.Router();
let alert = require("alert");


router.get("/getSubject", async function (req, res, next) {
    try {
        const [subject, field] = await pool.query(
            "SELECT * FROM course"
        );
        res.json(subject[0]);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
