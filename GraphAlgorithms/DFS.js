const visitNodeDFS = async (node) => {
  if (node.isVisited) {
    cellArray[node.row * COLUMNSIZE + node.col].className = "grid-cell";
    await sleep(5);
  }
  cellArray[node.row * COLUMNSIZE + node.col].className = "grid-cell visited";
  node.isVisited = true;
  await sleep(SPEED);
};
const dfsOfGraph = async () => {
  const stack = [grid[startCoordinates[0]][startCoordinates[1]]];
  while (stack.length && visualizerFlag) {
    let node = stack.pop();
    await visitNodeDFS(node);
    if (node.isFinish || !visualizerFlag) return;
    const i = node.row;
    const j = node.col;
    if (j !== 0 && !grid[i][j - 1].isVisited && !grid[i][j - 1].isWall) {
      stack.push(grid[i][j - 1]);
      grid[i][j - 1].previousNode = node;
    }
    if (i !== ROWSIZE - 1 && !grid[i + 1][j].isVisited && !grid[i + 1][j].isWall) {
      stack.push(grid[i + 1][j]);
      grid[i + 1][j].previousNode = node;
    }
    if (j !== COLUMNSIZE - 1 && !grid[i][j + 1].isVisited && !grid[i][j + 1].isWall) {
      stack.push(grid[i][j + 1]);
      grid[i][j + 1].previousNode = node;
    }
    if (i !== 0 && !grid[i - 1][j].isVisited && !grid[i - 1][j].isWall) {
      stack.push(grid[i - 1][j]);
      grid[i - 1][j].previousNode = node;
    }
  }
};
