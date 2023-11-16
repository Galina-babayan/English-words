window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    let textNodes = [];

    function recursy (element) {
        element.childNodes.forEach(node => {
            
            // if (node.nodeName === "#text") { // получим только теги
            //     return;
            // } else {
            //     console.log(node);
            //     recursy(node);
            // }

            if (node.nodeName.match(/^H\d/)){ // например, получить все заголовки (H1, H2,  и т д)
                const obj = {
                    header: node.nodeName,
                    content: node.textContent
                }
                textNodes.push(obj);
            } else {
                recursy(node);
            }
        });
    }

    recursy(body);
    // console.log(textNodes); // получим массив с заголовками
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(textNodes)  // получим массив с объектами в формате json
    })
    .then(response => response.json())
    .then(json => console.log(json));
});