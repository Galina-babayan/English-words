function slider(container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field){
       // Slider


    const slider = document.querySelector(container);       
    const slides = document.querySelectorAll(slide);
    const slideNext = document.querySelector(nextArrow);
    const slidePrev = document.querySelector(prevArrow);
    const currentNumber = document.querySelector(currentCounter);
    const totalNumber = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;
// console.log(width);



  // const slides = document.querySelectorAll(".offer__slide");
  // const slideNext = document.querySelector(".offer__slider-next");
  // const slidePrev = document.querySelector(".offer__slider-prev");
  // const currentNumber = document.querySelector('#current');
  // const totalNumber = document.querySelector('#total');
  // const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  // const slidesField = document.querySelector('.offer__slider-inner');
  // const width = window.getComputedStyle(slidesWrapper).width;
  // const slider = document.querySelector(container);
  const dots = document.createElement("ol");
  const dotsArr = [];
 
  dots.classList.add('carousel-indicators');
  

  slider.style.position = 'relative';
  slider.append(dots);

  let slideIndex = 1;

  // dots.childNodes.forEach(node => {
  //   node.classList.remove('dot-active');
  //   node[slideIndex - 1].classList.add('dot-active');
  // })
 
  for (let i = 0; i < slides.length; i++){
    const dot = document.createElement("li");
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot'); 
    if (i == 0){
      dot.classList.add('dot-active');
    }
    dots.append(dot);
    dotsArr.push(dot);
  }

  // мой вариант:

  // let sliderIndex = slides.length;
  // let currentIndex = 0;

  // if (slides.length < 10) {
  //   totalNumber.textContent = `0${sliderIndex}`;
  // } else {
  //   totalNumber.textContent = slides.length;
  // }

  // function hideSlides(){
  //   slides.forEach(item => {
  //     item.classList.add('hide');
  //    });   
  // };

  // function showSlide(i = 0) {                    // значение по умолчанию
  //   slides[i].classList.add('show');
  //   slides[i].classList.remove('hide');   
  //   currentNumber.textContent = i + 1; 
  //   if (i < 9) {
  //     currentNumber.textContent =  `0${i + 1}`;       
  //   }
  // };

  // hideSlides();
  // showSlide();

  // slideNext.addEventListener('click', () => {
    

  //     hideSlides();
  //     currentIndex += 1;
      
  //     if (currentIndex > sliderIndex - 1 ){
  //       currentIndex = 0;       
  //       console.log(currentIndex);
  //     } 
  //     showSlide(currentIndex);
  // });

  // slidePrev.addEventListener('click', () => {
   
  //     hideSlides();
  //     if (currentIndex < 1){
  //       currentIndex = sliderIndex;            
  //     } 
      
  //     currentIndex = currentIndex - 1;     

  //     showSlide(currentIndex);      
    
  // });

  // Ваня:

  // вариант с каруселью: 

  let offset = 0;

   if (slides.length < 10) {
    totalNumber.textContent = `0${slides.length}`;    
  } else {
    totalNumber.textContent = slides.length;    
  }

  function setCurrentIndex (){
    if (slideIndex < 10) {  
      currentNumber.textContent = `0${slideIndex}`;
    } else { 
      currentNumber.textContent = slideIndex;
    }
  };

  function changeClass (){
    dotsArr.forEach(dot => {
      dot.classList.remove("dot-active");
     });
     dotsArr[slideIndex - 1].classList.add("dot-active");
  }

  setCurrentIndex();

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;    
  });

  function stringToNumber (str) {
      return +str.replace(/\D/g, '');
  }

  // let widthNumber = stringToNumber(width);


  slideNext.addEventListener('click', () => {
    if (offset == stringToNumber(width) * (slides.length - 1)){   // последий слайд, регул. выр-е - удаляем все нечисла
       offset = 0;
    } else {
      offset += stringToNumber(width);                   // а тут slice был: +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    

    if (slideIndex == slides.length){
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setCurrentIndex();
    changeClass();

  });



  slidePrev.addEventListener('click', () => {
    if (offset == 0){                                                   // а тут сравнение, поэтому "=="
      offset = stringToNumber(width) * (slides.length - 1); // уже не с сравнением, а с присваиванием, поэтому "="
    } else {
      offset -= stringToNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1){
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setCurrentIndex();
    changeClass();
  });

  dotsArr.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = stringToNumber(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      setCurrentIndex();
      changeClass();
    })
  })




  // простой вариант:

  // let slideIndex = 1;

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  //   totalNumber.textContent = `0${slides.length}`;
  // } else {
  //   totalNumber.textContent = slides.length;
  // }

  // function showSlides(n) {
  //   if (n > slides.length){
  //     slideIndex = 1;
  //   }

  //   if (n < 1){
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(item => 
  //     item.style.display = 'none'); 

  //   slides[slideIndex - 1].style.display = 'block'; 

  //   if (slides.length < 10) {
  //     currentNumber.textContent = `0${slideIndex}`;
  //   } else {
  //     currentNumber.textContent = slideIndex;
  //   }
  // };

  // function plusSlides(n){
  //   showSlides(slideIndex += n);
  // }

  // slidePrev.addEventListener('click', () => {
  //   plusSlides(-1);
  // });

  // slideNext.addEventListener('click', () => {
  //   plusSlides(1);
  // });
}

export default slider;