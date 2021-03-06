const express = require("express")
const router = express.Router()

const Todos = require("../models/todoModel")

//Get 
router.get("/todos", (req, res) => {
    Todos.find((err, todos) => {
        if(err){
            res.status(404).json({ message: "Get todos err", error: `${err}`})
        } else {
            res.status(200).json([
                ...todos.map((todo) => {
                    const {_id, title, done} = todo

                    return{ id: _id, title, done}
                })
            ])
        }
    })
})

//post 
router.post("/todo", (req, res) => {
    const todo = new Todos(req.body)

    todo
        .save()
        .then(todo => {
            const { _id, title, done} = todo
    
            res.status(201).json({id: _id, title, done})
        })
        .catch(err => {
            res.status(400).json({ message: "unable to post", errors: `${err}`})
        })
})

//patch
router.patch('/todo/:id', (req, res) => {
    Todos.findById(req.params.id, {}, {}, (err, todo) => {
        if(err){
            res.status(404).json({message: "Item not found", errors: `${err}`})
        } else {
            todo.done = req.body.done

            todo
            .save()
            .then((todo) => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res
                .status(400)
                .json({message: "Unable to update", errors: `${err}`})
            })
        }
    })
})

router.delete("/todo/delete/:id", (req, res) => {
    Todos.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err){
            res.status(404).json({message: "Could not delete", errors: `${err}`})
        } else {
            res.status(200).json({message: "deleted"})
        }
    })
})

module.exports = router 