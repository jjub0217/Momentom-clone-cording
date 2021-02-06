const form = document.querySelector('.js-form');
const input = form.querySelector('input');
console.log(input);
const h4 = document.querySelector('.js-greeting');

const user_localStorage = 'currentUser'
const showing_className = 'showing'



// 이벤트
function handleSubmit(e) {
    e.preventDefault();

    // form 을 감추고 h4 안에 input 값을 넣는 함수와 , 로컬스토리지에 input값을 저장하는 함수 실행
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue)
}

// h4 안에 input 값을 넣는 함수
function paintGreeting(text) {

    // 폼의 클래스 이름을 빼자. 
    form.classList.remove(showing_className) //  form.classList.add(showing : display block) : input 을 포함한 form 을 감춰라. 

    // h4 의 클래스 이름을 달자.
    h4.classList.add(showing_className) // h4.classList.add(showing  : display block) : h4 를 보여줘라.

    // h4 안에 텍스트(currentUser)를 넣자.
    h4.innerText = `Hello ${text}`
}


// 로컬스토리지에 input 값을 저장하는 함수
function saveName(text) {
    // localStorage.setItem(keyName, keyValue) : keyName 은 로컬스토리지에 저장할 키의 이름 / keyValue 는 로컬스토리지에 저장할 키의 값
    localStorage.setItem(user_localStorage, text) // 로컬스토리지에 currentUser 라는 키에 text 라는 매개변수에 input의 값을 전달 
}


// 로컬스토리지에 이름이 저장되어있지 않았을 경우 실행하는 함수
function askName() {
    form.classList.add(showing_className); // form.classList.add(showing : display block) : input 을 포함한 form 을 보여줘라.
    form.addEventListener('submit', handleSubmit)
    // └ submit 을 하게 되면, input 창이 새로고침 되는 기본적인 submit의 이벤트를 막는 동작과, form 을 감추고 h4 를 보이는 동작과,
    //   로컬스토리지에 이름을 저장하는 함수 실행

}

// 로컬스토리지에 저장된 데이터 갖고오는 함수
function loadName() {

    const currentUser = localStorage.getItem(user_localStorage);
    // └ const currentUser = localStorage.getItem('currentUser');
    //      : 로컬스토리지에 저장된 'currentUser' 라는 키를 가져와서 currentUser 라는   
    //        변수에 할당
 
    if (currentUser === null) {
        // 로컬스토리지에 currentUser 가 없을 경우. 함수를 실행
        askName(); // 유저의 이름이 뭔지 물어보는 함수 : input 을 포함한 form 을 보여줘라.

    } else {
        // 로컬스토리지에 currentUser 가 있을 경우. 함수를 실행
        paintGreeting(currentUser); // 로컬스토리지에 저장된 currentUser 라는 키
    }
}


function init() {
    loadName();
}

init();