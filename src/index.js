import '../style/style.scss';

const form = document.querySelector('form');

const myCity = document.getElementById('city-input');
const btnGetWeather = document.getElementById('get-weather');
const result = document.getElementById('result');
result.style.backgroundImage = 'http://www.freeppt.net/background/april-weather-backgrounds-for-powerpoint.jpg'
const resultInner = document.createElement('div');
resultInner.id = 'inner-content';

let url;
let city;

btnGetWeather.addEventListener('click', () => {
  city = myCity.value;
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f143eabdcb81c14621c46bee170ba541`;
 
// async function getData() {
//   const response = await fetch(url,
//     {
// mode: 'cors';
//   } );

//   if (response.status === 400) {
//     return
//   }else{
//     const data = await response.json();
//     console.log(data);
//   }
// }
  // fetch(url)
  //   .then((response) => response.json()).then((response) => {
  //     const data = response;
  //     if (data.city) {
  //       console.log(data.city.name);
  //     }else{
  //       const p = document.createElement('p');
  //       p.innerHTML = 'City does not exist.';
  //       myCity.appendChild(p);
  //     }
  //   });

  const requestUrl = url;
  const request = new XMLHttpRequest();
  request.open('GET', requestUrl);
  request.responseType = 'json';
  request.send();

  request.onload = () => {
    const data = request.response;
    const h3 = document.createElement('h3');
    h3.innerHTML = `${data.name}`;
    resultInner.appendChild(h3);
    const temp = document.createElement('span');
    const tempUnit = document.createElement('h6');
    const p = document.createElement('p');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    temp.style.fontSize = '6rem';
    temp.style.position = 'relative';
    tempUnit.style.position = 'absolute';
    tempUnit.style.top = '15px';
    tempUnit.style.right = '-10px';
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
    if (result.childNodes[0]) {
      result.removeChild(result.childNodes[0]);
    }
    result.appendChild(resultInner);
  };
  reset();
});

function reset() {
  form.reset();
}
