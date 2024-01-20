const btn = document.querySelector('.btn');
const result = document.querySelector('.result');

loadPhotosFromLocalStorage()

btn.addEventListener('click', () => {
    const pageNum = document.querySelector('.number').value;
    const limit = document.querySelector('.limit').value;
    if ((pageNum < 1 || pageNum > 10 || isNaN(pageNum)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        result.innerHTML = ("Номер страницы и лимит вне диапазона от 1 до 10");
    } else if (pageNum < 1 || pageNum > 10 || isNaN(pageNum)) {
        result.innerHTML = ("Номер страницы вне диапазона от 1 до 10");
    } else if (limit < 1 || limit > 10 || isNaN(limit)) {
        result.innerHTML = ("Лимит вне диапазона от 1 до 10");
    } else {
        result.innerHTML = ("Фото загружаются...");
        fetch(` https://jsonplaceholder.typicode.com/photos?_page=${pageNum}&_limit=${limit}`)
            .then((response) => response.json())
            .then((json) => {
                displayResult(json);
                savePhotosToLocalStorage();
            })
            .catch(() => {console.log('Ошибка')});
    }
})

function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock =`<img src="${item.url}"/>`;
        cards += cardBlock;
    });

    result.innerHTML = cards;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photo", result.innerHTML);
}

function loadPhotosFromLocalStorage() {
    result.innerHTML = localStorage.getItem("last_photo");
}