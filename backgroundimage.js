const body = document.querySelector('body');

// 원하는 숫자를 할당하면, 그 숫자 만큼 원하는대로 바뀐다.
const img_number = 3;


// 이벤트
function handleImage() {
    console.log('finished loading');
}


// 이미지를 뷰포트에 그리는 함수
function paintImage(imgNumber) {
    // image 객체를 만드는 생성자 함수
    const image = new Image();
    console.log(image); // <image>

    image.src = `images/${imgNumber +1}.jpg`; // 랜덤함수가 0 을 줄수도 있기 때문에 + 1 을 했다. 
    image.classList.add('bgImage')
    body.prepend(image)

    // ┌ API 를 쓰는 경우 필요한 코드
    // console.log(image); // <image src="images/3.jpg"">
    // image.addEventListener('loadend', handleImage)
}



// 숫자를 반환하는 함수
function genRandom() {

    const number = Math.floor(Math.random() * img_number);
    // console.log(number);
    return number;
}


function init() {
    // 숫자 생성
    const randomNumber = genRandom();

    // 랜덤으로 생성한 숫자가 인수로 들어간다. 
    paintImage(randomNumber)
}
init();