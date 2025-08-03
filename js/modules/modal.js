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