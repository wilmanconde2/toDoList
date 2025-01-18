import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import Item from './components/Item';

const App = () => {
  const [tasks, setTasks] = useState([]); 

  const addTask = () => {
    // Crear una nueva tarea vacía con id único
    const newTask = { id: uuidv4(), content: '' };
    setTasks([...tasks, newTask]); 
  };

  const deleteTask = (id) => {
    // Eliminar la tarea por id
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <Navbar onAddTask={addTask} />
      <div id="task-list">
        {tasks.map((task) => (
          <Item
            key={task.id}
            task={task}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
