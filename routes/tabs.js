const express = require("express")
const router = express.Router()
const Message = require('../models/Message')

//routing

router.get("/", (req,res) => {
    res.send("Tabs List")
})

router.get("/weather", (req,res) => {
    res.render("index", {text: 'passed object'})
})

router.get("/cities", (req,res) => {
    res.render("cities", {text: 'passed object'})
})

router.get("/map", (req,res) => {
    res.render("map", {text: 'passed object'})
})

router.get("/settings", (req,res) => {
    res.render("settings", {text: 'passed object'})
})

router.post("/settings/feedback", (req,res) => {
    //res.send(req.body)

    const newMessage = new Message({
        email: req.body.emailName,
        message: req.body.messageName,
    })
    newMessage.save();

    res.render("settings", {text: 'passed object'})
})

module.exports = router