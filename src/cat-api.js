import Notiflix from 'notiflix';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_U588Ak0uXwekQpXwZ2wClUj90wicvA8vGnN24XQOibhO0gJXOHL5g8BH1KPLiPtd';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

// Отримуємо дані з бібліотеки
function fetchBreeds() {
  return axios
    .get(`breeds/`)
    .then(resp => {
    //   console.log("Отримана відповідь response у вигляді об'єкту: ", resp);
    //   console.log('');
    //   console.log('Масив данних по котах: ', resp.data);
      if (resp.status !== 200) {
        throw new Error(resp.status);
      }
      return resp.data;
    })
    .catch(() => {
      Notiflix.Report.failure('Щось пышло не так. Маємо помилку в catch!');
    });
}

// Запит про конкретун породу за назвою
function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(resp => {
      if (resp.status !== 200) {
        throw new Error(resp.status);
      }
      return resp.data[0];
    })
    .catch(() => {
      Notiflix.Report.failure('Щось пышло не так. Маємо помилку в catch!');
    });
}

export { fetchBreeds, fetchCatByBreed };
