/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calccaloris.js":
/*!***********************************!*\
  !*** ./js/modules/calccaloris.js ***!
  \***********************************/
/***/ ((module) => {

function calcCaloris(){
//calc

const result = document.querySelector('.calculating__result span')

let sex, height, weight, age, raito;
if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex')
}else{
    sex = 'female'
    localStorage.setItem('sex', 'female')
}
if(localStorage.getItem('raito')){
    sex = localStorage.getItem('raito')
}else{
    sex = 1.375
    localStorage.setItem('raito', 1.375)
}

function initLocal(selector, activeClass){
    const elements =  document.querySelectorAll(selector)

    elements.forEach(e =>{
        e.classList.remove(activeClass)
        if(e.getAttribute('id') === localStorage.getItem('sex')){
            e.classList.add(activeClass)
        }
        if(e.getAttribute('data-raito') === localStorage.getItem('raito')){
            e.classList.add(activeClass)
        }
    })
}
initLocal('#gender div', 'calculating__choose-item_active')
initLocal('.calculating__choose_big div', 'calculating__choose-item_active')

function calcTotal (){
    if(!sex || !height || !weight || !age || !raito){
        result.textContent = '_____';
    return
    }
    
    if(sex === 'female'){
        result.textContent = Math.round((447.6 +(9.2 * weight) + (3.1 * height) - (4.3 * age)) * raito);
    }else
    {   
        result.textContent = Math.round((88.36 +(13.4 * weight) + (4.8 * height) - (5.7 * age)) * raito);
    }

    
}
calcTotal();

function getStaticInformation(selector, activeClass){
    const elements = document.querySelectorAll(selector)
    elements.forEach(elem =>{
        elem.addEventListener('click', (e) =>{
        if(e.target.getAttribute('data-raito'))
        {
            raito = +e.target.getAttribute('data-raito')
            localStorage.setItem('raito', +e.target.getAttribute('data-raito'))
        }else{
            sex = e.target.getAttribute('id')
            localStorage.setItem('sex', e.target.getAttribute('id'))
        }



        elements.forEach(elem =>{
        elem.classList.remove(activeClass)
        })
        e.target.classList.add(activeClass)
        calcTotal();
        })
    })
   
   
}

getStaticInformation('#gender div', 'calculating__choose-item_active')
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

function getDynamicInformation(selector){
    const input = document.querySelector(selector)

    input.addEventListener('input', () =>{

        if(input.value.match(/\D/g)){
            input.style.border = '1px solid red'
        }else{
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')){
            case 'height':
            height = +input.value
            break;
            case 'weight':
            weight = +input.value
            break;
            case 'age':
            age = +input.value
            break;
        }
    calcTotal();
    })
    
}

getDynamicInformation('#height')
getDynamicInformation('#weight')
getDynamicInformation('#age')

}
module.exports = calcCaloris;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards(){

    //class for cards


class Menu {
    constructor(src, alt, name, text, price, parentSelector, ...classes){
        this.src = src;
        this.alt = alt;
        this.name = name;
        this.price = price;
        this.text = text;
        this.transfer = 42;
        this.changeToUAH()
        this.parent = document.querySelector(parentSelector)
        this.classes = classes
    }
    changeToUAH(){
        this.price = this.price * this.transfer
    }

    render(){
        const a = document.createElement('div')
        if(this.classes.length === 0){
            this.a = 'menu__item'
            a.classList.add(this.a)
        }
        else{
            this.classes.forEach(className => a.classList.add(className))
        }
        
        a.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.name}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
                    `

        this.parent.append(a)
    }
}


const getResource = async (url) =>{
    const result = await fetch(url);
    if(!result.ok){
       throw new Error(`Could not fetch ${url} status: ${result.status}`);
    }
    return await result.json();
}

// getResource('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({src, alt, name, text, price}) =>{
    //         new Menu(src, alt, name, text, price, '.menu .container').render()
    //     })
    // })


axios.get('http://localhost:3000/menu')
        .then(data =>{
        data.data.forEach(({src, alt, name, text, price}) =>{
            new Menu(src, alt, name, text, price, '.menu .container').render()
        })
    })

// getResource('http://localhost:3000/menu')
//     .then(data => createCart(data))

//     function createCart(data){
//         data.forEach(({src, alt, name, text, price}) => {
//             const element = document.createElement('div')

//             element.classList.add('menu__item')
//             element.innerHTML =`
//                 <img src=${src} alt=${alt}>
//                     <h3 class="menu__item-subtitle">${name}</h3>
//                     <div class="menu__item-descr">${text}</div>
//                     <div class="menu__item-divider"></div>
//                     <div class="menu__item-price">
//                         <div class="menu__item-cost">Price:</div>
//                         <div class="menu__item-total"><span>${price}</span> UAH/day</div>
//                      </div>
//             ` 
//             document.querySelector('.menu .container').append(element)
//         })
       
//     }




}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms (){
//forms

const forms = document.querySelectorAll('form');

const massage = {
    loading: 'img/form/spinner.svg',
    success: 'THANKS, WE MASSAGE YOU',
    failure: 'ERROR'
}

forms.forEach(item =>{
    bindPostData(item);
})

const postData = async (url, data) =>{
    const result = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })
    return await result.json();
}


function bindPostData(form){
    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const statusMassage = document.createElement('img');
        statusMassage.src = massage.loading;
        statusMassage.style.cssText =`
        display: block;
        margin: 0 auto;
        `
    
        form.insertAdjacentElement('afterend', statusMassage);


        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()))
        
        postData('http://localhost:3000/requests', json)
        .then(data =>{
                console.log(data)
                showThanksModel(massage.success);
                form.reset();
                statusMassage.remove()
        }).catch(() =>{
            showThanksModel(massage.failure);
        }).finally(() =>{
            form.reset();
        })

    })
}

