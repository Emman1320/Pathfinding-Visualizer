
const randomizedDFS = async (rivery) => {
    grid[1][1].previousNode = null;
    grid[startCoordinates[0]][startCoordinates[1]].isStart = false;
    grid[1][1].isStart = true;
    startCoordinates = [1, 1]
    cellArray[COLUMNSIZE + 1].appendChild(startSymbol);

    grid[destCoordinates[0]][destCoordinates[1]].isFinish = false;
    grid[ROWSIZE - 2][COLUMNSIZE - 2].isFinish = true;
    destCoordinates = [ROWSIZE - 2, COLUMNSIZE - 2]
    cellArray[NO_OF_NODES - COLUMNSIZE - 2].appendChild(destSymbol);

    const stack = [grid[1][1]]
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (i % 2 == 0 || j % 2 == 0) {
                grid[i][j].isWall = true;
            }
        }
    }
    while (stack.length) {
        let node;
        if (rivery) {
            node = stack.pop();
        } else {
            if (Math.random() < 0.8)
                node = stack.pop();
            else
                node = stack.splice(parseInt(Math.random() * stack.length), 1)[0];
        }
        node.isVisited = true;
        const i = node.row;
        const j = node.col;
        if (node.previousNode) {
            let connectionRow = (node.row + node.previousNode.row) / 2;
            let connectionCol = (node.col + node.previousNode.col) / 2;
            cellArray[connectionRow * COLUMNSIZE + connectionCol].className = "grid-cell";
            grid[connectionRow][connectionCol].isWall = false;
            grid[connectionRow][connectionCol].isVisited = true;
        }
        let unvisitedNeighbours = [];
        if (j !== 1 && !grid[i][j - 2].isVisited) {
            unvisitedNeighbours.push(grid[i][j - 2]);
            grid[i][j - 2].previousNode = node;
        }
        if (i !== ROWSIZE - 2 && !grid[i + 2][j].isVisited) {
            unvisitedNeighbours.push(grid[i + 2][j]);
            grid[i + 2][j].previousNode = node;
        }
        if (j !== COLUMNSIZE - 2 && !grid[i][j + 2].isVisited) {
            unvisitedNeighbours.push(grid[i][j + 2]);
            grid[i][j + 2].previousNode = node;
        }
        if (i !== 1 && !grid[i - 2][j].isVisited) {
            unvisitedNeighbours.push(grid[i - 2][j]);
            grid[i - 2][j].previousNode = node;
        }
        if (unvisitedNeighbours.length) {
            let nextIndex = parseInt(Math.random() * unvisitedNeighbours.length);
            stack.push(node);
            stack.push(unvisitedNeighbours[nextIndex]);
        }

    }
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            if (grid[i][j].isWall) {
                cellArray[i * COLUMNSIZE + j].className = "grid-cell pulseAnimation wall";
                await sleep(0);
            }
            grid[i][j].isVisited = false;
            grid[i][j].previousNode = null;
            grid[i][j].weight = 0;
        }
    }
};
