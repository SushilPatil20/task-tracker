import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks();
      setTask(taskFromServer)
    }
    getTask()
  }, [])

  // Fetch tasks 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data;
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data;
  }




  // ------- Add task -------

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])


    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = { id, ...task };
    // setTask([...tasks, newTask]);
  };

  // ------- Delete Task -------
  const deleteTask = async (id) => {

    // Deleting on server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // Updating state
    setTask(tasks.filter((task) => task.id !== id));
  };

  // ------- Toggle Reminder -------
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json();


    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => {
            setShowAddTask(!showAddTask);
          }}
          showAdd={showAddTask}
        />

        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              ) : (
                "No task in the list"
              )}
            </>
          }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
