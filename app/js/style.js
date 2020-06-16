$('#js-btn-nav').on('click',function(){
    $('#js-nav').toggleClass('activ');
    $('#js-btn-nav').delay(500).toggleClass('close-btn');
    $('body').toggleClass('overflow');
})