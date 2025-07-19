import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["completed", "pending", "ongoing"],
        default: "pending",
    },
    deadline: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

export default Task;