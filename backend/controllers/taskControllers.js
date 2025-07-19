import Task from "../models/taskSchema.js";

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find().sort({ createdAt: -1 });

    return res
      .status(200)
      .json({ msg: "fetch all tasks successfully", allTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch the tasks" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status, deadline } = req.body;

  try {
    const parsedDeadline = deadline ? new Date(deadline) : undefined;

    if (parsedDeadline && isNaN(parsedDeadline)) {
      return res.status(400).json({ msg: "Invalid date format" });
    }

    const task = new Task({
      title,
      description,
      status,
      deadline: parsedDeadline, // only assign if valid
    });

    await task.save();

    return res.status(201).json({ msg: "Task created successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create a task" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, deadline } = req.body;

  try {
    let existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(400).json({ msg: "Item not found" });
    }

    if (title) existingTask.title = title;
    if (description) existingTask.description = description;
    if (status) existingTask.status = status;
    if (deadline) existingTask.deadline = deadline;

    await existingTask.save();

    return res
      .status(200)
      .json({ msg: "Task updated successfully", existingTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to updated the task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    let existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(400).json({ msg: "Item not found" });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete the task" });
  }
};
