function openModal (modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  console.log(modalTimerId);
  if (modalTimerId){
    clearInterval(modalTimerId);
  }
  
}

function closeModal(modalSelector){
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId){
  
  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);



modalTrigger.forEach(btn => {
    // создадим стрелочную функцию, так как нужет аргумент, но нельзя ее тут 
  // вызывать сразу, а стрелочная позволяет так написать, не вызовется сразу
  btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});

modal.addEventListener('click', (event) => {
if (event.target === modal || event.target.getAttribute("data-close") == "") {
closeModal(modalSelector);
}
});

document.addEventListener('keydown', (event) => {
if (event.code === 'Escape' && modal.classList.contains('show')) {
closeModal(modalSelector);
}
});



function showModalByScroll(){
if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
openModal(modalSelector, modalTimerId);
window.removeEventListener('scroll', showModalByScroll);
}
}

window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};