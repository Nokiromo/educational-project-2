window.addEventListener('DOMContentLoaded', () =>{

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


    // timer
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



// Modal
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


new Menu(
    "img/tabs/vegy.jpg",
    "vegy",
    '"Fitness" Menu',
    'Fitness" menu is a new approach to cooking: more fresh vegetables and fruits. <br> A product for active and healthy people. A completely new offering with optimal price and high quality!',
    9,
    '.menu .container',
   
).render()
new Menu(
    "img/tabs/elite.jpg",
    "elite",
    '"Premium" Menu',
    'In the "Premium" menu we use not only beautiful packaging design, but also high-quality dish execution.<br> Red fish, seafood, fruits — restaurant-style menu without going to a restaurant!',
    12,
    '.menu .container',
    'menu__item'
).render()
new Menu(
    "img/tabs/post.jpg",
    "post",
    '"Vegan" Menu',
    'The “Vegan” menu is a careful selection of ingredients: completely free from animal products, featuring almond, oat, coconut, or buckwheat milk, and an optimal amount of protein from tofu and imported vegetarian steaks.',
    15,
    '.menu .container',
    'menu__item'
).render()

//forms

const forms = document.querySelectorAll('form');

const massage = {
    loading: 'img/form/spinner.svg',
    success: 'THANKS, WE MASSAGE YOU',
    failure: 'ERROR'
}

forms.forEach(item =>{
    postData(item);
})



function postData(form){
    form.addEventListener('submit', (e) =>{
        e.preventDefault();

        const statusMassage = document.createElement('img');
        statusMassage.src = massage.loading;
        statusMassage.style.cssText =`
        display: block;
        margin: 0 auto;
        `
        form.append(statusMassage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json');

        const formData = new FormData(form);

        const obj = {};
        formData.forEach(function(value,key){
            obj[key] = value;
        })

        const json = JSON.stringify(obj)
        request.send(json);

        request.addEventListener('load', () => {
            if (request.status == 200){
                console.log(request.response)
                showThanksModel(massage.success);
                form.reset();
                
                    statusMassage.remove()
                  
            }else{
                showThanksModel(massage.failure);
            }
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


})