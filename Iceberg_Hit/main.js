
// gloable variable
const iceContainer = document.querySelector("#icebergs");
let screenHeight = document.body.clientHeight
let screenWidth = document.body.clientWidth;
const startX = -50;

console.log('windowSize', screenWidth, screenHeight);

// boat keyboard events
const boat = document.querySelector("#boat")
document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyUp);

function handleKeydown(event) {
  //console.log('keydown', boat.style)

  if (boat.style.top === "") {
    boat.style.top = "50%"
  } 

  let curY = parseInt(boat.style.top);
  if (event.keyCode === 38) { // Arrow Up
    curY += 1;
    console.log('up', curY)
    boat.style.top = curY + "%"
  } else if (event.keyCode === 40) { // Arrow down
    curY -= 1;
    // console.log('up', curY)
    boat.style.top = curY + "%"
  }
}

function handleKeyUp(event) {
  console.log('keyup', event.code)
}





const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}


const generateIceberg = () => {
  const iceberg = document.createElement('div');
  iceberg.style.width = "5rem";
  iceberg.style.height = "5rem";
  iceberg.style.backgroundColor = "lightblue"
  iceberg.style.position = 'absolute';
  // iceberg.style.margin = "0 5%"

  return iceberg;
}

const animateOneIceberg = (iceberg) => {
  let curLeft = parseInt(iceberg.style.left);

  // console.log('js worked', 'curleft', curLeft)

  if (curLeft > 100) {
    curLeft = startX;
    // top not change 
  }

  curLeft += 1;
  iceberg.style.left = curLeft + "%";
  // console.log('new left', iceberg.style.left)
}

const generateOneColIcebers = (containerDiv, colId, total, left) => {

  let top = getRandomArbitrary(-3, 10);

  for (let i = 0; i < total; i++) {
    let curIceberg = generateIceberg();
    curIceberg.setAttribute('id', `${colId}-${i}`);
    curIceberg.style.top = top + "%";
    curIceberg.style.left = left + "%"
    top += 25;
    containerDiv.appendChild(curIceberg);
  }
}

const generateMultiCols = (cols) => {
  let totalPerCol = [3, 4, 5];
  let left = startX;

  for (let j = 0; j < cols; j++) {
    let colContainer = document.createElement('div');
    iceContainer.appendChild(colContainer);
    colContainer.setAttribute("id", `col${j}`);
    let curTotal = totalPerCol[Math.floor(Math.random() * totalPerCol.length)];
    generateOneColIcebers(colContainer, j, curTotal, left);
    left += 25
  }
};

const animateAllIcebers = () => {
  console.log('animation')
  const cols = iceContainer.childNodes;

  for (const node of cols) {
    const divs = node.childNodes;
    for (const iceberg of divs) {
      animateOneIceberg(iceberg);
      // iceberg.style.backgroundColor = "yellow"
    }
  }
}

generateMultiCols(12);
//  setInterval(animateAllIcebers, 100);