import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import Item from './components/Item';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage cuando la página se recarga
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Guardar tareas en localStorage cada vez que se actualiza el estado
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    const newTask = { id: uuidv4(), content: '' };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskContent = (id, content) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, content } : task
    ));
  };

  return (
    <>
      <div id='container'>
        <Navbar onAddTask={addTask} />
        <div id="task-list">
          {tasks.map((task) => (
            <Item
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onContentChange={updateTaskContent}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
