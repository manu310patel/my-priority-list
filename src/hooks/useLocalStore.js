const useLocalStore = (storageToken) => {
  const getTasksFromStore = () => {
    try {
      const stringifiedData = localStorage.getItem(storageToken);
      const dataFromLocalStorage = JSON.parse(stringifiedData);
      return dataFromLocalStorage || {};
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  const saveTasksToStore = (allTasks) => {
    try {
      const stringifiedData = JSON.stringify(allTasks);
      localStorage.setItem(storageToken, stringifiedData);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = (newTask) => {
    const allTasks = getTasksFromStore();
    const newAllTasks = { ...allTasks, [newTask.id]: newTask };

    try {
      saveTasksToStore(newAllTasks);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = (id) => {
    const allTasks = getTasksFromStore();
    delete allTasks[id];
    saveTasksToStore(allTasks);
  };

  const updateTask = (updatedTask) => {
    const allTasks = getTasksFromStore();
    const idOfTaskToUpdate = updatedTask.id;
    allTasks[idOfTaskToUpdate] = updatedTask;
    saveTasksToStore(allTasks);
  };

  const moveTaskUp = (id) => {
    const allTasks = getTasksFromStore();

    const currentTask = allTasks[id];

    const srNo = currentTask.srNo;

    const taskAbove = Object.values(allTasks).find(
      (task) => task.srNo === srNo + 1
    );

    updateTask({ ...taskAbove, srNo: taskAbove.srNo - 1 });
    updateTask({ ...currentTask, srNo: srNo + 1 });
  };

  const moveTaskDown = (id) => {
    const allTasks = getTasksFromStore();

    const currentTask = allTasks[id];

    const srNo = currentTask.srNo;

    const taskBelow = Object.values(allTasks).find(
      (task) => task.srNo === srNo - 1
    );

    updateTask({ ...taskBelow, srNo: taskBelow.srNo + 1 });
    updateTask({ ...currentTask, srNo: srNo - 1 });
  };

  return {
    addTask,
    updateTask,
    deleteTask,
    getTasksFromStore,
    moveTaskUp,
    moveTaskDown,
  };
};

export default useLocalStore;
