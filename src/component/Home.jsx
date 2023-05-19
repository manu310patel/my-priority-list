import React, { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStore from "../hooks/useLocalStore";
import { isEmpty } from "lodash";
import "./Home.scss";
import ".././global.scss";

const STORAGE_TOKEN = "priorityList";

const Home = () => {
  const {
    addTask,
    updateTask,
    deleteTask,
    getTasksFromStore,
    moveTaskUp,
    moveTaskDown,
  } = useLocalStore(STORAGE_TOKEN);

  const inputFormRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  const defaultNewTask = {
    id: uuidv4(),
    taskName: "",
    taskLink: "",
    isCompleted: false,
    srNo: tasks.length,
  };

  const [newTask, setNewTask] = useState(defaultNewTask);

  const updateTasks = () => {
    const dataFromLocalStorage = getTasksFromStore();
    console.log(dataFromLocalStorage);
    const tasksFromStorage = Object.values(dataFromLocalStorage);
    tasksFromStorage.sort((a, b) => (a.srNo > b.srNo ? -1 : 1));
    setTasks(tasksFromStorage);
    setNewTask({
      id: uuidv4(),
      taskName: "",
      taskLink: "",
      isCompleted: false,
      srNo: tasksFromStorage.length,
    });
  };

  useEffect(() => updateTasks(), []);

  const handleFormInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewTask((currentNewTask) => {
      return {
        ...currentNewTask,
        [name]: value,
      };
    });
  };

  const handleDelete = (id) => {
    deleteTask(id);
    updateTasks();
  };

  const handleEdit = (task) => {
    setNewTask(task);
    inputFormRef.current.focus();
    inputFormRef.current.scrollIntoView();
    deleteTask(task.id);

    const dataFromLocalStorage = getTasksFromStore();
    const tasksFromStorage = Object.values(dataFromLocalStorage);
    tasksFromStorage.sort((a, b) => (a.srNo > b.srNo ? -1 : 1));
    setTasks(tasksFromStorage);
  };

  const handleDone = (task) => {
    task.isCompleted = true;
    updateTask(task);
    updateTasks();
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    addTask(newTask);
    updateTasks();
  };

  const handleMoveTaskUp = (id) => {
    moveTaskUp(id);
    updateTasks();
  };

  const handleMoveTaskDown = (id) => {
    moveTaskDown(id);
    updateTasks();
  };

  return (
    <div className="todolist">
      <div className="title">
        <h1>Priority Task List</h1>
      </div>
      <form onSubmit={handleAddTask} ref={inputFormRef}>
        <div className="addTask m-2">
          <input
            className="addTaskInput"
            value={newTask?.taskName}
            type="text"
            name="taskName"
            onChange={handleFormInputChange}
            placeholder="Add a task........"
            required
          />
          <button type="submit" className="addtask-btn">
            Add Task
          </button>
        </div>
        <div className="addTask m-2">
          <input
            className="addTaskInput"
            value={newTask?.taskLink}
            type="text"
            name="taskLink"
            onChange={handleFormInputChange}
            placeholder="Add a task........"
          />
          <button type="submit" className="addtask-btn">
            Any Link To Add
          </button>
        </div>
      </form>

      <div className="lists">
        {!isEmpty(tasks) ? (
          <>
            {tasks.map((task, id) => (
              <div
                key={id}
                className={`list ${task.isCompleted ? "completed" : ""}`}
              >
                <div className="taskName">
                  <h5>
                    <a
                      href={task.taskLink ? task.taskLink : "#"}
                      target="_blank"
                    >
                      {task.taskName}
                    </a>
                  </h5>
                </div>

                <div className="span-btns">
                  <span
                    style={{ opacity: task.isCompleted ? "0" : "1" }}
                    onClick={() => handleDone(task)}
                    title="completed"
                  >
                    ✅
                  </span>
                  <span
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                    title="delete"
                  >
                    ❌
                  </span>
                  <span
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                    title="edit"
                  >
                    ➕
                  </span>
                  <span
                    className="edit-btn"
                    onClick={() => handleMoveTaskUp(task.id)}
                    title="up"
                    style={{
                      opacity: task.srNo + 1 == tasks.length ? "0.5" : "1",
                      pointerEvents:
                        task.srNo + 1 == tasks.length ? "none" : "auto",
                    }}
                  >
                    ⬆️
                  </span>
                  <span
                    className="edit-btn"
                    onClick={() => handleMoveTaskDown(task.id)}
                    title="down"
                    style={{
                      opacity: task.srNo == 0 ? "0.5" : "1",
                      pointerEvents: task.srNo == 0 ? "none" : "auto",
                    }}
                  >
                    ⬇️
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="noTask-message">Nothing To see here</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
