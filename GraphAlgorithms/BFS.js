const visitNodeBFS = async (queue, parentNode, node) => {
  queue.push(node)
  cellArray[node.row * COLUMNSIZE + node.col].className = "grid-cell visited";
  node.isVisited = true;
  node.previousNode = parentNode;
  await sleep(SPEED);
};

const bfsOfGraph = async () => {
  const queue = [grid[startCoordinates[0]][startCoordinates[1]]];
  await visitNodeBFS(queue, null, grid[startCoordinates[0]][startCoordinates[1]])
  while (queue.length) {
    let node = queue.shift();
    const i = node.row;
    const j = node.col;
    if (i !== 0 && !grid[i - 1][j].isVisited && !grid[i - 1][j].isWall) {
      await visitNodeBFS(queue, node, grid[i - 1][j])
      if (grid[i - 1][j].isFinish || !visualizerFlag) break;
    }
    if (j !== 0 && !grid[i][j - 1].isVisited && !grid[i][j - 1].isWall) {
      await visitNodeBFS(queue, node, grid[i][j - 1])
      if (grid[i][j - 1].isFinish || !visualizerFlag) break;
    }
    if (j !== COLUMNSIZE - 1 && !grid[i][j + 1].isVisited && !grid[i][j + 1].isWall) {
      await visitNodeBFS(queue, node, grid[i][j + 1])
      if (grid[i][j + 1].isFinish || !visualizerFlag) break;
    }
    if (i !== ROWSIZE - 1 && !grid[i + 1][j].isVisited && !grid[i + 1][j].isWall) {
      await visitNodeBFS(queue, node, grid[i + 1][j])
      if (grid[i + 1][j].isFinish || !visualizerFlag) break;
    }
  }
};
const quickVisitNodeBFS = (queue, parentNode, node) => {
  queue.push(node)
  // cellArray[node.row * COLUMNSIZE + node.col].className = "grid-cell quick-visit";
  node.isVisited = true;
  node.previousNode = parentNode;
  animationNodes.push(node);
};

const quickBfsOfGraph = () => {
  let destNode;
  animationNodes = []
  const queue = [grid[startCoordinates[0]][startCoordinates[1]]];
  quickVisitNodeBFS(queue, null, grid[startCoordinates[0]][startCoordinates[1]]);
  while (queue.length) {
    let node = queue.shift();
    const i = node.row;
    const j = node.col;
    if (i !== 0 && !grid[i - 1][j].isVisited && !grid[i - 1][j].isWall) {
      quickVisitNodeBFS(queue, node, grid[i - 1][j])
      if (grid[i - 1][j].isFinish) {
        destNode = animationNodes.length;
      };
    }
    if (j !== 0 && !grid[i][j - 1].isVisited && !grid[i][j - 1].isWall) {
      quickVisitNodeBFS(queue, node, grid[i][j - 1])
      if (grid[i][j - 1].isFinish) {
        destNode = animationNodes.length;
      };
    }
    if (j !== COLUMNSIZE - 1 && !grid[i][j + 1].isVisited && !grid[i][j + 1].isWall) {
      quickVisitNodeBFS(queue, node, grid[i][j + 1])
      if (grid[i][j + 1].isFinish) {
        destNode = animationNodes.length;
      };
    };
    if (i !== ROWSIZE - 1 && !grid[i + 1][j].isVisited && !grid[i + 1][j].isWall) {
      quickVisitNodeBFS(queue, node, grid[i + 1][j])
      if (grid[i + 1][j].isFinish) {
        destNode = animationNodes.length;
      };
    }
  }
  return destNode;
}
