/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};
  
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.button');
  
/**
    * Функция обработки полученного результата
    * apiData - объект с результатом запроса
    */
function displayResult(apiData) {
    let cards = '';
    // console.log('start cards', cards);
    
    apiData.forEach(item => {
      const cardBlock = `<img src="${item.url}" class="card-image"/>`;
      cards = cards + cardBlock;
    });
    
    // console.log('end cards', cards);
      
    resultNode.innerHTML = cards;
}
  
  // Вешаем обработчик на кнопку для запроса
btnNode.addEventListener("click", () => { 
    const input = document.querySelector('input').value;
    if ((Number(input) < 1) || (Number(input) > 10)) { 
        resultNode.innerHTML = "<p>число вне диапазона от 1 до 10</p>"; 
    } else { 
      url = `https://jsonplaceholder.typicode.com/photos?_limit=${input}`; 
      useRequest(url, displayResult); 
      } 
});