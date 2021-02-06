const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
console.log(toDoInput); // <input type="text" placeholder="Write a to do">
const toDoList = document.querySelector('.js-toDoList'); // ul

const toDos_localStorage = 'toDos';

// 할일 들이 배열안에 쌓여야 하기때문에, 초기값을 설정 : 할일들이 해당 배열에 추가되어야 한다. 그러려면 객체가 필요하다.
const toDos = [];


// 제출 이벤트
function handleSubmit(e) {
    e.preventDefault();

    //  ul 안에 input 값을 넣는 함수와 , 로컬스토리지에 input값을 저장하는 함수 실행
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
    saveToDos();
}

// 얼마나 많은 이미지를 가지고 있는지 체크
// 임의의 숫자를 생성




// 삭제 이벤트
function deleteTodo(e) {
    console.log(e); // MouseEvent
    console.log(e.target); // <button>X</button>
    const li = e.target.parentNode;
    console.log(li); // <li><button></button><span></span></li>
    toDoList.removeChild(li);

    //  true 인 요소들로만 구성된 새로운 배열 생성
    toDos = toDos.filter(todo => todo.id !== +li.id)
    // console.log(cleanToDos);

    // li 가 바뀌었으니, 바뀐 li 를 로컬스토리지에 저장해야 한다.
    saveToDos();
}


// ul 안에 input 값을 넣는 함수 (todo를 생성하는 함수)
function paintToDo(text) {
    const newLi = document.createElement('li')
    const delBtn = document.createElement('button');

    delBtn.innerText = '❌';

    delBtn.addEventListener('click', deleteTodo);

    const newSpan = document.createElement('span');
    const newId = toDos.length + 1;

    // 방법1 const newText = document.createTextNode(text);
    // 방법1 newLi.appendChild(newText);
    // 방법2 ┐
    newSpan.innerText = text;
    // console.log(newSpan); // <span>자바스크립트</span>

    newLi.appendChild(delBtn); // 
    // console.log(newLi); // <li><button>x</button></li>

    newLi.appendChild(newSpan); // <button>의 형제로 span 이 들어간다.
    // console.log(newLi); // <li><button>x</button><span>자바스크립트</span></li>
    newLi.id = newId;

    toDoList.appendChild(newLi);


    const toDoObj = {
        // text : 매개변수 text, 
        text: text,
        // id: 빈배열에 쌓인 할일들의 갯수 +1 ( 빈배열의 인덱스 +1 )
        id: newId,
    }
    toDos.push(toDoObj); // 빈배열이었던 toDos 에 toDoObj 가 쌓인다. : 이렇게 하는 이유는 로컬스토리지에도 할일들을 저장해야 하기 때문이다.

}

// 로컬스토리지에 저장하는 함수
function saveToDos() {
    // localStorage.setItem(keyName, keyValue) : keyName 은 로컬스토리지에 저장할 키의 이름 / keyValue 는 로컬스토리지에 저장할 키의 값

    localStorage.setItem(toDos_localStorage, JSON.stringify(toDos)) // 로컬스토리지에 toDos 라는 키에 text 라는 매개변수에 input의 값을 전달 
}
// 로컬스토리지에는 자스의 date 를 저장할수 없다. 오직 문자열만 저장할수 있다. 그래서 toDos(객체) 를 객체로 변환하고, 그것을 문자열로 변환시키는 JSON.stringify 를 사용했다. 
// : JSON(javascript object notation) : 데이터를 전달할때 자바스크립트가 그걸 다룰 수 있도록 객체로 바꿔주는 기능



// 로컬스토리지에 저장된 할일들을 불러오는 함수
function loadToDos() {
    const loadedToDos = localStorage.getItem(toDos_localStorage); // 로컬스토리지에 저장된 toDos 라는 키를 가져와서 toDos 라는 변수에 할당
    
    if (loadedToDos !== null) { // 로컬스토리지에 저장된 toDos 라는 키의 값이 null 아니면 (키의 값이 있으면) 
        // console.log(loadToDos); 
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(Array.isArray(parsedToDos)); // true

        // parsedToDos 배열에 담겨있는 것들을 각각 한번씩 함수를 실행시켜준다 : parsedToDos 에 있는 것들 각각에 함수를 실행시켜준다.
        parsedToDos.forEach(toDo => {
            // console.log(toDo.text); // text = input 값

            // parsedToDos 배열에 담겨있는 것들을 각각 한번씩 
            // 뷰에 그려주는 함수를 실행
            paintToDo(toDo.text)
        });;
    }
}



function init() {
    loadToDos();

    toDoForm.addEventListener('submit', handleSubmit)

}
init();

// 할일 목록을 저장
// 할일 목록은 배열이 되어야 한다.