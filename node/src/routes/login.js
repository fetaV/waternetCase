const express = require("express")
const router = express.Router()
const user = require("../models/user")

router.post("/", (req, res) => {
  user
    .find({
      comments: req.body.comments,
      category: req.body.category,
      subCategory: req.body.subCategory,
      process: req.body.process,
      date: req.body.date,
    })
    .then(res1 => {
      if (res1.length > 0) {
        res.send("Kullanıcı Onaylandı, Giriş Yapıldı")
      } else {
        res.send("Kullanıcı adı veya Şifre yanlış")
      }
    })
})

module.exports = router
