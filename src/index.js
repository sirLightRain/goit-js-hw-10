import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const delay = 2000;

breedSelect.style.display = 'none';
// Custom loading indicator від Notiflix
Notiflix.Loading.custom('Завантажую...', {
  customSvgUrl:
    'https://notiflix.github.io/content/media/loading/notiflix-loading-nx-light.svg',
});
// Прибираємо чтартовий завантажувач черезщ 2 секунди
Notiflix.Loading.remove(delay);

// Функція для затримки відмальовки стартової розмітки
window.addEventListener('load', () => {
  setTimeout(() => {
    breedSelect.style.display = 'block';
  }, delay);
});

// Наповнюємо меню тегу селект
fetchBreeds()
  .then(data => {
    console.log('Масив котів: ', data);
    // Розмітка для меню тегу селект
    const option = data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    breedSelect.innerHTML = option;
  })
  .catch(() => {
    Notiflix.Report.failure('Щось пішло не так! Перезавантажте сторінку!');
  });

// Додаємо слухача подій на селект по події "change".
breedSelect.addEventListener('change', evt => {
  evt.preventDefault();

  //  Notiflix завантажувач
  Notiflix.Loading.standard('Завантажую ...');

  const breedSelectId = breedSelect.value;

  //   Запит про кота
  fetchCatByBreed(breedSelectId)
    .then(cat => {
      console.log(
        `Інформацуія про кота з ID=${breedSelectId} та іменем=${cat.breeds[0].name}: `,
        cat
      );
      // Выдключаэмо Notiflix завантажувач
      Notiflix.Loading.remove(delay);
      //   Створ.ємо розмітку інформації про кота
      const markup = `
        <div class="container" style="display: flex;">

            <div class="thumb-pic">
                <img src="${cat.url}" alt="${cat.id}" width="400" />
            </div>

            <div class="thumb" style="flex: 1; margin-left: 10px; margin-top: -24px">
                <h2>${cat.breeds[0].name}</h2>
                <p>${cat.breeds[0].description}</p>
                <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
            </div>

        </div>`;
      setTimeout(() => {
        catInfo.innerHTML = markup;
      }, delay);
    })
    .catch(() => {
      // Notiflix повыдомлення про помилку
      Notiflix.Report.failure(
        'Немає інформації про цього кота!',
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Будь ласка оберіть іншу породу!',
        'Okay'
      );
      //   Прибираємо розмітку, якщо інформації про кота не існує;
      const markup = ``;
      catInfo.innerHTML = markup;
      Notiflix.Loading.remove();
    });
});
