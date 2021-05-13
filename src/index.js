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
  p.innerHTML = `Feels Like : ${Math.round(data.main.feels_like)}`;
  p1.innerHTML = `Minimum Temperature : ${Math.round(data.main.temp_min)}`;
  p2.innerHTML = `Maximum Temperature : ${Math.round(data.main.temp_max)}`;
  p3.innerHTML = `Humidity : ${Math.round(data.main.humidity)}`;
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

url = 'https://api.openweathermap.org/data/2.5/weather?q=jos&units=metric&appid=f143eabdcb81c14621c46bee170ba541';
getData(url);
document.getElementById('celsius').disabled = true;

const getUrl = () => {
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
};

btnGetWeather.addEventListener('click', () => {
  displayRemove();
  getUrl();
  
  getData(url);
  reset();
});

function setCelcius() {
  document.getElementById('celsius').disabled = true;
  // displayRemove();
  // getUrl();
  // p.classList.remove('text-danger');
  getData(url);
  document.getElementById('fahrenheit').disabled = false;
}

function setFahrenheit() {
  const cel = temp.innerHTML;
  const fahrenheit = Math.round((cel * (9 / 5)) + 32);
  temp.innerHTML = `${fahrenheit}`;
  document.getElementById('fahrenheit').disabled = true;
  document.getElementById('celsius').disabled = false;
}

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