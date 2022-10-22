const express = require("express");
const pool = require("../config");
const path = require("path");
const multer = require("multer");
const { json } = require("express");
const fs = require("fs");
const Joi = require("joi");
const router = express.Router();
let alert = require("alert");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/imgSubject");
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

router.post(
  "/addSubject",
  upload.single("img_subject"),
  async function (req, res, next) {
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      let teacher_id = req.body.teacherId;
      let title = req.body.title;
      let subtitle = req.body.subTitle;
      let img_subject = req.file;
      let path = img_subject.path.substring(6);
      const [course, field] = await conn.query(
        "INSERT INTO course(teacher_id, title, subtitle, img) VALUES(?, ?, ?, ?)",
        [teacher_id, title, subtitle, path]
      );
      await conn.commit();
      return res.json("success");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/getSubject", async function (req, res, next) {
  try {
    const [subject, field] = await pool.query("SELECT * FROM course");
    res.json(subject[0]);
  } catch (error) {
    res.json(error);
  }
});

router.get("/getSubjectStudent", async function (req, res, next) {
  try {
    const [subject, field] = await pool.query("SELECT * FROM s_course");
    res.json(subject[0]);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
