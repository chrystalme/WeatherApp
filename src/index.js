const myCity = document.getElementById('city-input');
const btnGetWeather = document.getElementById('get-weather');
const result = document.getElementById('result');
const resultInner = document.createElement('div');
resultInner.id = 'inner-content';
// const outerDiv = document.getElementById('container')
// outerDiv.classList.add('position', 'fixed');

let url;
let city;

btnGetWeather.addEventListener('click', () => {
  city = myCity.value;
  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + `${city}` + '&units=metric&appid=f143eabdcb81c14621c46bee170ba541';
  console.log(url);

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
    h3.innerHTML = data.name;
    resultInner.appendChild(h3);
    const temp = document.createElement('span');
    const tempUnit = document.createElement('h6');
    temp.style.fontSize = '6rem';
    temp.style.position = 'relative';
    tempUnit.style.position = 'absolute';
    tempUnit.style.top = '15px';
    tempUnit.style.right = '-5px';
    temp.innerHTML = data.main.temp;
    tempUnit.innerHTML = 'C';
    temp.appendChild(tempUnit);
    resultInner.appendChild(temp);
    result.appendChild(resultInner);
  
  };
});
