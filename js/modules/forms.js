import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId){
      // Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы свяжемся с вами',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  });



  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement('afterend', statusMessage);

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      // request.setRequestHeader('Content-type', 'application/json');      
      
      const formData = new FormData(form);

      // перепишем это поэлегантней:

      // const object = {};
      // formData.forEach(function(value, key){
      //   object[key] = value;
      // });

      // пример:
      // const obj = {a: 23, b: 50};
      // console.log(Object.entries(obj)); // [['a', 23], ['b', 50]]

      // будет массив массивов, как в примере выше
      // теперь надо превратить данные обратно в объект с помощью Object.fromEntries()
      const json = JSON.stringify(Object.fromEntries(formData.entries())); 

      // request.send(json);

      // удаляем старый код, подставляем postData:

      // fetch('server.php', {   
      //   method: "POST",       
      //   headers: {
      //      'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(object)
      // })
      postData('http://localhost:3000/requests', json)
      // .then(data => data.text()) // эта строка не нужна, мы трансформируем данные в postData
      .then(data => {
        console.log(data);
        showThanksModal(message.success);        
        statusMessage.remove();  
      })  
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });

      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //      console.log(request.response);
      //      showThanksModal(message.success);
      //      form.reset();
      //      statusMessage.remove();           
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // })
    })
  };

  function showThanksModal(message){
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
       <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
       </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  } 

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;