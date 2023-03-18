$(document).ready(function(){
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true
    });
    const sliderPrevBtn = document.querySelector('.slick-prev');
    const sliderNextBtn = document.querySelector('.slick-next');

    console.log(sliderPrevBtn);
    console.log(sliderNextBtn);

    sliderPrevBtn.innerHTML = '&#8249;';
    sliderNextBtn.innerHTML = '&#8250;';
});

