const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
// console.log(toDoInput); // <input type="text" placeholder="Write a to do">
const toDoList = document.querySelector('.js-toDoList'); // ul

const toDos_localStorage = 'toDos';

let toDos = [];


// 제출 이벤트
function handleSubmit(e) {
    e.preventDefault();

    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
    saveToDos();
}

// 삭제 이벤트
function deleteTodo(e) {
    const li = e.target.parentNode;
    toDoList.removeChild(li);

    //  true 인 요소들로만 구성된 새로운 배열 생성
    toDos = toDos.filter(todo => todo.id !== +li.id)

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
    newLi.id = newId;

    newSpan.innerText = text;

    newLi.appendChild(delBtn);
    newLi.appendChild(newSpan);

    toDoList.appendChild(newLi);

    const toDoObj = {
        text: text,
        id: newId,
    }
    toDos.push(toDoObj);
}


// 로컬스토리지에 데이터를 저장하는 함수
function saveToDos() {
    localStorage.setItem(toDos_localStorage, JSON.stringify(toDos))
}

// 로컬스토리지에 저장한 데이터를 불러오는 함수
function loadToDos() {
    const loadedToDos = localStorage.getItem(toDos_localStorage);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => {
            paintToDo(toDo.text)
        });;
    }
}



function init() {
    loadToDos();

    toDoForm.addEventListener('submit', handleSubmit)

}
init();