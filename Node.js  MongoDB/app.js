const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


const URI =
    "mongodb://drashti_db_user:bF7NIX93gJs5Q7dO@ac-esxighz-shard-00-00.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-01.vpzhayf.mongodb.net:27017,ac-esxighz-shard-00-02.vpzhayf.mongodb.net:27017/taskDB?ssl=true&replicaSet=atlas-v3js9p-shard-0&authSource=admin&retryWrites=true&w=majority";


mongoose .connect(URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err.message);
    });


// TASK SCHEMA
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// MODEL
const Task = mongoose.model("Task", taskSchema);


// CREATE TASK API
app.post("/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            message: "Task Created",
            data: task
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});


// GET TASKS API
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();

        res.json(tasks);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// DELETE TASK
app.delete("/tasks/:id", async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid Task ID"
            });
        }

        const deletedTask =
            await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task Deleted"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// UPDATE TASK
app.put("/tasks/:id", async (req, res) => {
    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // return updated document
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task Updated",
            data: updatedTask
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
app.get("/", (req, res) => {
    res.send("Hello Server");
});



app.listen(5000, () => {
    console.log("Server running on 5000");
});