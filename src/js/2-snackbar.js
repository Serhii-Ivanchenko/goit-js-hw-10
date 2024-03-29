import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[name=delay]');
const submitBtn = document.querySelector('button');
const form = document.querySelector('.form');

form.addEventListener('submit', submitHandle);
input.addEventListener('input', inputHandle);

function inputHandle(event) {
  const inputData = event.target.value;
  localStorage.setItem('delay', inputData);
}

function submitHandle(event) {
  event.preventDefault();

  const delay = localStorage.getItem('delay');
  const choice = localStorage.setItem(
    'state',
    event.target.elements.state.value
  );
  const state = localStorage.getItem('state');

  const iziSuccessOptions = {
    title: '✅',
    titleSize: '24px',
    message: `Fulfilled promise in ${delay}ms`,
    messageColor: 'white',
    messageSize: '16px',
    backgroundColor: 'lightgreen',
    position: 'topRight',
    timeout: 3000,
  };

  const iziRejectOptions = {
    title: '❌',
    titleSize: '24px',
    message: `Rejected promise in ${delay}ms`,
    messageColor: 'white',
    messageSize: '16px',
    backgroundColor: 'rgba(225, 0, 0, 0.3)',
    position: 'topRight',
    timeout: 3000,
  };

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(iziToast.show(iziSuccessOptions));
      } else {
        reject(iziToast.show(iziRejectOptions));
      }
    }, delay);
  });

  promise
    .then(value => {
      console.log(value);
    })
    .catch(error => {
      console.log(error);
    });
  form.reset();
}
