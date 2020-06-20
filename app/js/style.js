const btnNav = document.getElementById('js-btn-nav');

btnNav.onclick = function(){
    document.getElementById('js-nav').classList.toggle('activ');
    btnNav.classList.toggle('close-btn');
    document.querySelector('body').classList.toggle('overflow');
};

var item = document.querySelector(".product-example__list");
var basket = document.querySelector('#js-basket');
var si =  document.querySelector('.menu-block__activ-menu-link_number-item');
var modalWindow = document.querySelector('.modal-window');
var basketP = document.querySelector('.basket');

var sumItem = 0;

basketP.onmouseout = function(){
    basket.style.display='none';  
}

basketP.onmouseover = function(e){
    if(document.querySelector('#basket-item') != null){
        basket.style.display='block';
    }
}



item.addEventListener("click", function(e){
    if(e.target.querySelectorAll("li")){
        var img = e.target.parentNode.parentNode.querySelector('.js-img').getAttribute('src');
    var title = e.target.parentNode.parentNode.querySelector('.js-title').textContent;
    var discription = e.target.parentNode.parentNode.querySelector('.js-description').textContent;
    var prise = e.target.parentNode.parentNode.querySelector('.js-prise').textContent;

    if(modalWindow.classList == "modal-window modal-window-active2 modal-window-active"){
        return false;
    }

    ++sumItem;

    si.innerHTML =`${sumItem}`;

    modalWindow.innerHTML =`
        
        <img class="modal-window__img" src="${img}">           

        <span class="modal-window__title">
            ${title}
        </span>
        
        <span class="modal-window__discription">
            ${discription}
        </span>

        <span class="modal-window__prise">
            ${prise}
        </span>

        <a href="#basket" onclick="scrollMenu('#basket')" class="modal-window__up-basket"> Перейти к </a>
    `;

    modalWindow.classList.add("modal-window-active2");
    setTimeout(() => {
        modalWindow.classList.add("modal-window-active");
    }, 100);

    setTimeout(() => {
        modalWindow.classList.remove("modal-window-active")
    }, 4000);

    basket.innerHTML +=`
        <li class="basket-item"  id="basket-item">
            <img class="basket-item__img" src="${img}">           

            <span class="basket-item__title">
                ${title}
            </span>
            
            <span class="basket-item__discription">
                ${discription}
            </span>

            <span class="basket-item__prise">
                ${prise}
            </span>

            <button class="basket-item__btn-delit"></button>
        </li>
    `;
    }
});



basket.addEventListener('click', function(e){
    --sumItem;

    if (sumItem == '0'){
        si.innerHTML =` `;
        basket.style.display='none';
    }else{
        si.innerHTML =`${sumItem}`;
    }

    e.target.parentNode.remove();

}, '.delit');

modalWindow.addEventListener('click', removeModalWindow, '.modal-window__up-basket');

function removeModalWindow (e){
    modalWindow.classList.remove("modal-window-active");
}

function removeBasketItem(){
    --sumItem;

    if (sumItem == '0'){
        si.innerHTML =` `;
    }else{
        si.innerHTML =`${sumItem}`;
    }

    this.parentNode.querySelector('#basket-item').remove();
}

function anim(duration) {
   
    var temp;

    return function(sel) {
        cancelAnimationFrame(temp);

        var start = performance.now();
        var from = window.pageYOffset || document.documentElement.scrollTop,
            to = document.querySelector(sel).getBoundingClientRect().top;

        requestAnimationFrame(function step(timestamp) {
            var progress = (timestamp - start) / duration;
            1 <= progress && (progress = 1);
            window.scrollTo(0, from + to * progress | 0);
            1 > progress && (temp = requestAnimationFrame(step))
        })
    }
};

var scrollMenu = anim(800);

/* карта */

