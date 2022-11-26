
// gloable variable
const iceContainer = document.querySelector("#icebergs");
let screenHeight = document.body.clientHeight
let screenWidth = document.body.clientWidth;

const col = 12, row = 8;
// if transfer into px, it will be easier to attect the colosion by x and y
// now will generate the size of the iceberg by screen width and height
// it will be 8 * 12 grids, each iceberg take one grids;

let icebergSize = screenHeight < screenWidth ? screenHeight / row : screenHeight / col;
icebergSize = Math.floor(icebergSize); // px

const startX = screenWidth * .6;
const restartX = -icebergSize*10;
console.log('windowSize', screenWidth, screenHeight, icebergSize);

// boat keyboard events
const boat = document.querySelector("#boat")
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyUp);

const setBoat = () => {
  boat.style.width = icebergSize + "px";
  boat.style.height = icebergSize / 2 + "px";
  boat.style.borderRadius =  `${icebergSize / 13}px`;
}

setBoat();

function handleKeydown(event) {
  //console.log('keydown', boat.style)

  if (boat.style.top === "") {
    boat.style.top = "50%"
  }

  let curY = parseInt(boat.style.top);
  if (event.keyCode === 40) { // Arrow down
    curY += 1;
    console.log('down', event.code)
    boat.style.top = curY + "%"
  } else if (event.keyCode === 38) { // Arrow up
    curY -= 1;
    // console.log('up', curY)
    boat.style.top = curY + "%"
  }
}

function handleKeyUp(event) {
  console.log('keyup', event.code)
}

const  getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}



const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}


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

  // console.log('js worked', 'curleft', curLeft)

  if (curLeft > screenWidth) {
    curLeft = restartX;
    // top not change 
  }

  curLeft += 2;
  iceberg.style.left = curLeft + "px";
  // console.log('new left', iceberg.style.left)
}

const generateOneColIcebers = (containerDiv, colId, total, left) => {
// now total is equal row number, 
// control if draw iceberg on that grid by random (0,1);
  let top = getRandomArbitrary(-3, 10);

  for (let i = 0; i < total; i++) {
    // random o 1
    let flag = getRandomInt(3);
    if(flag !== 0) {
      top += icebergSize + icebergSize/5;
    } else {
      let curIceberg = generateIceberg();
      curIceberg.setAttribute('id', `${colId}-${i}`);
      curIceberg.style.top = top + "px";
      curIceberg.style.left = left + "px"
      top = top + icebergSize + icebergSize ;
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
    left = left - icebergSize - icebergSize/2
  }
};

const animateAllIcebers = () => {
  console.log('animation')
  const cols = iceContainer.childNodes;

  for (const node of cols) {
    const divs = node.childNodes;
    const curColLeft = parseInt(node.style.left);
    console.log('check', curColLeft);
    for (const iceberg of divs) {
      animateOneIceberg(iceberg);
      // iceberg.style.backgroundColor = "yellow"
    }
  }
}


const attectCollision = () => {
  //  the boat is at the right side, get the col div x;
  // check if fall within boat area, if yes, check each iceberg div


}
screenWidth > screenHeight ? generateMultiCols(col, row): generateMultiCols(row, col)

animateAllIcebers();
setInterval(animateAllIcebers, 20);