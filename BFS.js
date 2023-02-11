const visitNodeBFS = async (node, queue, visited) => {
  queue.push(node);
  cellArray[node].className = "grid-cell visited";
  visited[node] = true;
  await sleep(50);
};

const bfsOfGraph = async (startNode) => {
  const visited = [];
  for (let i = 0; i < NO_OF_NODES; i++) {
    visited.push(false);
  }
  const queue = [];

  await visitNodeBFS(startNode, queue, visited);

  while (queue.length) {
    let parentNode = queue.shift();
    for (let i = 0; i < adjacencyList[parentNode].length; i++) {
      if (visualizerFlag) {
        const childNode = adjacencyList[parentNode][i];
        if (!visited[childNode]) {
          await visitNodeBFS(childNode, queue, visited);
        }
      } else {
        return;
      }
    }
  }
};
