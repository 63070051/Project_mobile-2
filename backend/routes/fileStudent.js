const express = require("express");
const pool = require("../config");
const path = require("path");
const multer = require("multer");
const { json } = require("express");
const fs = require("fs");
const Joi = require("joi");
const router = express.Router();
let alert = require("alert");
let md5 = require("md5");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/fileStudent");
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
  "/uploadAssignment/file",
  upload.single("fileStudent"),
  async function (req, res, next) {
    const file = req.file;
    let h_id = req.body.h_id;
    let u_id = req.body.u_id;
    let d_id = req.body.d_id;
    let path = file.path.substring(6);
    let filename = req.body.filename;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const [s_file, field] = await conn.query(
        "INSERT INTO s_file(u_id, h_id, d_id, path, name, date) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP())",
        [u_id, h_id, d_id, path, filename]
      );
      const [getFile, fields] = await conn.query(
        "SELECT * FROM s_file WHERE s_id = ?",
        [s_file.insertId]
      );
      conn.commit();
      console.log(getFile)
      res.json(getFile[0]);
    } catch (error) {
      res.json("err");
      next(error);
    }
  }
);

router.post(
  "/updateAssignment/file",
  upload.single("fileStudent"),
  async function (req, res, next) {
    const file = req.file;
    let s_id = req.body.s_id;
    let h_id = req.body.h_id;
    let u_id = req.body.u_id;
    let d_id = req.body.d_id;
    let path = file.path.substring(6);
    let oldImg = req.body.path;
    let filename = req.body.filename;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const [s_file, field] = await conn.query(
        "UPDATE s_file SET u_id = ?, h_id = ?, d_id = ?, path = ?, name = ?, date = CURRENT_TIMESTAMP() WHERE s_id = ?",
        [u_id, h_id, d_id, path, filename, s_id]
      );
      const [getfile, field1] = await conn.query(
        "SELECT * FROM s_file WHERE s_id = ?",
        [s_id]
      );
      conn.commit();
      fs.unlink("./static" + oldImg, (err) => console.log(err));
      res.json(getfile);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/getFileStudent/id", async function (req, res, next) {
  let h_id = req.body.h_id;
  let d_id = req.body.d_id;
  let u_id = req.body.u_id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [getfile, field] = await conn.query(
      "SELECT * FROM s_file WHERE u_id = ? AND h_id = ? AND d_id = ?",
      [u_id, h_id, d_id]
    );
    conn.commit();
    res.json(getfile[0]);
  } catch (error) {
    next(error);
  }
});

router.post("/getAllFileStudent/lesson", async function (req, res, next) {
  let h_id = req.body.h_id;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [getfile, field] = await conn.query(
      "SELECT * FROM s_file WHERE h_id = ?",
      [h_id]
    );
    conn.commit();
    res.json(getfile);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/updateLesson/file",
  upload.array("fileSubject", 6),
  async function (req, res, next) {
    let course_id = req.body.course_id;
    let u_id = req.body.u_id;
    let h_id = req.body.h_id;
    const file = req.files;
    let data = req.body.data;
    let lessonCourse = req.body.lesson;
    let pathArray = [];
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
      const [lesson, field] = await conn.query(
        "UPDATE lesson SET lesson = ?, data = ?, c_id = ?, u_id = ? WHERE h_id = ?",
        [lessonCourse, data, course_id, u_id, h_id]
      );
      file.forEach((file, index) => {
        let path = [
          lesson.insertId,
          u_id,
          course_id,
          file.path.substring(6),
          file.originalname,
        ];
        pathArray.push(path);
      });
      const [getFile, f] = await conn.query(
        "SELECT * FROM file WHERE h_id = ?",
        [h_id]
      );
      getFile.forEach((value) => {
        fs.unlink("./static" + value.path, (err) => console.log(err));
      });
      const [delFile, fl] = await conn.query(
        "DELETE FROM file WHERE h_id = ?",
        [h_id]
      );
      const [fileSub, fil] = await conn.query(
        "INSERT INTO file(h_id, u_id, c_id, path, name) VALUES ?",
        [pathArray]
      );
      conn.commit();
      res.json("success");
    } catch (error) {
      next(error);
    }
  }
);
router.post("/updateLesson", async function (req, res, next) {
  let course_id = req.body.course_id;
  let u_id = req.body.u_id;
  let h_id = req.body.h_id;
  let data = req.body.data;
  let lessonCourse = req.body.lesson;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [lesson, field] = await conn.query(
      "UPDATE lesson SET lesson = ?, data = ?, c_id = ?, u_id = ? WHERE h_id = ?",
      [lessonCourse, data, course_id, u_id, h_id]
    );
    conn.commit();
    res.json("success");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
