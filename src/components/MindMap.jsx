import { useEffect, useRef } from 'react';
import Data from './Data.js';
import useMarkdownToJson from './MDtoJSON.jsx'

const MindMap = ( {setActiveTasks, activeTasks} ) => {
    const jsonData = useMarkdownToJson(Data)
    const mindMapRef = useRef(null);

    const getLeafNodeNames = (node) => {
        let leafNames = [];
        const traverse = (currentNode) => {
            if (!currentNode.children || currentNode.children.length === 0) {
                const textContent = currentNode.content.replace(/<[^>]*>/g, '');
                leafNames.push(textContent);
            } else {
                currentNode.children.forEach(child => traverse(child));
            }
        };
        traverse(node);
        return leafNames;
    }

    const addToTaskList = (newTask) => {
        if (newTask.target.localName === 'div' && newTask.target.__data__.children === null) { // Checking if the node is a legitimate target

            setActiveTasks(currentTasks => { // Functionally update the currentTasks array based on the node click state
                const taskContent = newTask.target.innerHTML;
                const isTaskActive = currentTasks.includes(taskContent);
        
                if (isTaskActive) {
                    return currentTasks.filter(task => task !== taskContent); // if the node is in the array, filter it out/remove it.
                } else if (currentTasks.length <= 6) {
                    return [...currentTasks, taskContent]; // otherwise, add it to the existing array if we have room (equal or under 6 active tasks)
                }
                return currentTasks;
            });
            
        }
    };

    const loadScripts = () => {
        const scripts = [
            'https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js',
            'https://cdn.jsdelivr.net/npm/markmap-view@0.15.4/dist/browser/index.js',
            'https://cdn.jsdelivr.net/npm/markmap-toolbar@0.15.4/dist/index.js'
        ];

        scripts.forEach(src => {
            let script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        const applyActiveTaskStyling = () => {
            document.querySelectorAll('.markmap-node div').forEach(node => {
                if (activeTasks.includes(node.innerHTML)) {
                    node.classList.add('task-selected');
                } else {
                    node.classList.remove('task-selected');
                }
            });
        };
    
        applyActiveTaskStyling();
    
    }, 
    [activeTasks, jsonData]);

    useEffect(() => {
        loadScripts();
        const initializeMarkmap = () => {
        const { markmap } = window;
        if (markmap && mindMapRef.current) {
            window.mm = markmap.Markmap.create(mindMapRef.current, null, jsonData);
        }
        };
        window.addEventListener('load', initializeMarkmap);
        // Cleanup
        return () => {
            window.removeEventListener('load', initializeMarkmap);
        };
    }, [jsonData]);

    return (
        <div>
            <svg ref={mindMapRef} onClick={(e) => addToTaskList(e)} style={{ width: '100vw', height: '100vh' }}></svg>
        </div>
    );
};

export default MindMap;
