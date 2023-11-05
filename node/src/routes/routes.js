const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get("/", (req, res) => {
  User.find()
    .then(resp => {
      res.json(resp)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

router.post("/", (req, res) => {
  console.log(req.body)
  User.create({
    comments: req.body.comments,
    category: req.body.category,
    subCategory: req.body.subCategory,
    process: req.body.process,
    date: req.body.date,
    status: false,
  })
    .then(res1 => {
      res.send(res1)
    })
    .catch(err => {
      res
        .status(400)
        .send("Kullanıcı oluşturulurken bir hata oluştu: " + err.message)
    })
})

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const updatedDate = req.body.date

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı")
    }

    user.date = updatedDate

    const updatedUser = await user.save()
    res.json(updatedUser)
  } catch (error) {
    res
      .status(500)
      .send("Kullanıcı güncellenirken bir hata oluştu: " + error.message)
  }
})

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const updatedData = {
      comments: req.body.comments,
      category: req.body.category,
      subCategory: req.body.subCategory,
      process: req.body.process,
      status: false,
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    })

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı")
    }

    res.json(user)
  } catch (error) {
    res
      .status(500)
      .send("Kullanıcı güncellenirken bir hata oluştu: " + error.message)
  }
})

router.delete("/:id/date", async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send("Kullanıcı bulunamadı")
    }

    user.date = undefined

    const updatedUser = await user.save()

    res.json(updatedUser)
  } catch (error) {
    res
      .status(500)
      .send("Kullanıcı tarihi silinirken bir hata oluştu: " + error.message)
  }
})

module.exports = router
