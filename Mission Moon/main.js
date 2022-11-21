console.log('js worked')

const colors = ["white", "yellow", "#f47a42", "#4e9eb2"] 
const container = document.querySelector('#starsContainer')

const makeStars = (total) => {
    for ( let i = 0; i < total; i++ ) {
        let starX = Math.floor((Math.random() * 90) + 1);
        let starY = Math.floor((Math.random() *50) + 1);
        let starColor = colors[Math.floor(Math.random() * colors.length)];
        let starID = "star" + i;

        let star = document.createElement('div');
        star.setAttribute('id', starID);
        star.style.backgroundColor = starColor;
        star.style.marginLeft = starX + "%";
        star.style.marginTop = starY + "%";

        if(i%2 ===0 ) {
            star.setAttribute('class', 'star1');
        } else {
            star.setAttribute('class', 'star2');
        }
        container.appendChild(star)

    }
}

makeStars(100)