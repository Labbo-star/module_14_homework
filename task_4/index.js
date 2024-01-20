const btn = document.querySelector('.btn_sub');
const result = document.querySelector('.result');

btn.addEventListener('click', () => {
    const input_1 = document.querySelector('.input_1').value;
    const input_2 = document.querySelector('.input_2').value;
    if (Number(input_1) < 100 || Number(input_1) > 300 || Number(input_2) < 100 || Number(input_2) > 300) {
        result.innerHTML = '<p>одно из чисел вне диапазона от 100 до 300</p>';
    } else {
        fetch(`https://dummyimage.com/${input_1}x${input_2}/`)
        .then((response) => {
            result.innerHTML = `<img class="image" src="${response.url}">`
        })
        .catch(() => { console.log('Ошибка') });
    }
})