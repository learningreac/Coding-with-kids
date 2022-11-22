console.log('js worked')

const iceContainer = document.querySelector("icebergs");
let screenHeight =  document.body.clientHeight
let screenWidth = document.body.clientWidth;
console.log('windowSize',screenWidth, screenHeight);

const  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }


const generateIceberg = (total) => {
    const iceberg = document.createElement('div');
    iceberg.style.width = "100px";
    iceberg.style.height = "100px";
    iceberg.style.color = "light blue"
    iceberg.style.position = absolute;
}

const generateIcebers = (total)