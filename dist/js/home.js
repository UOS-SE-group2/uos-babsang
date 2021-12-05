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

/***/ "./src/client/js/home.js":
/*!*******************************!*\
  !*** ./src/client/js/home.js ***!
  \*******************************/
/***/ (() => {

eval("var sort = document.getElementById(\"sort\");\nvar lists = document.querySelectorAll(\".list_restaurant__list\");\n\nvar sortByStars = function sortByStars() {\n  var i, shouldSwitch;\n  var switching = true;\n\n  while (switching) {\n    switching = false;\n    shouldSwitch = false;\n\n    for (i = 1; i < lists.length - 1; i++) {\n      var list_textBefore = lists[i].querySelector(\".list_restaurant__list__text\");\n      var list_textAfter = lists[i + 1].querySelector(\".list_restaurant__list__text\");\n      var starAfter = list_textAfter.querySelector(\".list_star\");\n      var starBefore = list_textBefore.querySelector(\".list_star\");\n\n      if (starAfter.innerText > starBefore.innerText) {\n        shouldSwitch = true;\n        break;\n      }\n\n      console.log(i, shouldSwitch, switching);\n    }\n\n    if (shouldSwitch) {\n      lists[i].parentNode.insertBefore(lists[i], lists[i + 1]);\n      switching = true;\n    }\n  }\n};\n\nvar sortByDefault = function sortByDefault() {};\n\nvar handleOptions = function handleOptions(event) {\n  var value = sort.value;\n\n  if (value == \"stars\") {\n    sortByStars();\n  } else {\n    sortByDefault();\n  }\n};\n\nif (lists) {\n  sort.addEventListener(\"change\", handleOptions);\n}\n\n//# sourceURL=webpack://uos-babsang/./src/client/js/home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/home.js"]();
/******/ 	
/******/ })()
;