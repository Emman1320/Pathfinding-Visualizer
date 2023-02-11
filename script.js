let gridHtml = "";
let visualizerFlag = false;
const startCoordinates = [7, 18];
const ROWSIZE = 16;
const COLUMNSIZE = 38;
const NO_OF_NODES = ROWSIZE * COLUMNSIZE;
let selectedAlgorithm = "";
// let adjacencyMatrix = [];
let adjacencyList = [];

// initialize adjacencyMatrix with 0s
for (let i = 0; i < NO_OF_NODES; i++) {
  let row = [];
  for (let j = 0; j < NO_OF_NODES; j++) {
    row.push(0);
  }
  // adjacencyMatrix.push(row);
  adjacencyList.push([]);
}

// grid formation and fill adjacent matrix with 1 for every edge
for (let rowNumber = 0; rowNumber < ROWSIZE; rowNumber++) {
  gridHtml += `<tr id='row-${rowNumber}'>`;
  for (let cellNumber = 0; cellNumber < COLUMNSIZE; cellNumber++) {
    gridHtml += `<td id='cell-${rowNumber}-${cellNumber}' class='grid-cell' ondrop='onDropStartNode(event)' ondragover="allowDropHandler(event)"></td>`;
    const index = rowNumber * COLUMNSIZE + cellNumber;
    const topIndex = index - COLUMNSIZE;
    const bottomIndex = index + COLUMNSIZE;

    if (topIndex >= 0) {
      // adjacencyMatrix[index][topIndex] = 1;
      // adjacencyMatrix[topIndex][index] = 1;
      adjacencyList[index].push(topIndex);
    }
    if ((index + 1) % COLUMNSIZE != 0) {
      // adjacencyMatrix[index][index + 1] = 1;
      // adjacencyMatrix[index + 1][index] = 1;
      adjacencyList[index].push(index + 1);
    }
    if (bottomIndex < NO_OF_NODES) {
      // adjacencyMatrix[index][bottomIndex] = 1;
      // adjacencyMatrix[bottomIndex][index] = 1;
      adjacencyList[index].push(bottomIndex);
    }
    if (index % COLUMNSIZE != 0) {
      // adjacencyMatrix[index][index - 1] = 1;
      // adjacencyMatrix[index - 1][index] = 1;
      adjacencyList[index].push(index - 1);
    }
  }
  gridHtml += "</tr>";
}
document.getElementById("grid-container").innerHTML = gridHtml;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// function pausecomp(millis)
// {
//     var date = new Date();
//     var curDate = null;
//     do { curDate = new Date(); }
//     while(curDate-date < millis);
// }

const allowDropHandler = (event) => {
  event.preventDefault();
};

const onDragStartNode = (event) => {};

const onDropStartNode = (event) => {
  event.preventDefault();
  event.target.appendChild(startSymbol);
  startNodeElement.className = "grid-cell";
  startNodeElement = event.target;
  startNodeElement.className = "grid-cell start-node";
  startCoordinates[0] = +startNodeElement.id.split("-")[1];
  startCoordinates[1] = +startNodeElement.id.split("-")[2];
};

// array of grid cells DOM
const cellArray = document.getElementsByClassName("grid-cell");

//function to clear the board and stop the visualizer
const clearBoard = () => {
  visualizerFlag = false;
  startSymbol.draggable = true;
  startButton.innerText = "Start";
  startButton.disabled = false;
  for (let i = 0; i < NO_OF_NODES; i++) {
    cellArray[i].className = "grid-cell";
  }
};

const pauseVisualizer = () => {
  visualizerFlag = false;
  startButton.innerText = "start";
  startButton.disabled = true;
};

const startVisualizerHandler = async (e) => {
  if (visualizerFlag) {
    pauseVisualizer();
  } else {
    visualizerFlag = true;
    startSymbol.draggable = false;
    startButton.innerText = "Stop";
    const startNumber = startCoordinates[0] * COLUMNSIZE + startCoordinates[1];
    if (selectedAlgorithm === "Breadth First Search")
      await bfsOfGraph(startNumber);
    else if (selectedAlgorithm === "Depth First Search")
      await dfsOfGraph(startNumber);
    visualizerFlag = false;
    startButton.innerText = "start";
  }
};

//the starting cell
let startNodeElement = document.getElementById(
  `cell-${startCoordinates[0]}-${startCoordinates[1]}`
);
startNodeElement.innerHTML =
  "<img id='start-node-image' src='./assets/navigation_symbol.png' alt='' />";
startNodeElement.className = "grid-cell start-node";
let startSymbol = startNodeElement.firstChild;
startSymbol.draggable = true;
startSymbol.addEventListener("dragstart", onDragStartNode);

const startButton = document.getElementById("start-button");
startButton.disabled = true;

const dropdownElement = document.getElementById("dropdown-container");
const selectAlgorithmButton = document.getElementById("select-algorithm");

const dropdownHandler = (event) => {
  if (dropdownElement.style.display == "none")
    dropdownElement.style.display = "block";
  else dropdownElement.style.display = "none";
};

const selectAlgorithmHandler = (algorithm) => {
  selectedAlgorithm = algorithm;
  selectAlgorithmButton.children[0].innerText = algorithm;
  startButton.disabled = false;
  dropdownElement.style.display = "none";
};
