import { useEffect, useRef } from 'react';
import Data from './Data.js';
import useMarkdownToJson from './TransformMD.jsx'

const MindMap = ( {setActiveTasks, activeTasks} ) => {
    const jsonData = useMarkdownToJson(Data)
    const mindMapRef = useRef(null);

    const getLeafNodeNames = (node) => {
    let leafNames = [];
  
    const traverse = (currentNode) => {
        if (!currentNode.children || currentNode.children.length === 0) {
            const textContent = currentNode.content.replace(/<[^>]*>/g, '');
            leafNames.push(textContent);
            console.log(textContent);
        } else {
            currentNode.children.forEach(child => traverse(child));
        }
    };

    traverse(node);
    return leafNames;
    }

    const addToTaskList = (newTask) => {
        console.log(getLeafNodeNames(jsonData));

        if (newTask.target.localName === 'div' && newTask.target.__data__.children === null)
            setActiveTasks([...activeTasks, newTask.target.innerHTML]);
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
