function changeHeightChat (){

    const messenger = document.querySelector('.messenger');
    let blockHeight;
    // максВысота - минВысота / время * шаг интервала
    const deltaHeight = (424 - 78) / 300 * 20;

    // Выясняем размер блока
    if (messenger.style.height === '424px'){
        blockHeight = 424;
        toggleChatVisibility();
    }
    else{
        blockHeight = 78;
    }

    // Анимация через интервал
    let start = Date.now();
    let flag = 0;
    let timer = setInterval(()=>{

        // Изменение размера блока
        if (messenger.style.height === '424px' || flag === 1){
            flag = 1;
            blockHeight -= deltaHeight;
        }
        else{
            blockHeight += deltaHeight;
        }
        messenger.style.height = blockHeight + 'px';

        // Окончание интервала
        let timePass = Date.now() - start;
        if (timePass > 300){
            clearInterval(timer);
            //Окончательная корректировка размера блока
            if (blockHeight > 300){
                messenger.style.height = '424px';
                toggleChatVisibility();
            }
            else{
                messenger.style.height = '78px';
            }

            //Пролистываем вниз чата
            const chat = document.querySelector('.messenger__chat__text');
            chat.scrollTop = 99999999;
            return 0;
        }

    }, 20)

    
}

function toggleChatVisibility(){
        document.querySelector('.messenger__arrow__down').classList.toggle('none');          
        document.querySelector('.messenger__arrow__up').classList.toggle('none');
        document.querySelector('.messenger__line').classList.toggle('none');
        document.querySelector('.messenger__clip').classList.toggle('none');
        document.querySelector('.messenger__input').classList.toggle('none');
        document.querySelector('.messenger__send').classList.toggle('none');
        document.querySelector('.messenger__send__btn').classList.toggle('none');
        document.querySelector('.messenger__text').classList.toggle('none');
        document.querySelector('.messenger__chat').classList.toggle('none');
}

function sendMessage(elementClass){

    //Получаем текст сообщения
    const message = document.querySelector(`.${elementClass}`).value;

    // Если сообщение пустое ничего не отправлять
    if (message == '' && Array.from(document.querySelectorAll('.messenger__chat__image img')).length == 0){
        return;
    }

    // Зануление строки отправки
    document.querySelector(`.${elementClass}`).value = '';

    //Создание блока и установка ему класса
    let container = document.querySelector('.messenger__chat__text');
    let newMessage = document.createElement('div');
    
    // Позиционирование блока в чате (если юзер то справа, если оператор то слева)
    if (elementClass === 'messenger__input'){
        newMessage.classList.add('messenger__chat__block__user');
    }
    else{
        newMessage.classList.add('messenger__chat__block__operator');
    }
    
    container.append(newMessage);
    container = newMessage;
    
    newMessage = document.createElement('p');

    // Добавление сообщения в блок
    newMessage.innerText = message;
    if (elementClass === 'messenger__input'){
        newMessage.classList.add('messenger__chat__user');
    }
    else if(elementClass === 'operator__input'){
        newMessage.classList.add('messenger__chat__support');

        // Смена статуса оператора после отправки
        const operator_status = document.querySelector('.messenger__operatorName__status');
        operator_status.innerHTML = 'Online';
        
    }


    // Добавление картинки к сообщению
    const images = Array.from(document.querySelectorAll('.messenger__chat__image img'));
    images.forEach((value) => {
        const img = value.cloneNode(true);
        img.classList.add('messenger__chat__user__image');
        newMessage.append(img);
        document.querySelector('.messenger__chat__image').remove();
    })
    container.append(newMessage);


    //Вывод времени
    let date = new Date();
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    
    if(hours.length == 1) hours = '0' + hours;
    if(minutes.length == 1) minutes = '0' + minutes;
    const time = hours + ':' + minutes;

    newMessage = document.createElement('p');
    newMessage.innerText = time;
    newMessage.classList.add('messenger__chat__timeSupport');

    if (elementClass === 'messenger__input'){
        newMessage.classList.add('messenger__chat__timeUser');
    }
    container.append(newMessage);


    // Прокрутка вниз чата
    const chat = document.querySelector('.messenger__chat__text');
    chat.scrollTop = 99999999;


    // Зануляем размер превью изображений
    document.querySelector('.messenger__chat__imagePreview').style.height = '0px';

    //Закидываем сообщение в localStorage
    const toSave = document.querySelector('.messenger__chat__text').innerHTML;
    localStorage.setItem('chatHistory', toSave);

}

function changeStatus(){
    if (document.querySelector('.operator__input').value == ''){
        document.querySelector('.messenger__operatorName__status').innerHTML = 'Online';
        return;
    }
    const operator_status = document.querySelector('.messenger__operatorName__status');
    operator_status.innerHTML = 'Печатает...';
}

function imgPreview(image_select){
    console.log('imgPreview');
    const imgArr = Array.from(image_select.files);
    const container = document.querySelector('.messenger__chat__imagePreview');


    // Зануляем предыдущие изображения
    container.innerHTML = '';

    // Увеличение контейнера с картинками
    container.style.height = '147px';

    imgArr.forEach(file => { // перебор по файлам

        

        const reader = new FileReader();

        reader.onload = ev => {
            
            container.insertAdjacentHTML('beforeend', `

            <div class="messenger__chat__image">

            <div class="messenger__chat__image__remove" data-name="${file.name}"> &times;</div>
            <img src="${ev.target.result}" class="" />
            
            </div>
            `);
        }

        reader.readAsDataURL(file);

    })

    
    //container.append(img);
    //console.log(img)
}

function delImage(files){
    let filesArr = [...files];

    if (!event.target.dataset.name){
        return;
    }

    const name = event.target.dataset.name;
    
    filesArr = filesArr.filter( (value) => value.name !== name);
    
    const deleted = document.querySelector(`[data-name="${name}"]`).closest('.messenger__chat__image');
    deleted.remove();
}

// Восстанавливаем историю сообщений...
document.querySelector('.messenger__chat__text').innerHTML = localStorage.getItem('chatHistory');


const upPanel = document.querySelector('.messenger__upPanel');
const operatorInput = document.querySelector('.operator__input');

// Свернуть/развернуть чат
upPanel.addEventListener('click', changeHeightChat);

// По нажатию кнопки (прописано в HTMLe) или клавиши отправлять сообщение
document.addEventListener('keydown', (e)=>{
    if (e.code == 'Enter'){
        sendMessage('messenger__input');
    }
    else if (e.code == 'ShiftRight'){
        sendMessage('operator__input');
    }
})

// Изменение статуса печати
operatorInput.addEventListener('input', changeStatus);

// Загрузка выбранной картинки
const image_select = document.querySelector('.messenger__clip__file');
image_select.addEventListener('change', function(){imgPreview(image_select)});

//Удаление картинки
document.querySelector('.messenger').addEventListener('click', function(){delImage(image_select.files)});