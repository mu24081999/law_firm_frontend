import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import {
  PlusIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function TaskManagement() {
  const [viewMode, setViewMode] = useState("kanban");

  // Mock users data
  const users = [
    { id: "user1", name: "John Doe", avatar: null, initials: "JD" },
    { id: "user2", name: "Jane Smith", avatar: null, initials: "JS" },
    { id: "user3", name: "Mike Brown", avatar: null, initials: "MB" },
  ];

  // Mock tasks data
  const initialTasks = [
    {
      id: "task1",
      title: "Review Smith contract",
      description: "Check all clauses and provide feedback",
      status: "To Do",
      priority: "High",
      dueDate: "2023-10-25",
      assignedTo: "user1",
      case: "Smith vs. Anderson",
    },
    {
      id: "task2",
      title: "Draft motion for Johnson case",
      description: "Prepare motion to dismiss",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-10-22",
      assignedTo: "user2",
      case: "Johnson Corporation",
    },
    {
      id: "task3",
      title: "Schedule client meeting",
      description: "Set up Zoom call with Wilson client",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-10-26",
      assignedTo: "user3",
      case: "Wilson Estate",
    },
    {
      id: "task4",
      title: "Prepare for court hearing",
      description: "Gather all necessary documents",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-10-23",
      assignedTo: "user1",
      case: "Martin Injury",
    },
    {
      id: "task5",
      title: "Research legal precedents",
      description: "Find relevant cases for the Thompson case",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-10-28",
      assignedTo: "user3",
      case: "Thompson Custody",
    },
    {
      id: "task6",
      title: "File court documents",
      description: "Submit all paperwork for Smith case",
      status: "Review",
      priority: "Medium",
      dueDate: "2023-10-21",
      assignedTo: "user2",
      case: "Smith vs. Anderson",
    },
    {
      id: "task7",
      title: "Client intake process",
      description: "Complete new client onboarding",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-10-18",
      assignedTo: "user1",
      case: "New Clients",
    },
    {
      id: "task8",
      title: "Update billing records",
      description: "Enter billable hours for the week",
      status: "Completed",
      priority: "Low",
      dueDate: "2023-10-19",
      assignedTo: "user2",
      case: "Administrative",
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    assignedTo: "",
    case: "",
  });

  // Get kanban columns
  const kanbanColumns = [
    {
      id: "todo",
      title: "To Do",
      tasks: tasks.filter((task) => task.status === "To Do"),
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === "In Progress"),
    },
    {
      id: "review",
      title: "Review",
      tasks: tasks.filter((task) => task.status === "Review"),
    },
    {
      id: "completed",
      title: "Completed",
      tasks: tasks.filter((task) => task.status === "Completed"),
    },
  ];

  // Get priority badge class
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "badge-red";
      case "Medium":
        return "badge-blue";
      case "Low":
        return "badge-green";
      default:
        return "badge-blue";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Check if date is overdue
  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  // Handle moving a task to another column
  const handleMoveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handle new task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  // Handle task creation or update
  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(
        tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
      );
      setEditingTask(null);
    } else {
      const task = {
        ...newTask,
        id: uuidv4(),
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: "",
        assignedTo: "",
        case: "",
      });
    }

    setShowTaskModal(false);
  };

  // Open modal to edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Get user by ID
  const getUserById = (userId) => {
    return users.find((user) => user.id === userId) || null;
  };

  // Create a new task
  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  return (
    <div>
      <PageHeader
        title="Task & Workflow Management"
        subtitle="Manage your tasks, track progress, and improve your team's productivity"
        actions={
          <button
            className="btn btn-primary inline-flex items-center"
            onClick={handleNewTask}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            New Task
          </button>
        }
      />

      {/* View toggle and filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("kanban")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              viewMode === "kanban"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Kanban
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded text-sm font-medium ${
              viewMode === "list"
                ? "bg-primary-100 text-primary-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            List
          </button>
        </div>

        <div className="flex gap-2">
          <select className="form-input text-sm py-1 px-3">
            <option>All Cases</option>
            <option>Smith vs. Anderson</option>
            <option>Johnson Corporation</option>
            <option>Wilson Estate</option>
            <option>Martin Injury</option>
            <option>Thompson Custody</option>
          </select>

          <select className="form-input text-sm py-1 px-3">
            <option>All Users</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Mike Brown</option>
          </select>

          <select className="form-input text-sm py-1 px-3">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-6">
          {kanbanColumns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-72 bg-gray-50 rounded-lg"
            >
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800 flex items-center justify-between">
                  {column.title}
                  <span className="text-sm text-gray-500 font-normal">
                    {column.tasks.length}
                  </span>
                </h3>
              </div>

              <div className="p-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-sm p-3 mb-3"
                  >
                    <div className="flex justify-between">
                      <span
                        className={`badge ${getPriorityBadge(task.priority)}`}
                      >
                        {task.priority}
                      </span>

                      <div className="relative">
                        <button className="text-gray-500 hover:text-gray-700">
                          <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                        {/* Dropdown menu would go here */}
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-900 mt-2">
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description.length > 100
                          ? `${task.description.substring(0, 100)}...`
                          : task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span
                          className={
                            isOverdue(task.dueDate) &&
                            task.status !== "Completed"
                              ? "text-red-600 font-medium"
                              : ""
                          }
                        >
                          {formatDate(task.dueDate)}
                        </span>
                      </div>

                      {task.case && (
                        <div className="truncate max-w-[120px]">
                          {task.case}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {task.assignedTo && (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                            {getUserById(task.assignedTo)?.initials}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>

                        {column.id !== "completed" && (
                          <button
                            onClick={() => handleMoveTask(task.id, "Completed")}
                            className="p-1 text-gray-500 hover:text-green-600"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}

                        {column.id !== "inprogress" &&
                          column.id !== "completed" && (
                            <button
                              onClick={() =>
                                handleMoveTask(task.id, "In Progress")
                              }
                              className="p-1 text-gray-500 hover:text-primary-600"
                            >
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleNewTask}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                  + Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {task.title}
                          </div>
                          {task.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {task.description.length > 60
                                ? `${task.description.substring(0, 60)}...`
                                : task.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.case}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm flex items-center ${
                          isOverdue(task.dueDate) && task.status !== "Completed"
                            ? "text-red-600 font-medium"
                            : "text-gray-500"
                        }`}
                      >
                        {isOverdue(task.dueDate) &&
                          task.status !== "Completed" && (
                            <ExclamationCircleIcon className="w-4 h-4 mr-1 text-red-600" />
                          )}
                        {formatDate(task.dueDate)}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`badge ${getPriorityBadge(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                          {getUserById(task.assignedTo)?.initials}
                        </div>
                        <span className="text-sm text-gray-900">
                          {getUserById(task.assignedTo)?.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          task.status === "To Do"
                            ? "bg-gray-100 text-gray-800"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : task.status === "Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="text-primary-600 hover:text-primary-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingTask ? "Edit Task" : "New Task"}
              </h3>
              <button
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveTask();
              }}
            >
              <div className="mb-4">
                <label className="form-label" htmlFor="title">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  placeholder="Enter task title"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-input"
                  rows="3"
                  placeholder="Enter task description"
                  value={
                    editingTask ? editingTask.description : newTask.description
                  }
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="form-label" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="form-input"
                    value={editingTask ? editingTask.status : newTask.status}
                    onChange={handleInputChange}
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Review</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="form-input"
                    value={
                      editingTask ? editingTask.priority : newTask.priority
                    }
                    onChange={handleInputChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-input"
                  value={editingTask ? editingTask.dueDate : newTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="assignedTo">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  className="form-input"
                  value={
                    editingTask ? editingTask.assignedTo : newTask.assignedTo
                  }
                  onChange={handleInputChange}
                >
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="case">
                  Related Case
                </label>
                <input
                  type="text"
                  id="case"
                  name="case"
                  className="form-input"
                  placeholder="Enter related case"
                  value={editingTask ? editingTask.case : newTask.case}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskModal(false);
                    setEditingTask(null);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskManagement;
