const visitNode = async (node, queue, visited, cellArray) => {
  queue.push(node);
  cellArray[node].className = "grid-cell visited";
  visited[node] = true;
  await sleep(50);
};

const bfsOfGraph = async (startNode, V, adj, cellArray) => {
  const visited = [];
  for (let i = 0; i < V; i++) {
    visited.push(false);
  }
  const queue = [];

  await visitNode(startNode, queue, visited, cellArray);

  while (queue.length) {
    let node = queue.shift();
    for (let i = 0; i < V; i++) {
      if (visualizerFlag) {
        if (adj[node][i] && !visited[i]) {
          await visitNode(i, queue, visited, cellArray);
        }
      } else {
        return;
      }
    }
  }
};
