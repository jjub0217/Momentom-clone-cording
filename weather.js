
const weather = document.querySelector('.js-weather');

const api_key = '3f2d660045d37c6f24863474173e68a5';

// 자바스크립트를 이용해서 특정 url 을 호출하는 방법
// 자바스크립트는 웹사이트로 요청을 보내고, 요청에 대한 응답을 통해서 데이터를 얻을수 있다. 
// 가져온 데이터를 새로고침 안해도 실시간으로 계속 데이터를 가져올수 있다. 
function  getWeather(latitude, longitude) {
    // fetch : API 데이터를 얻는 방법. 괄호 안에는 가져올 데이터가 들어가면 된다.
    // then : 함수를 호출하는 역할. (데이터가 완전히 들어온 다음에 호출할 함수.)
    // 데이터가 우리한테 넘어왔을때 실행할 함수. 데이터가 넘어오는게 시간이 걸릴수도 있기 때문에. 

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`)
    .then(function (response) {
        // console.log(response.json()); // Promise{<pending>}
        return response.json(); 
        /* response (fetch 가 완료되길 기다리고 있다.). fetch 를 기다리지않고 (then 을 안하고)  다음작업을 하면 
            그 다음작업은 fetch가 완료되길 기다리지 않을거고, fetch가 정상적으로 완료되지 않을 수 있다.
            그렇기 때문에 우리는 서버로부터 데이터가 들어올때까지 기다려야 한다. */

            
        // ┌ 자바스크립트에서 뭔가가 끝나길 기다리는 방법또한 then 을 사용하는 것이다. 
    }).then(function (j) {
        // j = json
        // console.log(j); //  {coord: {…}, weather: Array(1), base: "stations", main: {…}, visibility: 2400, …}
        const temperature = j.main.temp;
        const place = j.name;
        weather.innerText = `${temperature} @ ${place}`
    })
}



// coords : 좌표
const coords = 'coords'


function handleGeoSuccess(position) {
    console.log(position);
    // console.log(position.coords.latitude);// 위도가 나온다. 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // 객체에 변수의 이름과 프로퍼티 키 이름을 같게 저장할때는 프로퍼티 축약표현을 쓴다.  
    // const coordsObj = {
    //     latitude : latitude,
    //     longitude : longitude
    // }
    const coordsObj = {
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude)

}

function handleGeoError() {
    console.log('Cant access geo location');
}



// 로컬스토리지에 좌표가 저장되어있지 않았을 경우 실행하는 함수
function askForCoords() {
    // getCurrentPosition 은 2개의 인수가 필요하다. : 첫번째 인수는 좌표를 가져오는데 성공했을때의 함수. 두번째는 실패했을때 실행하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}


// 로컬스토리지에 저장된 좌표 데이터를 갖고오는 함수
function saveCoords(coordsObj) {
    localStorage.setItem(coords, JSON.stringify(coordsObj));
}


function loadCoords() {
    const loadedCoords = localStorage.getItem(coords)

    if (loadedCoords === null) { // 로컬스토리지에 좌표가 없을경우엔
        // 좌표를 요청하는 함수
        askForCoords();
    } else { // 로컬스토리지에 좌표가 있을 경우엔
        const parseCoords = JSON.parse(loadedCoords)
        // console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)

    }
}


function init() {
    loadCoords();
}
init()