function showThanksModel(massage){
    const prevModalDialog  = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide')
    modalOpen();


    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class='modal__content' >
    <div class='modal__close' data-close>×</div>
    <div class='modal__title'>${massage}</div>
    </div>
    
    `
    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show')
        prevModalDialog.classList.remove('hide')
        modalClose();
    }, 4000);
}


}
module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal (){
const modalWindow = document.querySelector('.modal')
const contactBtn = document.querySelectorAll('[data-modal]')


function modalOpen () {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); 
} 

function modalClose() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = ''; 
}

contactBtn.forEach(btn => {
    btn.addEventListener('click', modalOpen);
});

modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '' ) {
        modalClose();
    }  
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modalWindow.classList.contains('show')) {
        modalClose();
    }
});

const modalTimerId = setTimeout(modalOpen, 5000);

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        modalOpen();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider (){
//slider
const slider = document.querySelector('.offer__slider')
const current =  document.querySelector('#current')
const total =  document.querySelector('#total')
const prev = document.querySelector('.offer__slider-prev')
const next = document.querySelector('.offer__slider-next')
const slides = document.querySelectorAll('.offer__slide')
const wrapper = document.querySelector('.offer__slider-wrapper')
const slidsField = document.querySelector('.ofer__slider-inner')
const width = window.getComputedStyle(wrapper).width
let index = 1;
let ofset = 0

if(slides.length < 10){
    total.textContent = `0${slides.length}`
    current.textContent = `0${index}`
}else{
    total.textContent = slides.length
    current.textContent = index
}


slidsField.style.width = 100 * slides.length + '%';
slidsField.style.display = 'flex';
slidsField.style.transition = '0.5s all';

wrapper.style.overflow = 'hidden'

slides.forEach(e =>{
    e.style.width = width;
})

slider.style.position = 'relative'

const indicators = document.createElement('ol')
const dots = [];

indicators.classList.add('carousel-indicators')
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`
slider.append(indicators)

for(let i = 0; i < slides.length; i++){
    const dot =  document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1)
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;`
        if(i == 0){
            dot.style.opacity = 1
        }
    indicators.append(dot)
    dots.push(dot)
}

function reg (str){
 return +str.replace(/\D/g, '')
}

next.addEventListener('click', () =>{
    if(ofset == reg(width) * (slides.length - 1)){
        ofset = 0
    }
    else{
        ofset += reg(width)
    }
    slidsField.style.transform = `translateX(-${ofset}px)`

    if(index == slides.length){
        index = 1
    }else{
        index++
    }

    if(slides.length < 10){
        current.textContent = `0${index}`
    }else{
        current.textContent = index
    }

    dots.forEach(dot => dot.style.opacity = '.5')
    dots[index - 1].style.opacity = 1;
})

prev.addEventListener('click', () =>{
    if(ofset == 0){
        ofset = reg(width) * (slides.length - 1)
    }
    else{
        ofset -= reg(width)
    }
    slidsField.style.transform = `translateX(-${ofset}px)`

    if(index == 1){
        index = slides.length
    }else{
        index--
    }

    if(slides.length < 10){
        current.textContent = `0${index}`
    }else{
        current.textContent = index
    }

    dots.forEach(dot => dot.style.opacity = '.5')
    dots[index - 1].style.opacity = 1;
})

dots.forEach(dot =>{
    dot.addEventListener('click', (e)=>{
        const slideTo = e.target.getAttribute('data-slide-to')

        index = slideTo;
        ofset = reg(width) * (slideTo - 1)
        
        slidsField.style.transform = `translateX(-${ofset}px)`
        
        if(slides.length < 10){
        current.textContent = `0${index}`
        }else{  
        current.textContent = index
        }
        
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[index - 1].style.opacity = 1;
        
    })
})
}
module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs(){
     // tabs
    const tabs = document.querySelectorAll(".tabheader__item"); 
    const tabContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");
    

    function hideTubContent(){
        tabContent.forEach(item =>{
            item.classList.add('hide')
            item.classList.remove('show','fade')
        } )

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0){
        tabContent[i].classList.add('show', 'fade')
        tabContent[i].classList.remove('hide')
        tabs[i].classList.add('tabheader__item_active')
    }
    hideTubContent();
	showTabContent();

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTubContent();
                    showTabContent(i);
                }
            })
        }
    })
}
module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer (){
const deadLine = '2025-08-15';
    
    function getTimeRemaining(endtime){
        let days,hours,minutes,seconds;
        const t  = Date.parse(endtime) - Date.parse(new Date());
        if(t <= 0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        }else{
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000 ) % 60);
            }
            return{
            'total' : t,
            'days' : days,
            'hours': hours,
            'minutes' : minutes,
            'seconds': seconds
            }
        
    }

    function getZero(num){
        if (num >=0 && num <10) {
            return `0${num}`
        }else{
            return num
        }
    }

    function setClock(selector, endtime){
        const timer = document.querySelector(selector)
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        const timeInterval = setInterval(updateClock, 1000)

        updateClock();
        
        function updateClock(){
          const t =  getTimeRemaining(endtime)
          days.innerHTML = getZero(t.days)
          hours.innerHTML = getZero(t.hours)
          minutes.innerHTML = getZero(t.minutes)
          seconds.innerHTML = getZero(t.seconds)
          if(t.total <= 0){
            clearInterval(timeInterval)
          }
        }
    }

setClock('.timer', deadLine)


}
module.exports = timer

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () =>{
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js")
    const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js")
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js")
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js")
    const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js")
    const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js")
    const calcCaloris = __webpack_require__(/*! ./modules/calccaloris */ "./js/modules/calccaloris.js")

    tabs();
    modal();
    timer();
    slider();
    cards();
    forms();
    calcCaloris();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map