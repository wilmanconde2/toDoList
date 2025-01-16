import React, { useState } from 'react';
import Navbar from './components/Navbar';

const App = () => {
  const [addTask, setAddTask] = useState();

  return (
    <>
      <Navbar />

      <div id='container'>
        <div className='input-group mb-3'>
          <div className='input-group-text'>
            <input
              className='form-check-input mt-0'
              type='checkbox'
              aria-label='Checkbox for following text input'
            />
          </div>
          <input type='text' className='form-control' aria-label='Text input with checkbox' />
        </div>
      </div>
    </>
  );
};

export default App;
