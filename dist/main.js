/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var myCity = document.getElementById('city-input');\nvar btnGetWeather = document.getElementById('get-weather');\nvar result = document.getElementById('result');\nvar resultInner = document.createElement('div');\nresultInner.id = 'inner-content'; // const outerDiv = document.getElementById('container')\n// outerDiv.classList.add('position', 'fixed');\n\nvar url;\nvar city;\nbtnGetWeather.addEventListener('click', function () {\n  city = myCity.value;\n  url = 'https://api.openweathermap.org/data/2.5/weather?q=' + \"\".concat(city) + '&units=metric&appid=f143eabdcb81c14621c46bee170ba541';\n  console.log(url); // fetch(url)\n  //   .then((response) => response.json()).then((response) => {\n  //     const data = response;\n  //     if (data.city) {\n  //       console.log(data.city.name);\n  //     }else{\n  //       const p = document.createElement('p');\n  //       p.innerHTML = 'City does not exist.';\n  //       myCity.appendChild(p);\n  //     }\n  //   });\n\n  var requestUrl = url;\n  var request = new XMLHttpRequest();\n  request.open('GET', requestUrl);\n  request.responseType = 'json';\n  request.send();\n\n  request.onload = function () {\n    var data = request.response;\n    var h3 = document.createElement('h3');\n    h3.innerHTML = data.name;\n    resultInner.appendChild(h3);\n    var temp = document.createElement('span');\n    var tempUnit = document.createElement('h6');\n    temp.style.fontSize = '6rem';\n    temp.style.position = 'relative';\n    tempUnit.style.position = 'absolute';\n    tempUnit.style.top = '15px';\n    tempUnit.style.right = '-5px';\n    temp.innerHTML = data.main.temp;\n    tempUnit.innerHTML = 'C';\n    temp.appendChild(tempUnit);\n    resultInner.appendChild(temp);\n    result.appendChild(resultInner);\n  };\n});\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;