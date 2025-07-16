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
const closeBtn = document.querySelector('[data-close]')




function modalOpen ()   {
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide')
    document.body.style.overflow = 'hidden'
    clearInterval(modalTimerId) 
} 
function modalClose(){
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide')
    document.body.style.overflow = '' 
}
    contactBtn.forEach(btn => {
    btn.addEventListener('click', modalOpen)
    });

modalWindow.addEventListener('click', modalClose)
  modalWindow.addEventListener('clisck', (e) =>{
    if (e.target === modalWindow){
        modalClose()
    }  
})

document.addEventListener('keydown', (e) =>{
    if(e.code === 'Escape' && modalWindow.classList.contains('show')){
        modalClose()
    }
})
const modalTimerId =  setTimeout(modalOpen, 5000);

function showModalByScroll() {
     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
        modalOpen()
        window.removeEventListener('scroll',showModalByScroll)
    }
}

window.addEventListener('scroll',showModalByScroll)



})