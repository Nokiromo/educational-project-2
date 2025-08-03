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