import React, { useEffect, useState } from 'react';
import '../styles/components/_Navbar.scss';

const Navbar = ({ onAddTask }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Cargar el tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.add(savedTheme); // Aplicar el tema cargado al body
    } else {
      setIsDarkMode(false); 
      // Si no hay tema en localStorage, establecer el tema claro por defecto
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light'); // Guardar el tema claro por defecto
    }
  }, []);

  // Actualizar la fecha cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Actualiza cada minuto

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Función para cambiar el tema
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';  // Cambiar de tema correctamente
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
    document.body.classList.toggle('light-theme', isDarkMode);
    localStorage.setItem('theme', newTheme); // Guardar el nuevo tema en localStorage
  };

  const formatDate = () => {
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2); 
    let hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    // AM o PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convertir hora formato 12 horas
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12';

    return `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
  };

  return (
    <>
      <h1>To Do List</h1>
      <div id="settings">
        <h2 id="date">{formatDate()}</h2> {/* Mostrar la fecha y hora */}
        <div id='theme'>
          <span id="themeSpan" onClick={toggleTheme} >
            <img id='themeImg' src="/theme.png" alt="theme" />
            {isDarkMode ? '' : ''}
          </span>
        </div>
        <span id="taskSpan" onClick={onAddTask} >
          <img id='plusImg' src="/plus.png" alt="addTask" />
        </span>
      </div>
    </>
  );
};

export default Navbar;
