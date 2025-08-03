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