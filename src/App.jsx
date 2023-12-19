import './App.css'
import { useState, useEffect } from 'react'
import MindMap from './components/MindMap.jsx';

function App() {
  const [activeTasks, setActiveTasks] = useState([]);

  return (
    <>
  <MindMap activeTasks={activeTasks} setActiveTasks={setActiveTasks}/>
  <div className='active-task-list'>
    <ol>
      {
        activeTasks.map((task, index) => (
          <li key={index}>
            {task}
            </li>
        )
        )
      }
    </ol>
  </div>
    </>
  )
}

export default App
