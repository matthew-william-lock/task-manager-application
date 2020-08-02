const express = require('express')

// Load middleware
const auth = require('../middleware/auth')

// Create router
const router = new express.Router()

// Load Models
const Task = require('../models/task')

// Task Creation End Point
router.post('/tasks', auth, async (req,res)=>{

    // Add user id to task
    const new_task = new Task({
        ...req.body,
        userId:req.user.id
    })
    
    // Save task object
    try {
        const task = await new_task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})

// Fetch tasks endpoint
// GET /tasks?completed=true
// GET /tasks?limit=1&skip=20
// GET /tasks?sortBy=createdAt:asc or createdAt:dsc
router.get('/tasks',auth, async (req,res)=>{

    // Skipping and limiting
    const match = {}
    if(req.query.completed){
        if(req.query.completed!="true"&& req.query.completed!="false") return res.status(400).send()
        req.query.completed == "true"
    }

    // Sorting
    const sort={}
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1]== "desc" ? -1 : 1
    }
    
    try {
        await req.user.populate({
            path:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        const tasks = req.user.tasks
        if(!tasks){
            return res.status(404)
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send()
    }
})

// Fetch single task endpoint
router.get('/tasks/:id', auth,async (req,res)=>{

    const id = req.params.id

    try {
        // const task = await Task.findById(id)
        const task = await Task.findOne({
            _id:id,
            userId:req.user.id
        })

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task);
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }

})

// Update task endpoint
router.patch('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']    
    const isValidOperation = updates.every((item)=>allowedUpdates.includes(item))
    if(!isValidOperation){
        return res.status(400).send({"error":"Invalid updates!"})
    }
    try {
        // Make sure middle ware runs
        const task = await Task.findOne({
            _id:req.params.id,
            userId: req.user._id
        })        

        if (!task){
            return res.status(404).send()
        }

        updates.forEach((update)=>{
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)

    } catch (error) {
        res.status(400).send(error)
    }

})

// Delete tasks endpoint
router.delete('/tasks/:id',auth,async(req,res)=>{

    try {
        const task = await Task.findOneAndDelete({
            _id:req.params.id,
            userId: req.user._id
        }) 
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router
