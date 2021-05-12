import '../style/style.scss';

const form = document.querySelector('form');

const myCity = document.getElementById('city-input');
const btnGetWeather = document.getElementById('get-weather');
const result = document.getElementById('result');
const resultInner = document.createElement('div');
resultInner.id = 'inner-content';
resultInner.classList.add('text-center', 'mt-2', 'text-white');
const temp = document.createElement('span');
const tempUnit = document.createElement('h6');
const h3 = document.createElement('h3');
const p = document.createElement('p');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
const p3 = document.createElement('p');
temp.style.fontSize = '6rem';
temp.style.position = 'relative';
tempUnit.style.position = 'absolute';
tempUnit.style.top = '15px';
tempUnit.style.right = '-10px';

let url;
let city;

function reset() {
  form.reset();
}

function displayRemove() {
  resultInner.innerHTML = '';
}

async function getData(url) {
  const response = await fetch(url, { mode: 'cors' });
  const data = await response.json();
  h3.innerHTML = `${data.name}`;
  resultInner.appendChild(h3);
  temp.innerHTML = Math.round(data.main.temp);
  tempUnit.innerHTML = 'C';
  p.innerHTML = `Feels Like : ${Math.round(data.main.feels_like)}`;
  p1.innerHTML = `Minimum Temperature : ${Math.round(data.main.temp_min)}`;
  p2.innerHTML = `Maximum Temperature : ${Math.round(data.main.temp_max)}`;
  p3.innerHTML = `Humidity : ${Math.round(data.main.humidity)}`;
  temp.appendChild(tempUnit);
  resultInner.appendChild(temp);
  resultInner.appendChild(p);
  resultInner.appendChild(p1);
  resultInner.appendChild(p2);
  resultInner.appendChild(p3);
  result.appendChild(resultInner);
}

url = 'https://api.openweathermap.org/data/2.5/weather?q=jos&units=metric&appid=f143eabdcb81c14621c46bee170ba541';
getData(url);

btnGetWeather.addEventListener('click', () => {
  displayRemove();
  if (myCity.value === '') {
    p.classList.add('text-danger');
    p.innerHTML = 'Invalid location.';
    resultInner.appendChild(p);
    result.appendChild(resultInner);
    return;
  }
  city = myCity.value;
  p.classList.remove('text-danger');
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f143eabdcb81c14621c46bee170ba541`;


  getData(url);
  reset();
});
