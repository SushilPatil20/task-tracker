import { useState } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);

  // ------- Add task -------

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000 + 1);

    const newTask = { id, ...task };
    setTask([...tasks, newTask]);
  };

  // ------- Delete Task -------
  const deleteTask = (id) => {
    setTask(tasks.filter((task) => task.id !== id));
  };

  // ------- Toggle Reminder -------
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => {
          setShowAddTask(!showAddTask);
        }}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No task in the list"
      )}
    </div>
  );
}

export default App;
