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
      let key = req.body.key;
      let img_subject = req.file;
      let path = img_subject.path.substring(6);
      const [course, field] = await conn.query(
        "INSERT INTO course(teacher_id, title, subtitle, img, s_key) VALUES(?, ?, ?, ?, ?)",
        [teacher_id, title, subtitle, path, key]
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
    res.json(subject);
  } catch (error) {
    res.json(error);
  }
});

router.post("/getSubjectStudent", async function (req, res, next) {
  let s_id = req.body.id;
  try {
    const [subject, field] = await pool.query(
      "SELECT * FROM s_course WHERE s_id = ?",
      [s_id]
    );
    res.json(subject);
  } catch (error) {
    res.json(error);
  }
});

router.post("/enrollCourse", async function (req, res, next) {
  let id = req.body.id;
  let course_id = req.body.course_id;
  try {
    const [addCourse, field] = await pool.query(
      "INSERT INTO s_course(c_id, s_id) VALUES(?, ?)",
      [course_id, id]
    );
    res.json("success");
  } catch (error) {
    res.json(error);
  }
});

router.post("/DeleteCourse", async function (req, res, next) {
  let course_id = req.body.course_id;
  try {
    const [getOldImg, fields] = await pool.query(
      "SELECT img from course WHERE course_id = ?",
      [course_id]
    );
    const [delCourse, field] = await pool.query(
      "DELETE FROM course WHERE course_id = ?;",
      [course_id]
    );
    const [userInCourse, field1] = await pool.query(
      "DELETE FROM s_course WHERE c_id = ?;",
      [course_id]
    );
    fs.unlink("./static" + getOldImg[0].img, (err) => console.log(err));
    res.json("success");
  } catch (error) {
    res.json(error);
  }
});

router.post("/getMember", async function (req, res, next) {
  let course_id = req.body.course_id;
  try {
    const [member, field] = await pool.query(
      "SELECT * FROM s_course WHERE c_id = ?",
      [course_id]
    );
    res.json(member.length);
  } catch (error) {
    res.json(error);
  }
});

router.post("/createLesson", async function (req, res, next) {
  let course_id = req.body.course_id;
  let u_id = req.body.u_id;
  let lessonCourse = req.body.lesson;
  console.log(course_id, lessonCourse, u_id)
  try {
    const [lesson, field] = await pool.query(
      "INSERT INTO lesson(lesson, c_id, u_id) VALUES(?, ?, ?)",
      [lessonCourse, course_id, u_id]
    );
    res.json("success");
  } catch (error) {
    res.json(error);
  }
});

router.post("/getLesson", async function (req, res, next) {
  let course_id = req.body.course_id;
  try {
    const [lesson, field] = await pool.query(
      "SELECT * FROM lesson WHERE c_id = ?",
      [course_id]
    );
    res.json(lesson);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
