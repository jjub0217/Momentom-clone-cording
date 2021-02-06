const title = document.querySelector('#title');
const clicked_class = 'clicked'


function handleClick() {
    // const hasClass = title.classList.contains(clicked_class);
    // console.log(hasClass); // title 의 class 이름에 clicked_class 을 포함하는게 있는지 확인. => false

    title.classList.toggle(clicked_class);
}

function init() {
    title.addEventListener('click', handleClick);
}
init()
