import { useState, useEffect } from 'react';

const useMarkdownToJson = (Data) => {
  const [jsonData, setJsonData] = useState({});

  useEffect(() => {
    const transformMarkdownToJson = (markdown) => {
      const lines = markdown.split('\n');
      const root = { content: 'My Life', children: [] };
      let currentParent = root;
      let currentLevel = 0;

      lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('#')) {
          const level = trimmedLine.lastIndexOf('#') + 1;
          const content = trimmedLine.slice(level).trim();
          const node = {
            type: 'heading',
            depth: level,
            content: content,
            children: [],
          };

          if (level > currentLevel) {
            currentParent.children.push(node);
          } else {
            let tempParent = currentParent;
            while (level <= tempParent.depth) {
              tempParent = tempParent.parent;
            }
            tempParent.children.push(node);
          }

          node.parent = currentParent;
          currentParent = node;
          currentLevel = level;
        } else if (trimmedLine.startsWith('-')) {
          const content = trimmedLine.slice(1).trim();
          const node = { type: 'list_item', content: content, children: [] };
          currentParent.children.push(node);
        }
      });

      const removeParentRefs = (node) => {
        delete node.parent;
        node.children.forEach(removeParentRefs);
      };
      removeParentRefs(root);

      return root;
    };

    setJsonData(transformMarkdownToJson(Data));
  }, [Data]);

  return jsonData;
};

export default useMarkdownToJson;
