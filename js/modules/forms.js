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