const clockContainer = document.querySelector('.js-clock');
const clockTitle = document.querySelector('h1');

function getTime() {
    const date = new Date();
    const hour = date.getHours(); // hh 
    const minute = date.getMinutes();
    const second = date.getSeconds();

    if (hour > 12) {
        clockTitle.innerText =
            `${hour % 12 < 10 ? `0${hour % 12}` : hour % 12 }:${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}`: second}`

    }
}



function init() {
    /* setInterval : 시계를 끝내고 매 초마다 업데이트를 해서 실시간으로 시간을 볼수 있게 해주는 메서드
    - 인수를 두개를 받는다 : 첫번째 인수에는 실행할 함수(콜백함수)를 넣고 두번째 인수에는 해당 함수를 실행하고 싶은 시간의 간격을 넣는다.  */

    // 현재 시간을 얻어야 한다.
    setInterval(getTime, 1000);
}

init();