var btnKart = document.querySelector('.info-block__btn'),
    inputKart = document.querySelector('.info-block__input'),
    form = document.querySelector('.info-block__form');
    karta = document.querySelector('.card-block');
    var centr;

    form.addEventListener("submit", function(e){
        event.preventDefault();
        
        var city = inputKart.value
        city = city.toUpperCase()
       
        if (document.querySelector('.ymaps-2-1-76-map')){
            document.querySelector('.ymaps-2-1-76-map').remove();
        }

        if ( city == 'МОСКВА' || city == 'MOSCOW'){
            centr = [55.75582147080667,37.61453289814758]
            karta.classList.add('card-filter');
            karta.innerHTML =``
        }else if ( city == 'СПБ' || city == 'SBP' || city == 'САНКТ-ПЕТЕРБУРГ' || city == 'SAINT PETERSBURG'){
            centr = [59.9359909931084,30.315972044982914]
            karta.classList.add('card-filter');
            karta.innerHTML =``
        }else if (city == 'САМАРА'|| city == 'SAMARA'){
            centr = [53.207543160978794,50.201089464309675]
            karta.classList.add('card-filter');
            karta.innerHTML =``
        }else if (city == 'КАЗАНЬ'|| city == 'KAZAN'){
            centr = [55.82925751488102,49.11989491799918]
            karta.classList.add('card-filter');
            karta.innerHTML =``
        }
        else if (city == 'КАЛИНИНГРАД'|| city == 'KALININGRAD'){
            centr = [54.71802672628874,20.499932567459105]
            karta.classList.add('card-filter');
            karta.innerHTML =``
        }else{
            karta.innerHTML =`<p class="card-block__info">Извините, в вашем городе нет магазина </p>`
            karta.classList.remove('card-filter');
            this.reset();
            return
        }

        console.log(centr)

        this.reset();

        ymaps.ready(function () {
            debugger

            var myMap = new ymaps.Map('map', {
                center: centr,
                zoom: 16,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
            
        
            var Moscow = new ymaps.Placemark(myMap.getCenter([55.75582147080667,37.61453289814758]), {
                    hintContent: 'Москва',
                    balloonContent: 'наш магазин в Москве',
        
                    //center:[55.75582147080667,37.61453289814758]
                })/*,{
                    iconLayout: 'default#image',
                    iconImageHref: '../img/img/mark.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                })*/,
        
                SPB = new ymaps.Placemark([59.9359909931084,30.315972044982914], {
                    hintContent: 'СПБ',
                    balloonContent: 'наш магазин в Санкт-Петербурге',
                    //center:[59.9359909931084,30.315972044982914]
                })/*,{
                    iconLayout: 'default#image',
                    iconImageHref: '../img/img/mark.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38],

                })*/,
        
                Samara = new ymaps.Placemark([53.207543160978794,50.201089464309675], {
                    hintContent: 'Самара',
                    balloonContent: 'наш магазин в Самаре',
                })/*,{
                    iconLayout: 'default#image',
                    iconImageHref: '../img/img/mark.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                })*/,
        
                Kazan = new ymaps.Placemark([55.82925751488102,49.11989491799918], {
                    hintContent: 'Казань',
                    balloonContent: 'наш магазин в Казане',
                })/*,{
                    iconLayout: 'default#image',
                    iconImageHref: '../img/img/mark.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                })*/,
        
                Kaliningrad = new ymaps.Placemark([54.71802672628874,20.499932567459105], {
                    hintContent: 'Калиненград',
                    balloonContent: 'наш магазин в Калиненграде',
                })/*,{
                    iconLayout: 'default#image',
                    iconImageHref: '../img/img/mark.png',
                    iconImageSize: [30, 42],
                    iconImageOffset: [-5, -38]
                })*/;
        
            myMap.geoObjects
                .add(Moscow)
                .add(SPB)
                .add(Samara)
                .add(Kazan)
                .add(Kaliningrad);
        
  /*          Moscow.events
                .add('mouseenter', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark-hover.png');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark.png');
                });
        
            SPB.events
                .add('mouseenter', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark-hover.png');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark.png');
                });
        
            Samara.events
                .add('mouseenter', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark-hover.png');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark.png');
                });
        
            Kazan.events
                .add('mouseenter', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark-hover.png');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark.png');
                });
        
            Kaliningrad.events
                .add('mouseenter', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark-hover.png');
                })
                .add('mouseleave', function (e) {
                    e.get('target').options.set('iconImageHref', '../img/img/mark.png');
                });
     */           
        });
    })




    