
const iceContainer = document.querySelector("#icebergs");
let screenHeight = document.body.clientHeight
let screenWidth = document.body.clientWidth;
console.log('windowSize', screenWidth, screenHeight);
console.log('iceContainer', iceContainer)

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}


const generateIceberg = () => {
  const iceberg = document.createElement('div');
  iceberg.style.width = "5rem";
  iceberg.style.height = "5rem";
  iceberg.style.backgroundColor = "lightblue"
  iceberg.style.position = 'absolute';

  return iceberg;
}


// let marginTop = 2;

const generateOneColIcebers = (containerDiv, colId, total, marginLeft) => {

  let marginTop = getRandomArbitrary(-3, 10);
  // let gaps = getRandomArbitrary(15, 25)
  console.log('js worked')

  for (let i = 0; i < total; i++) {
    let curIceberg = generateIceberg();
    curIceberg.setAttribute('id', `${colId}${i}`);
    curIceberg.style.marginTop = marginTop + "%";
    curIceberg.style.marginLeft = marginLeft + "%"
    marginTop += 15;
    containerDiv.appendChild(curIceberg);
  }
}



const generateMultiCols = (cols) => {
  let totalPerCol = [2, 3, 4, 5];
  let marginLeft = 1;

  for (let j = 0; j < cols; j++) {
    let curTotal = totalPerCol[Math.floor(Math.random() * totalPerCol.length)];
    generateOneColIcebers(iceContainer, j, curTotal, marginLeft);
    marginLeft += 15
  }
};

generateMultiCols(5);