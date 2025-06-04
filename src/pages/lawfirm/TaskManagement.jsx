import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  deleteTaskApi,
  getUserTasksApi,
  updateTaskApi,
} from "../../redux/services/task";
import { getUserCasesApi } from "../../redux/services/case";
import { getUserMembersApi } from "../../redux/services/team";

function TaskManagement() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { tasks: tasksData } = useSelector((state) => state.task);
  const [viewMode, setViewMode] = useState("kanban");
  const { members } = useSelector((state) => state.team);
  const { cases } = useSelector((state) => state.case);
  // Mock users data
  const users = [
    { id: "user1", name: "John Doe", avatar: null, initials: "JD" },
    { id: "user2", name: "Jane Smith", avatar: null, initials: "JS" },
    { id: "user3", name: "Mike Brown", avatar: null, initials: "MB" },
  ];
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "medium",
    dueDate: "",
    assignTo: "",
    case: "",
  });
  const [filterCaseName, setFilterCaseName] = useState("All Cases");
  const [filterUser, setFilterUser] = useState("All Users");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [selectedTab, setSelectedTab] = useState("all");
  // Get kanban columns
  const kanbanColumns = [
    {
      id: "todo",
      title: "To Do",
      tasks: tasks?.filter((task) => task.status === "to-do"),
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: tasks?.filter((task) => task.status === "in-progress"),
    },
    {
      id: "review",
      title: "Review",
      tasks: tasks?.filter((task) => task.status === "review"),
    },
    {
      id: "completed",
      title: "Completed",
      tasks: tasks?.filter((task) => task.status === "completed"),
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
    dispatch(
      updateTaskApi(
        token,
        {
          status: newStatus,
        },
        taskId
      )
    );

    // setTasks(
    //   tasks.map((task) =>
    //     task.id === taskId ? { ...task, status: newStatus } : task
    //   )
    // );
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
      const task = {
        ...editingTask,
      };
      dispatch(updateTaskApi(token, task, editingTask?.id));
      // setTasks(
      //   tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
      // );
      setEditingTask(null);
    } else {
      const task = {
        ...newTask,
        userId: user?.id,
      };
      dispatch(addTaskApi(token, task));
      setTasks([...tasks, task]);
      setNewTask({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        dueDate: "",
        assignTo: "",
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
    dispatch(deleteTaskApi(token, taskId));
  };
  const filteredTasks = tasksData?.filter((caseItem) => {
    const statusMatch =
      selectedTab === "open"
        ? caseItem.status === "open"
        : selectedTab === "on-hold"
        ? caseItem.status === "on-hold"
        : selectedTab === "closed"
        ? caseItem.status === "closed"
        : true;

    const caseMatch =
      filterCaseName === "All Cases" || caseItem?.title === filterCaseName;

    const userMatch =
      filterUser === "All Users" || caseItem?.assigned_user === filterUser;

    const priorityMatch =
      filterPriority === "All Priorities" ||
      caseItem?.priority === filterPriority;

    return statusMatch && caseMatch && userMatch && priorityMatch;
  });

  // Get user by ID
  const getUserById = (userId) => {
    return users.find((user) => user.id === userId) || null;
  };

  // Create a new task
  const handleNewTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };
  useEffect(() => {
    dispatch(getUserTasksApi(token, user?.id));
  }, [dispatch, token, user]);
  useEffect(() => {
    if (Array.isArray(tasksData) && tasksData?.length > 0) {
      setTasks(tasksData);
    }
    return () => {};
  }, [tasksData]);
  useEffect(() => {
    dispatch(getUserCasesApi(token, user?.id));
    dispatch(getUserMembersApi(token, user?.id));
  }, [dispatch, token, user]);
  return (
    <div>
      <PageHeader
        title="Task & Workflow Management"
        subtitle="Manage your tasks, track progress, and improve your team's productivity"
        actions={
          <button
            className="bg-blue-500 text-white float-right ms-3 -mt-1 flex  px-3 py-1 rounded shadow-md"
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
          <select
            className="form-input text-sm py-1 px-3"
            value={filterCaseName}
            onChange={(e) => setFilterCaseName(e.target.value)}
          >
            <option>All Cases</option>
            {Array.from(new Set(tasksData?.map((c) => c.title))).map(
              (title) => (
                <option key={title}>{title}</option>
              )
            )}
          </select>

          <select
            className="form-input text-sm py-1 px-3"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
          >
            <option>All Users</option>
            {Array.from(new Set(tasksData?.map((c) => c.assigned_user))).map(
              (user) => (
                <option key={user}>{user}</option>
              )
            )}
          </select>

          <select
            className="form-input text-sm py-1 px-3"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
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
                      {task.assignTo && (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                            {getUserById(task.assignTo)?.initials}
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
                            onClick={() => handleMoveTask(task.id, "completed")}
                            className="p-1 text-gray-500 hover:text-green-600"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}

                        {column.id !== "inprogress" &&
                          column.id !== "completed" && (
                            <button
                              onClick={() =>
                                handleMoveTask(task.id, "in-progress")
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
                {filteredTasks?.map((task) => (
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
                          {getUserById(task.assignTo)?.initials}
                        </div>
                        <span className="text-sm text-gray-900">
                          {getUserById(task.assignTo)?.name}
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
              className="w-full max-w-2xl mx-auto bg-white rounded-2xl"
            >
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description"
                  value={
                    editingTask ? editingTask.description : newTask.description
                  }
                  onChange={handleInputChange}
                />
              </div>

              {/* Status & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editingTask ? editingTask.status : newTask.status}
                    onChange={handleInputChange}
                  >
                    <option value="to-do">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={
                      editingTask ? editingTask.priority : newTask.priority
                    }
                    onChange={handleInputChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingTask ? editingTask.dueDate : newTask.dueDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Assigned To */}
              <div className="mb-4">
                <label
                  htmlFor="assignTo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Assigned To
                </label>
                <select
                  id="assignTo"
                  name="assignTo"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={editingTask ? editingTask.assignTo : newTask.assignTo}
                  onChange={handleInputChange}
                >
                  <option value="">Select User</option>
                  {Array.isArray(members) &&
                    members?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstname + " " + user.lastname}
                      </option>
                    ))}
                </select>
              </div>

              {/* Related Case */}
              <select
                id="case"
                name="case"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editingTask ? editingTask.assignTo : newTask.assignTo}
                onChange={handleInputChange}
              >
                <option value="">Select Case</option>
                {Array.isArray(cases) &&
                  cases?.map((cs) => (
                    <option key={cs.id} value={cs.id}>
                      {cs.title}
                    </option>
                  ))}
              </select>
              {/* <div className="mb-6">
                <label
                  htmlFor="case"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Related Case
                </label>
                <input
                  type="text"
                  id="case"
                  name="case"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter related case"
                  value={editingTask ? editingTask.case : newTask.case}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskModal(false);
                    setEditingTask(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
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
