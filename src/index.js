import '../style/style.scss';

const form = document.querySelector('form');

const myCity = document.getElementById('city-input');
const btnGetWeather = document.getElementById('get-weather');
const result = document.getElementById('result');
const resultInner = document.createElement('div');
resultInner.id = 'inner-content';
resultInner.classList.add('text-center', 'mt-2', 'text-white');
const temp = document.createElement('span');
const icon = document.createElement('img');
const tempUnit = document.createElement('div');
const h3 = document.createElement('h3');
const p = document.createElement('p');
const p1 = document.createElement('p');
const p2 = document.createElement('p');
const p3 = document.createElement('p');
h3.classList.add('my-4');
temp.style.fontSize = '6rem';
temp.style.position = 'relative';
tempUnit.classList.add('units');
tempUnit.style.position = 'absolute';
tempUnit.style.top = '5px';
tempUnit.style.right = '-25px';


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
  const data = await response.json();
  h3.innerHTML = `${data.name}`;
  const iconImg = data.weather[0].icon;
  resultInner.appendChild(h3);
  temp.innerHTML = Math.round(data.main.temp);
  tempUnit.innerHTML = "<span id='celsius'>C</span> | <span id='fahrenheit'>F</span>";
  p.innerHTML = `Feels Like : ${Math.round(data.main.feels_like)}`;
  p1.innerHTML = `Minimum Temperature : ${Math.round(data.main.temp_min)}`;
  p2.innerHTML = `Maximum Temperature : ${Math.round(data.main.temp_max)}`;
  p3.innerHTML = `Humidity : ${Math.round(data.main.humidity)}`;
  icon.src = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;
  temp.appendChild(tempUnit);
  temp.appendChild(icon);
  resultInner.appendChild(temp);
  resultInner.appendChild(p);
  resultInner.appendChild(p1);
  resultInner.appendChild(p2);
  resultInner.appendChild(p3);
  result.appendChild(resultInner);
};

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

tempUnit.addEventListener('click', () => {
  const fahrenheit = document.getElementById('fahrenheit');
  const celsius = document.getElementById('celsius');
  fahrenheit.classList.add('text-bold');
  celsius.classList.add('text-dark');
});
