import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Input, Select, Table } from "antd";
import { SquarePen, Trash2 } from "lucide-react";
import { Modal } from "antd";

function TaskHomePage() {
  const [taskData, setTaskData] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    deadline: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTaskData = async () => {
    try {
      const res = await api.get("/task");
      setTaskData(res.data.allTasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  const handleDelete = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      try {
        await api.delete(`/task/delete/${taskId}`);
        fetchTaskData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete the task.");
      }
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setNewTask((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await api.put(`task/update/${editTaskId}`, newTask);
      } else {
        await api.post("task/create", newTask);
      }

      setIsCreateModalOpen(false);
      fetchTaskData();

      // Reset form
      setNewTask({
        title: "",
        description: "",
        status: "pending",
        deadline: "",
      });

      setIsEditMode(false);
      setEditTaskId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline?.split("T")[0], // Ensure proper date input forma
    });
    setEditTaskId(task._id);
    setIsEditMode(true);
    setIsCreateModalOpen(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      width: 10,
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Action",
      dataIndex: "actions",
      width: 1,
      key: "actions",
      render: (text, record) => (
        <div className="flex justify-around">
          <button onClick={() => handleEdit(record)}>
            <SquarePen color="blue" />
          </button>
          <button onClick={() => handleDelete(record._id)}>
            <Trash2 color="red" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="relative mb-4">
        <h1 className="text-4xl text-blue-500 text-center underline">
          Todo List App
        </h1>

        <button
          className="absolute top-0 right-0 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          style={{ color: "white" }}
          onClick={() => {
            setNewTask({
              title: "",
              description: "",
              status: "pending",
              deadline: "",
            });
            setIsCreateModalOpen(true);
          }}
        >
          Create Task
        </button>
      </div>

      <div>
        <Table
          columns={columns}
          bordered
          dataSource={taskData}
          rowKey="_id"
          scroll={{ x: true }}
          pagination={{
            pageSize: 5, // Show 5 tasks per page
          }}
        />

        {/* Create Task Modal */}
        <Modal
          title={isEditMode ? "Edit Task" : "Create Task"}
          open={isCreateModalOpen}
          onCancel={() => {
            setIsCreateModalOpen(false);
            setNewTask({
              title: "",
              description: "",
              status: "pending",
              deadline: "",
            });
          }}
          onOk={handleSubmit}
          okText={isEditMode ? "Update" : "Create"}
        >
          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <Input
              name="title"
              value={newTask.title}
              placeholder="Enter title"
              onChange={handleTaskChange}
            />
            <label className="my-1">Description</label>
            <Input
              name="description"
              value={newTask.description}
              placeholder="Enter description"
              onChange={handleTaskChange}
            />
            <label className="my-1">Status</label>
            <Select
              name="status"
              value={newTask.status}
              options={[
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "ongoing", label: "Ongoing" },
              ]}
              onChange={handleStatusChange}
            />
            <label className="my-1">Deadline</label>
            <Input
              name="deadline"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={newTask.deadline}
              onChange={handleTaskChange}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default TaskHomePage;
