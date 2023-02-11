const visitNodeDFS = async (node, visited) => {
  cellArray[node].className = "grid-cell visited";
  visited[node] = true;
  await sleep(50);
};
const dfsOfGraph = async (startNumber) => {
  const visited = [];
  for (let i = 0; i < NO_OF_NODES; i++) {
    visited.push(false);
  }
  const stack = [];
  stack.push(startNumber);
  while (stack.length) {
    let node = stack.pop();
    if (visualizerFlag) {
      await visitNodeDFS(node, visited);
      for (let i = adjacencyList[node].length - 1; i >= 0; i--) {
        const childNode = adjacencyList[node][i];
        if (!visited[childNode]) {
          stack.push(childNode);
        }
      }
    } else {
      return;
    }
  }
};
