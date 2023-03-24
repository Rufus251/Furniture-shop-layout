function galleryIndex(){
    const activeBtn = document.querySelector(".activeBtn");
    const eventBtn = event.target;

    const numberHide = activeBtn.classList[0];
    let galHide = document.querySelectorAll(`.${numberHide}`);

    const numberShow = eventBtn.classList[0];
    let galShow = document.querySelectorAll(`.${numberShow}`);

    if (activeBtn !== eventBtn && eventBtn.classList[0] !== 'gallery__btns' && eventBtn.classList[0] !== 'btns'){
        activeBtn.classList.toggle('activeBtn');
        eventBtn.classList.toggle('activeBtn');

        galHide[1].classList.toggle('none');
        galShow[1].classList.toggle('none');
    }
}

function postComment(){

    // Получаем текст и имя
    const username = document.querySelector(".blog__post__post__submit__form__name").value;
    const content = document.querySelector("#text").value;

    // Проверка на заполненые поля
    const alert = document.querySelector("#alert");
    if (username === "" || content === ""){
        alert.innerHTML = "Please, enter username AND comment!";
    }

    // Если пустое ничего не отправляем
    if (content == '' || username == ''){
        console.log('Нет имени или самого комментария!')
        return;
    }

    // Зануление строки отправки и строки имени, если нет чекбокса
    if (!document.querySelector("#checkbox").checked){
        document.querySelector(".blog__post__post__submit__form__name").value = '';
    }
    document.querySelector("#text").value = '';

    // Зануление email 
    const formEmail = document.querySelector(".blog__post__post__submit__form__email");
    formEmail.value = "";

    // Блок куда помещаем комментарий и новый комментарий
    let newMessage = document.createElement('div');

    newMessage.classList.add('blog__post__post__comments__comment')

    newMessage.innerHTML = `<div class="blog__post__post__comments__comment__img">
    <img src="image/blog__post/user.png" alt="">
</div>
<div class="blog__post__post__comments__comment__data">
    <div class="blog__post__post__comments__comment__data__name">
        <p>
            123
        </p>
    </div>
    <div class="blog__post__post__comments__comment__data__time">
        <p>
            1234
        </p>
    </div>
    <div class="blog__post__post__comments__comment__data__content">
        <p>
            1235
        </p>
    </div>
</div>
<div class="blog__post__post__comments__comment__replyBtn">
    <p>
        <a href="#text">
            Reply
        </a>
        
    </p>
</div>`;

    let data = Array.from(newMessage.querySelectorAll('p'));

    // Добавляем username
    data[0].innerHTML = `${username}`;

    // Добавляем дату комментария
    let date = new Date();

    // День
    const day = String(date.getDate());

    // Месяц
    let month = String(date.getMonth());

    switch (month){
        case '0':
            month = "January";
            break;
        case '1':
            month = "February";
            break;
        case '2':
            month = "March";
            break;
        case '3':
            month = "April";
            break;
        case '4':
            month = "May";
            break;
        case '5':
            month = "June";
            break;
        case '6':
            month = "Jule";
            break;
        case '7':
            month = "August";
            break;
        case '8':
            month = "September";
            break;
        case '9':
            month = "October";
            break;
        case '10':
            month = "November";
            break;
        case '11':
            month = "December";
            break;
    }

    // Год
    const year = String(date.getFullYear());
    data[1].innerHTML = `${month} ${day}, ${year}`;

    // Добавляем текст комментария
    data[2].innerHTML = `${content}`;

    // Блок, куда помещаем сообщение
    let container = document.querySelector('.blog__post__post__comments');
    
    // Проверяем на ответ другим пользователям
    const contentAnswer = Array.from(document.querySelectorAll('.blog__post__post__comments__comment__data__name p'));
    
    contentAnswer.forEach( (elem) => {
        if (content.includes(elem.innerHTML)){
            newMessage.classList.add('reply');

            container = elem.closest('.blog__post__post__comments__comment');

            container.after(newMessage);
        }
    })

    // Если сообщение не ответ, то добавляем в конец комментариев
    if (!newMessage.classList.contains("reply")){
        container.append(newMessage);
    }

    // Зануляем textarea
    const textArea = document.querySelector("#text");
    textArea.value = "";

    // Закидываем сообщение в localStorage
    const toSave = document.querySelector('.blog__post__post__comments').innerHTML;
    console.log(toSave);
    localStorage.setItem('chatHistory', toSave);
}

function addEvent(){
    const replyBtn = Array.from(document.querySelectorAll(".blog__post__post__comments__comment__replyBtn"));

    if (replyBtn !== null){
        replyBtn.forEach( (elem) => {
            let name = elem.closest(".blog__post__post__comments__comment");
            name = name.querySelector(".blog__post__post__comments__comment__data__name p").innerHTML;

            elem.addEventListener("click", () => {
                const textArea = document.querySelector("#text");
                textArea.value = `${name}, `;
            });
        })
    }
}

// Если есть галлерея и мы в index, добавляем действия на кнопки
const galleryInd = document.querySelector(".gallery__btns");
if (galleryInd !== null){
    galleryInd.addEventListener("click", galleryIndex);
}

// Если есть галлерея и мы в gallery, добавляем действия на кнопки
const galleryGal = document.querySelector(".btns");
if (galleryGal !== null){
    galleryGal.addEventListener("click", galleryIndex);
}

// single__post отправка комментариев
const submitBtn = document.querySelector(".blog__post__post__submit__form__btn");
if (submitBtn !== null){
    submitBtn.addEventListener("click", postComment);
}

// Воостанавливаем историю сообщений
const comments = document.querySelector('.blog__post__post__comments');
if (comments !== null){
    // Закидываем изначальные сообщения в localStorage
    const toSave = document.querySelector('.blog__post__post__comments').innerHTML;
    console.log(toSave);
    localStorage.setItem('chatHistory', toSave);

    // Кидаем остальные
    comments.innerHTML = localStorage.getItem('chatHistory');
}

addEvent();



