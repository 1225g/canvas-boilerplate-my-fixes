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

/***/ }),

/***/ "./src/img/invader.png":
/*!*****************************!*\
  !*** ./src/img/invader.png ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "4793e7f635a6f442db1aefdfa44b9f2b.png");

/***/ }),

/***/ "./src/img/spaceship.png":
/*!*******************************!*\
  !*** ./src/img/spaceship.png ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "52a211ddafab2140bf3ab40d76be1e79.png");

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
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
/* harmony import */ var _img_spaceship_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/spaceship.png */ "./src/img/spaceship.png");
/* harmony import */ var _img_invader_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../img/invader.png */ "./src/img/invader.png");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var scoreEl = document.querySelector('#scoreEl');
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
var Player = /*#__PURE__*/function () {
  function Player() {
    var _this = this;
    _classCallCheck(this, Player);
    this.velocity = {
      x: 0,
      y: 0
    };
    this.rotation = 0;
    this.opacity = 1;
    var image = new Image();
    image.src = _img_spaceship_png__WEBPACK_IMPORTED_MODULE_1__["default"];
    image.onload = function () {
      var scale = 0.15;
      _this.image = image;
      _this.width = image.width * scale;
      _this.height = image.height * scale;
      _this.position = {
        x: canvas.width / 2 - _this.width / 2,
        y: canvas.height - _this.height - 20
      };
    };
  }
  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      c.save();
      c.globalAlpha = this.opacity;
      c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
      c.rotate(this.rotation);
      c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      c.restore();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.image) {
        this.draw();
        this.position.x += this.velocity.x;
      }
    }
  }]);
  return Player;
}();
var Projectile = /*#__PURE__*/function () {
  function Projectile(_ref) {
    var position = _ref.position,
      velocity = _ref.velocity;
    _classCallCheck(this, Projectile);
    this.position = position;
    this.velocity = velocity;
    this.radius = 4;
  }
  _createClass(Projectile, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = 'red';
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
  return Projectile;
}();
var Particle = /*#__PURE__*/function () {
  function Particle(_ref2) {
    var position = _ref2.position,
      velocity = _ref2.velocity,
      radius = _ref2.radius,
      color = _ref2.color,
      fades = _ref2.fades;
    _classCallCheck(this, Particle);
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.fades = fades;
  }
  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      c.save();
      c.globalAlpha = this.opacity;
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
      c.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.fades) this.opacity -= 0.01;
    }
  }]);
  return Particle;
}();
var InvaderProjectile = /*#__PURE__*/function () {
  function InvaderProjectile(_ref3) {
    var position = _ref3.position,
      velocity = _ref3.velocity;
    _classCallCheck(this, InvaderProjectile);
    this.position = position;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }
  _createClass(InvaderProjectile, [{
    key: "draw",
    value: function draw() {
      c.fillStyle = 'white';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }]);
  return InvaderProjectile;
}();
var Invader = /*#__PURE__*/function () {
  function Invader(_ref4) {
    var _this2 = this;
    var position = _ref4.position;
    _classCallCheck(this, Invader);
    this.velocity = {
      x: 0,
      y: 0
    };
    var image = new Image();
    image.src = _img_invader_png__WEBPACK_IMPORTED_MODULE_2__["default"];
    image.onload = function () {
      var scale = 1;
      _this2.image = image;
      _this2.width = image.width * scale;
      _this2.height = image.height * scale;
      _this2.position = {
        x: position.x,
        y: position.y
      };
    };
  }
  _createClass(Invader, [{
    key: "draw",
    value: function draw() {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update(_ref5) {
      var velocity = _ref5.velocity;
      if (this.image) {
        this.draw();
        this.position.x += velocity.x;
        this.position.y += velocity.y;
      }
    }
  }, {
    key: "shoot",
    value: function shoot(invaderProjectiles) {
      invaderProjectiles.push(new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height
        },
        velocity: {
          x: 0,
          y: 5
        }
      }));
    }
  }]);
  return Invader;
}();
var Grid = /*#__PURE__*/function () {
  function Grid() {
    _classCallCheck(this, Grid);
    this.position = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 3,
      y: 0
    };
    this.invaders = [];
    var columns = Math.floor(Math.random() * 10 + 5);
    var rows = Math.floor(Math.random() * 5 + 2);
    this.width = columns * 30;
    for (var x = 0; x < columns; x++) {
      for (var y = 0; y < rows; y++) {
        this.invaders.push(new Invader({
          position: {
            x: x * 30,
            y: y * 30
          }
        }));
      }
    }
  }
  _createClass(Grid, [{
    key: "update",
    value: function update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.y = 0;
      if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = 30;
      }
    }
  }]);
  return Grid;
}();
var player = new Player();
var projectiles = [];
var grids = [];
var invaderProjectiles = [];
var particles = [];
var keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
};
var frames = 0;
var randomInterval = Math.floor(Math.random() * 500 + 500);
var game = {
  over: false,
  active: true
};
var score = 0;
for (var i = 0; i < 100; i++) {
  particles.push(new Particle({
    position: {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    },
    velocity: {
      x: 0,
      y: 0.3
    },
    radius: Math.random() * 2,
    color: 'white'
  }));
}
function createParticles(_ref6) {
  var object = _ref6.object,
    color = _ref6.color,
    fades = _ref6.fades;
  for (var _i = 0; _i < 15; _i++) {
    particles.push(new Particle({
      position: {
        x: object.position.x + object.width / 2,
        y: object.position.y + object.height / 2
      },
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      radius: Math.random() * 3,
      color: color || '#BAA0DE',
      fades: fades
    }));
  }
}
// Animation Loop
function animate() {
  if (!game.active) return;
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  particles.forEach(function (particle, i) {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width;
      particle.position.y = -particle.radius;
    }
    if (particle.opacity <= 0) {
      setTimeout(function () {
        particles.splice(i, 1);
      }, 0);
    } else particle.update();
  });
  invaderProjectiles.forEach(function (invaderProjectile, index) {
    if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
      setTimeout(function () {
        invaderProjectiles.splice(index, 1);
      }, 0);
    } else invaderProjectile.update();

    // projectile hits player
    if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width >= player.position.x && invaderProjectile.position.x <= player.position.x + player.width) {
      console.log('you lose');
      setTimeout(function () {
        invaderProjectiles.splice(index, 1);
        player.opacity = 0;
        game.over = true;
      }, 0);
      setTimeout(function () {
        game.active = false;
      }, 2000);
      createParticles({
        object: player,
        color: 'white',
        fades: true
      });
    }
  });
  projectiles.forEach(function (projectile, index) {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(function () {
        projectiles.splice(index, 1);
      }, 0);
    } else {
      projectile.update();
    }
  });
  grids.forEach(function (grid, gridIndex) {
    grid.update();

    // spawn projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
    }
    grid.invaders.forEach(function (invader, i) {
      invader.update({
        velocity: grid.velocity
      });

      // projectiles hit enemy
      projectiles.forEach(function (projectile, j) {
        if (projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y) {
          setTimeout(function () {
            var invaderFound = grid.invaders.find(function (invader2) {
              return invader2 === invader;
            });
            var projectileFound = projectiles.find(function (projectile2) {
              return projectile2 === projectile;
            });

            // remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100;
              scoreEl.innerHTML = score;
              createParticles({
                object: invader,
                fades: true
              });
              grid.invaders.splice(i, 1);
              projectiles.splice(j, 1);
              if (grid.invaders.length > 0) {
                var firstInvader = grid.invaders[0];
                var lastInvader = grid.invaders[grid.invaders.length - 1];
                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                grid.position.x = firstInvader.position.x;
              } else {
                grids.splice(gridIndex, 1);
              }
            }
          }, 0);
        }
      });
    });
  });
  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -7;
    player.rotation = -0.15;
  } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
    player.velocity.x = 7;
    player.rotation = 0.15;
  } else {
    player.velocity.x = 0;
    player.rotation = 0;
  }

  // spawning enemies
  if (frames % randomInterval === 0) {
    grids.push(new Grid());
    randomInterval = Math.floor(Math.random() * 500 + 500);
    frames = 0;
  }
  frames++;
}
animate();
addEventListener('keydown', function (_ref7) {
  var key = _ref7.key;
  if (game.over) return;
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = true;
      break;
    case 'd':
    case 'ArrowRight':
      keys.d.pressed = true;
      break;
    case ' ':
      keys.space.pressed = true;
      projectiles.push(new Projectile({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y
        },
        velocity: {
          x: 0,
          y: -5
        }
      }));
      break;
  }
  console.log(key);
});
addEventListener('keyup', function (_ref8) {
  var key = _ref8.key;
  switch (key) {
    case 'a':
    case 'ArrowLeft':
      keys.a.pressed = false;
      break;
    case 'd':
    case 'ArrowRight':
      keys.d.pressed = false;
      break;
    case ' ':
      keys.space.pressed = false;
      break;
  }
  console.log(key);
});
})();

/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map