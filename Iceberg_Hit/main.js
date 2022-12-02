
// gloable variable
const iceContainer = document.querySelector("#icebergs");
let screenHeight = document.body.clientHeight
let screenWidth = document.body.clientWidth;
const col = 12, row = 8;
let intervalID;
let isCollision = false;
// if transfer into px, it will be easier to attect the colosion by x and y
// now will generate the size of the iceberg by screen width and height
// it will be 8 * 12 grids, each iceberg take one grids;

let icebergSize = screenHeight < screenWidth ? screenHeight / row : screenHeight / col;
icebergSize = Math.floor(icebergSize); // px

//  Dom Elements
const countdownView = document.querySelector("#countdown-view");
const collisionView = document.querySelector("#collision-view");

// btn click events
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
startBtn.addEventListener('click', handleStartBtnClick);
restartBtn.addEventListener('click', handRestart);


const startX = screenWidth * .6;
const restartX = -icebergSize * 5;
console.log('windowSize', screenWidth, screenHeight, icebergSize);

// helper functions
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}


// start boat keyboard events
const boat = document.querySelector("#boat")
document.addEventListener('keydown', handleKeydown);

const setBoat = () => {
  boat.style.width = icebergSize + "px";
  boat.style.height = icebergSize / 2 + "px";
  boat.style.borderRadius = `${icebergSize / 13}px`;
  boat.style.top = "50%";
  boat.style.left = "90%";
}

setBoat();

function handleKeydown(event) {

  if (boat.style.top === "") {
    boat.style.top = "50%"
  }

  let curY = parseInt(boat.style.top);
  let curX = parseInt(boat.style.left);

  if (event.keyCode === 40) { // Arrow down
    curY += 1;
    // console.log('down', event.code)
    boat.style.top = curY + "%";
  } else if (event.keyCode === 38) { // Arrow up
    curY -= 1;
    // console.log('up', curY)
    boat.style.top = curY + "%";
  } else if (event.keyCode === 37) { // left Arrow
    curX -= 1;
    boat.style.left = curX + "%";
  } else if (event.keyCode === 39) { // right Arrow
    curX += 1;
    boat.style.left = curX + "%";
  }
}



function handleStartBtnClick(event) {
  // startBtn.classList.add('hidden');
  // const countdownText = document.querySelector("#countdown-text")
  // // handle counting down
  // countdownText.classList.remove('hidden');
  // let i = 3;
  // while (i > 0) {
  //   setTimeout(() => { countdownText.textContent = i; i-- }, 1000)
  //   // handleCountdown
  // }

  countdownView.classList.add('hidden');
  StartGame();
}


function handRestart(event) {
  collisionView.classList.add('hidden');
  // remove all the child nodes from the iceberg container
  while (iceContainer.firstChild) {
    iceContainer.removeChild(iceContainer.firstChild);
  }
  boat.style.top = "50%";
  boat.style.left = "90%";
  StartGame();
}

const StartGame = () => {
  isCollision = false;
  screenWidth > screenHeight ? generateMultiCols(col, row) : generateMultiCols(row, col)
  animateAllIcebers();
  intervalID = setInterval(animateAllIcebers, 30);
}

// start iceberg related functions

const generateIceberg = () => {
  const iceberg = document.createElement('div');
  iceberg.style.width = icebergSize + "px";
  iceberg.style.height = icebergSize + "px";
  iceberg.style.background = "#c1f2fe";
  iceberg.style.position = 'absolute';
  iceberg.style.borderRadius = `${icebergSize / 13}px`

  return iceberg;
}

const animateOneIceberg = (iceberg) => {
  let curLeft = parseInt(iceberg.style.left);

  if (curLeft > screenWidth) {
    curLeft = restartX;
  }

  curLeft += 2;
  iceberg.style.left = curLeft + "px";
}

const generateOneColIcebers = (containerDiv, colId, total, left) => {
  let top = getRandomArbitrary(-3, 10);

  for (let i = 0; i < total; i++) {
    // random o 1
    let flag = getRandomInt(3);
    if (flag !== 0) {
      top += icebergSize + icebergSize / 5;
    } else {
      let curIceberg = generateIceberg();
      curIceberg.setAttribute('id', `${colId}-${i}`);
      curIceberg.style.top = top + "px";
      curIceberg.style.left = left + "px"
      top = top + icebergSize + icebergSize;
      containerDiv.appendChild(curIceberg);
    }
  }
}

const generateMultiCols = (cols, row) => {
  let left = startX;

  for (let j = 0; j < cols; j++) {
    let colContainer = document.createElement('div');
    colContainer.style.left = left + "px"
    colContainer.setAttribute("id", `col${j}`);
    generateOneColIcebers(colContainer, j, row, left);
    iceContainer.appendChild(colContainer);
    left = left - icebergSize - icebergSize / 2
  }
};

const animateAllIcebers = () => {

  const cols = iceContainer.childNodes;

  for (const node of cols) {
    const divs = node.childNodes;
    for (const iceberg of divs) {
      animateOneIceberg(iceberg);
      if (checkCollision(iceberg, boat)) {
        isCollision = true;
        afterCollision();
        return;
      };
    }
  }
}

const afterCollision = () => {
  console.log('after', isCollision)
  if (isCollision) {
    window.clearInterval(intervalID);
    collisionView.classList.remove('hidden');

  }
};

const checkCollision = (iceberg, boat) => {
  //  if the right of the iceberg is bigger than the left of the boat, then check top
  const left = parseInt(iceberg.style.left);
  const right = left + icebergSize;
  const top = parseInt(iceberg.style.top);
  const bottom = top + icebergSize;

  const boatLeft = parseInt(boat.style.left) / 100 * screenWidth;
  const boatRight = boatLeft + icebergSize;
  const boatTop = parseInt(boat.style.top) / 100 * screenHeight;
  const boatBottom = boatTop + icebergSize / 2;

  let result = false;

  // check boat left
  if (boatLeft >= left && boatLeft < right) {
    if (boatTop > top && boatTop <= bottom) {
      result = true;
    } else if (boatBottom > top && boatBottom <= bottom) {
      result = true;
    }

  } else if (boatRight >= left && boatRight <= right) {  // check boat right
    if (boatTop > top && boatTop <= bottom) {
      result = true;
    } else if (boatBottom > top && boatBottom <= bottom) {
      result = true;
    }
  }
  
  return result;

}

