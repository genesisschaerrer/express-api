const express = require("express")
const router = express.Router()

const Todos = require("../models/todoModel")

//Get 
router.get("/todos", (req, res) => {
    console.log("We got to our get route")
    res.end()
})

module.exports = router 