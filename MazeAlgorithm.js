const updateMazeNode = (queue, parentNode, node) => {
    if (!node.isVisited) {
        node.previousNode = parentNode;
        node.isVisited = true;
        node.distance = parentNode.distance + node.weight + 1;
        for (let i = queue.length - 1; i >= 0; i--) {
            if (node.distance < queue[i].distance) {
                queue.splice(i + 1, 0, node);
                return;
            }
        }
        queue.unshift(node);
    }
    else if (node.distance > parentNode.distance + node.weight + 1) {
        node.previousNode = parentNode;
        node.distance = parentNode.distance + node.weight + 1;
        for (let i = 0; i < queue.length; i++) {
            if (node === queue[i]) {
                let j = i + 1;
                while (j < queue.length && (queue[j].distance > node.distance)) {
                    queue[j - 1] = queue[j];
                    j = j + 1;
                }
                queue[j - 1] = node;
                break;
            }
        }
    }
};

const MazeAlgorithm = async () => {
    mazeBoardButton.disabled = true;
    clearBoardButton.disabled = true;
    if (selectedAlgorithm.length)
        startButton.disabled = true;
    for (let i = 0; i < ROWSIZE; i++) {
        for (let j = 0; j < COLUMNSIZE; j++) {
            cellArray[i * COLUMNSIZE + j].className = "grid-cell";
            grid[i][j].isWall = false;
            grid[i][j].isVisited = false;
            if (grid[i][j].weight) {
                grid[i][j].weight = 0;
                cellArray[i * COLUMNSIZE + j].removeChild(cellArray[i * COLUMNSIZE + j].childNodes[1]);
            }
            if (i % 2 == 0 || j % 2 == 0) {
                grid[i][j].isWall = true;
            } else {
                grid[i][j].weight = parseInt(Math.random() * 100);
            }
        }
    }
    grid[startCoordinates[0]][startCoordinates[1]].isWall = false;
    grid[destCoordinates[0]][destCoordinates[1]].isWall = false;
    let startNode = grid[1][1];
    const queue = [startNode];
    startNode.isVisited = true;
    startNode.distance = 0;
    startNode.previousNode = false;
    while (queue.length) {
        let node = queue.pop();
        const i = node.row;
        const j = node.col;
        if (node.previousNode) {

            let connectionRow = (node.row + node.previousNode.row) / 2;
            let connectionCol = (node.col + node.previousNode.col) / 2;
            grid[connectionRow][connectionCol].isWall = false;
        }

        if (i !== 1)
            updateMazeNode(queue, node, grid[i - 2][j]);

        if (j !== COLUMNSIZE - 2)
            updateMazeNode(queue, node, grid[i][j + 2]);

        if (i !== ROWSIZE - 2)
            updateMazeNode(queue, node, grid[i + 2][j]);

        if (j !== 1)
            updateMazeNode(queue, node, grid[i][j - 2]);

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
    mazeBoardButton.disabled = false;
    clearBoardButton.disabled = false;
    if (selectedAlgorithm.length)
        startButton.disabled = false;
};
