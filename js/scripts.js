'use strict';

const menuHam = document.querySelector('nav .material-icons');
const menu = document.querySelector('.div-menu');

const links = document.querySelectorAll('.div-menu a, .div-menu .material-icons');

links.forEach(elem => {
    elem.addEventListener('click', () => {
        menu.classList.add('hide-menu');
        menu.classList.remove('hide-menu');
    });
});

menuHam.addEventListener('click', () => {
    menu.classList.remove('hide-menu');
    menuHam.classList.add('hide-menu');
});

const labelAll = document.querySelectorAll('label');

const labelVal = [];

labelAll.forEach(elem => {
    labelVal.push(elem.innerText);
});

//console.log(labelVal);

const showError = (label, textError) => {
    label.innerText = textError;
    label.classList.add('alert', 'alert-danger');
}

//showError(labelAll[0], 'To pole jest wymagane');

const getDataFromSrv = async dataFromForm => {
    const urlRestApi = 'http://localhost:8888/validate';
    const method = 'post';
    const dataToSend = dataFromForm;
    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const response = await fetch(urlRestApi, {
            method,
            body: JSON.stringify(dataToSend),
            headers
        });

        const dataFromSrv = await response.json();

        return dataFromSrv;

    } catch(error) {

        console.error(error);

    }
}

const validateData = e => {
    e.preventDefault();

    const resPlace = document.querySelector('#resultPlace');
    resPlace.innerText = '';
    resPlace.classList.remove('alert', 'alert-success');

    labelAll.forEach((elem, i) => {
        elem.classList.remove('alert', 'alert-danger');
        elem.innerText = labelVal[i];
    });

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }

    getDataFromSrv(dataFromForm)
    .then(res => {
        console.log(res);

        if('send' in res) {
            resPlace.innerText = res.send;
            resPlace.classList.add('alert', 'alert-success');
            document.querySelectorAll('input:not(input[type="submit"]), textarea').forEach(elem => {
                elem.value = '';
            })
        } else {
            if('email' in res) {
                showError(labelAll[0], res.email);
            }
            if('subject' in res) {
                showError(labelAll[1], res.subject);
            }
            if('message' in res) {
                showError(labelAll[2], res.message);
            }
        }
    });

}

const form = document.querySelector('form');

form.addEventListener('submit', validateData);