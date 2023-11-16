import  tabs from './modules/tabs';
import  calc from './modules/calc';
import  cards from './modules/cards';
import  forms from './modules/forms';
import  modal from './modules/modal';
import  slider from './modules/slider';
import  timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {   
  
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", 'tabheader__item_active');
    calc();
    cards();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    // slider({                             // этот вариант с деструктуризацией не работает почему-то
    //   container: '.offer__slider',
    //   slide: ".offer__slide",
    //   nextArrow: ".offer__slider-next",
    //   prevArrow: ".offer__slider-prev",       
    //   totalCounter: '#total',
    //   currentCounter: '#current',
    //   wrapper: '.offer__slider-wrapper',
    //   field: '.offer__slider-inner'
    // });
    slider('.offer__slider', ".offer__slide", ".offer__slider-next", ".offer__slider-prev", '#total', '#current', '.offer__slider-wrapper', '.offer__slider-inner');
    timer('.timer', '2023-12-26');
});