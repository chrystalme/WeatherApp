import '../style/style.scss';

const form = document.querySelector('form');

const myCity = document.getElementById('city-input');
const btnGetWeather = document.getElementById('get-weather');
const result = document.getElementById('result');
const resultInner = document.createElement('div');
resultInner.id = 'inner-content';
resultInner.classList.add('text-center', 'mt-2', 'text-white');
const div = document.createElement('div');
const temp = document.createElement('span');
const icon = document.createElement('img');
const tempUnit = document.createElement('div');
const h3 = document.createElement('h3');
const p = document.createElement('p');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
const p3 = document.createElement('p');
h3.classList.add('my-4');
div.style.fontSize = '6rem';
div.style.position = 'relative';
temp.id = 'temp';
tempUnit.innerHTML = '<button  id="celsius"type="button" class="btn btn-primary">C</button><button id="fahrenheit" type="button" class="btn btn-primary">F</button>';
tempUnit.classList.add('units', 'btn-group');
tempUnit.role = 'group';
tempUnit.style.position = 'absolute';
tempUnit.style.top = '5px';
tempUnit.style.right = '25px';
result.appendChild(tempUnit);


let url;
let city;

const reset = () => {
  form.reset();
};

const displayRemove = () => {
  resultInner.innerHTML = '';
};


const getData = async url => {
  const response = await fetch(url, { mode: 'cors' });
  if (response.status === 404) {
    resultInner.classList.add('text-danger');
    resultInner.classList.remove('text-white');
    resultInner.innerHTML = 'City not found';
    return;
  }
  resultInner.classList.remove('text-danger');
  resultInner.classList.add('text-white');
  const data = await response.json();

  h3.innerHTML = `<b>${data.name}</b> : ${data.weather[0].description}`;
  const iconImg = data.weather[0].icon;
  resultInner.appendChild(h3);
  temp.innerHTML = Math.round(data.main.temp);
  p.innerHTML = `Feels Like : <span id='p'>${Math.round(data.main.feels_like)}</span>`;
  p1.innerHTML = `Minimum Temperature : <span id='p1'>${Math.round(data.main.temp_min)}</span>`;
  p2.innerHTML = `Maximum Temperature : <span id='p2'>${Math.round(data.main.temp_max)}</span>`;
  p3.innerHTML = `Humidity : <span id='p3'>${Math.round(data.main.humidity)}</span>`;
  icon.src = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
  div.appendChild(temp);
  div.appendChild(icon);
  resultInner.appendChild(div);
  resultInner.appendChild(p);
  resultInner.appendChild(p1);
  resultInner.appendChild(p2);
  resultInner.appendChild(p3);
  result.appendChild(resultInner);
};

url = 'https://api.openweathermap.org/data/2.5/weather?q=Beirut&units=metric&appid=f143eabdcb81c14621c46bee170ba541';
getData(url);
document.getElementById('celsius').disabled = true;


btnGetWeather.addEventListener('click', () => {
  displayRemove();
  if (myCity.value === '') {
    resultInner.classList.add('text-danger');
    resultInner.classList.remove('text-white');
    resultInner.innerHTML = 'Invalid location.';
    result.appendChild(resultInner);
    return;
  }
  city = myCity.value;
  resultInner.classList.remove('text-danger');
  resultInner.classList.add('text-white');
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f143eabdcb81c14621c46bee170ba541`;
  getData(url);
  reset();
});

const setCelcius = () => {
  document.getElementById('celsius').disabled = true;
  getData(url);
  document.getElementById('fahrenheit').disabled = false;
};

const setFahrenheit = () => {
  const cel = temp.innerHTML;
  const feelsLike = document.getElementById('p').innerHTML;
  const minTemp = document.getElementById('p1').innerHTML;
  const maxTemp = document.getElementById('p2').innerHTML;
  const fahrenheit = Math.round((cel * (9 / 5)) + 32);
  const fahrenheit1 = Math.round((feelsLike * (9 / 5)) + 32);
  const fahrenheit2 = Math.round((minTemp * (9 / 5)) + 32);
  const fahrenheit3 = Math.round((maxTemp * (9 / 5)) + 32);
  temp.innerHTML = `${fahrenheit}`;
  document.getElementById('p').innerHTML = `${fahrenheit1}`;
  document.getElementById('p1').innerHTML = `${fahrenheit2}`;
  document.getElementById('p2').innerHTML = `${fahrenheit3}`;
  document.getElementById('fahrenheit').disabled = true;
  document.getElementById('celsius').disabled = false;
};

window.onload = () => {
  const celsius = document.getElementById('celsius');
  const fahrenheit = document.getElementById('fahrenheit');
  if (celsius) {
    celsius.addEventListener('click', setCelcius);
  }
  if (fahrenheit) {
    fahrenheit.addEventListener('click', setFahrenheit);
  }
};