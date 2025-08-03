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