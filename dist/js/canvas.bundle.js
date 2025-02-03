/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((module) => {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}
function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
module.exports = {
  randomIntFromRange: randomIntFromRange,
  randomColor: randomColor,
  distance: distance
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

// Event Listeners
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
var Boundary = /*#__PURE__*/function () {
  function Boundary(_ref) {
    var position = _ref.position,
      image = _ref.image;
    _classCallCheck(this, Boundary);
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }
  _createClass(Boundary, [{
    key: "draw",
    value: function draw() {
      //c.fillStyle = 'blue'
      //c.fillRect(this.position.x, this.position.y, this.width, this.height)
      c.drawImage(this.image, this.position.x, this.position.y);
    }
  }]);
  return Boundary;
}();
_defineProperty(Boundary, "width", 40);
_defineProperty(Boundary, "height", 40);
var Player = /*#__PURE__*/function () {
  function Player(_ref2) {
    var position = _ref2.position,
      velocity = _ref2.velocity;
    _classCallCheck(this, Player);
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }
  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = 'yellow';
      c.fill();
      c.closePath();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }]);
  return Player;
}();
var boundaries = [];
var player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
});
var keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};
var lastKey = '';
var map = [['-', '-', '-', '-', '-', '-', '-'], ['-', ' ', ' ', ' ', ' ', ' ', '-'], ['-', ' ', '-', ' ', '-', ' ', '-'], ['-', ' ', ' ', ' ', ' ', ' ', '-'], ['-', ' ', '-', ' ', '-', ' ', '-'], ['-', ' ', ' ', ' ', ' ', ' ', '-'], ['-', '-', '-', '-', '-', '-', '-']];
var image = new Image();
image.src = '../img/pipeHorizontal.png';
map.forEach(function (row, i) {
  row.forEach(function (symbol, j) {
    switch (symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image: image
        }));
        break;
    }
  });
});
function circleCollidesWithREctangle(_ref3) {
  var circle = _ref3.circle,
    rectangle = _ref3.rectangle;
  return circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width;
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  if (keys.w.pressed && lastKey === 'w') {
    for (var i = 0; i < boundaries.length; i++) {
      var boundary = boundaries[i];
      if (circleCollidesWithREctangle({
        circle: _objectSpread({}, player, {
          velocity: {
            x: 0,
            y: -5
          }
        }),
        rectangle: boundary
      })) {
        player.velocity.y = 0;
        break;
      } else player.velocity.y = -5;
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    for (var _i = 0; _i < boundaries.length; _i++) {
      var _boundary = boundaries[_i];
      if (circleCollidesWithREctangle({
        circle: _objectSpread({}, player, {
          velocity: {
            x: -5,
            y: 0
          }
        }),
        rectangle: _boundary
      })) {
        player.velocity.x = 0;
        break;
      } else player.velocity.x = -5;
    }
  } else if (keys.s.pressed && lastKey === 's') {
    for (var _i2 = 0; _i2 < boundaries.length; _i2++) {
      var _boundary2 = boundaries[_i2];
      if (circleCollidesWithREctangle({
        circle: _objectSpread({}, player, {
          velocity: {
            x: 0,
            y: 5
          }
        }),
        rectangle: _boundary2
      })) {
        player.velocity.y = 0;
        break;
      } else player.velocity.y = 5;
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    for (var _i3 = 0; _i3 < boundaries.length; _i3++) {
      var _boundary3 = boundaries[_i3];
      if (circleCollidesWithREctangle({
        circle: _objectSpread({}, player, {
          velocity: {
            x: 5,
            y: 0
          }
        }),
        rectangle: _boundary3
      })) {
        player.velocity.x = 0;
        break;
      } else player.velocity.x = 5;
    }
  }
  boundaries.forEach(function (boundary) {
    boundary.draw();
    if (circleCollidesWithREctangle({
      circle: player,
      rectangle: boundary
    })) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });
  player.update();
}
animate();
addEventListener('keydown', function (_ref4) {
  var key = _ref4.key;
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      break;
    case 'a':
      keys.a.pressed = true;
      break;
    case 's':
      keys.s.pressed = true;
      break;
    case 'd':
      keys.d.pressed = true;
      break;
  }
  lastKey = key;
});
addEventListener('keyup', function (_ref5) {
  var key = _ref5.key;
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map