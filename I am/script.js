const form = document.querySelector('.container-form');

const inputQtd = document.querySelector('#qtd');
const inputMin = document.querySelector('#min');
const inputMax = document.querySelector('#max');
const switchNoRepeat = document.querySelector('#no-repeat');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const ojb = {
        amount: Number(inputQtd.value),
        min: Number(inputMin.value),
        max: Number(inputMax.value),
        noReapeat: switchNoRepeat.checked
    }

});