  // функция для post запросов
  const postData = async (url, data) => {
    const res = await fetch(url, {                   // это асинхронный код, сначала будет выполняться 
      method: "POST",                          // правая часть, но неизвестно как долго, а переменная
      headers: {                               // res уже создастся после правой части и ниже будет ошибка при попытке ее  
         'Content-type': 'application/json'    // обработать: return res.json(); Поэтому пишем async, чтобы сказать, что у нас будет внутри 
      },                                       // асинхронный код, и await - перед теми операциями, которые надо дождаться
      body: data
    });

    return await res.json();   // это промис будет, здесь тоже надо подождать, поэтому пишем await
  };

     // функция для get запросов:

  const getResource = async (url) => {
    const res = await fetch(url);
    
        if (!res.ok){
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
    return await res.json();   
  };

  export {postData};
  export {getResource};