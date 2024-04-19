'use strict';

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

        console.log(dataFromSrv);

        return dataFromSrv;

    } catch(error) {

        console.error(error);

    }
}

const validateData = e => {
    e.preventDefault();

    const mail = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    const dataFromForm = {
        mail,
        subject,
        message
    }

    getDataFromSrv(dataFromForm);

}

const form = document.querySelector('form');

form.addEventListener('submit', validateData);