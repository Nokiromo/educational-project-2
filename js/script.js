window.addEventListener('DOMContentLoaded', () =>{
    const tabs = require('./modules/tabs')
    const modal = require('./modules/modal')
    const timer = require('./modules/timer')
    const slider = require('./modules/slider')
    const cards = require('./modules/cards')
    const forms = require('./modules/forms')
    const calcCaloris = require('./modules/calccaloris')

    tabs();
    modal();
    timer();
    slider();
    cards();
    forms();
    calcCaloris();
})