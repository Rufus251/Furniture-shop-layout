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

const galleryInd = document.querySelector(".gallery__btns");
if (galleryInd !== null){
    galleryInd.addEventListener("click", galleryIndex);
}

const galleryGal = document.querySelector(".btns");
if (galleryGal !== null){
    galleryGal.addEventListener("click", galleryIndex);
}