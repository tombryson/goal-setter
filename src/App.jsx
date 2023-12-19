import './App.css'
import { useState, useEffect } from 'react'
import MindMap from './components/MindMap.jsx';

function App() {
  const [activeTasks, setActiveTasks] = useState(["task1", "task2"]);

  function applyActiveTaskStyling() {
      const tasks = document.getElementsByClassName("markmap-node");

      console.log(tasks);

      if (tasks && tasks.length > 0) {
        const tasksArray = [Array.from(tasks[0])];
        console.log(tasksArray);
      }

  }

  useEffect(() => {
      applyActiveTaskStyling();
  },
  [])

  return (
    <>
  <MindMap activeTasks={activeTasks} setActiveTasks={setActiveTasks}/>
  <div>
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
