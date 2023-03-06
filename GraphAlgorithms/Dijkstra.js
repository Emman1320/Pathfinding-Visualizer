const updateNode = (queue, parentNode, node) => {
    if (!node.isWall) {
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
    }
};

const dijkstra = async () => {
    let startNode = grid[startCoordinates[0]][startCoordinates[1]];
    const queue = [startNode];
    startNode.distance = 0;
    startNode.isVisited = true;

    while (queue.length) {
        let node = queue.pop();
        const i = node.row;
        const j = node.col;
        cellArray[node.row * COLUMNSIZE + node.col].className = "grid-cell visited";
        if (node.isFinish || !visualizerFlag) return;
        await sleep(SPEED);

        if (i !== 0)
            updateNode(queue, node, grid[i - 1][j]);

        if (j !== COLUMNSIZE - 1)
            updateNode(queue, node, grid[i][j + 1]);

        if (i !== ROWSIZE - 1)
            updateNode(queue, node, grid[i + 1][j]);

        if (j !== 0)
            updateNode(queue, node, grid[i][j - 1]);

    }
};
const quickDijkstra = () => {
    let destNode;
    animationNodes = []
    let startNode = grid[startCoordinates[0]][startCoordinates[1]];
    const queue = [startNode];
    startNode.distance = 0;
    startNode.isVisited = true;
    while (queue.length) {
        let node = queue.pop();
        const i = node.row;
        const j = node.col;
        animationNodes.push(node);
        if (node.isFinish) { destNode = animationNodes.length };

        if (i !== 0)
            updateNode(queue, node, grid[i - 1][j]);

        if (j !== COLUMNSIZE - 1)
            updateNode(queue, node, grid[i][j + 1]);

        if (i !== ROWSIZE - 1)
            updateNode(queue, node, grid[i + 1][j]);

        if (j !== 0)
            updateNode(queue, node, grid[i][j - 1]);

    }
    return destNode;
};
