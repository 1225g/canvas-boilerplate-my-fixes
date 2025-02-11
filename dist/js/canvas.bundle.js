/******/ (() => { // webpackBootstrap
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);
var gravity = 0.7;
var player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  offset: {
    x: 0,
    y: 0
  }
});
var enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  }
});
var keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
};
function rectangularCollision(_ref) {
  var rectangle1 = _ref.rectangle1,
    rectangle2 = _ref.rectangle2;
  return rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height;
}
function determineWinner(_ref2) {
  var player = _ref2.player,
    enemy = _ref2.enemy,
    timerId = _ref2.timerId;
  clearTimeout(timerId);
  document.querySelector('#displayText').style.display = 'flex';
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie';
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
  } else {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
  }
}
var timer = 60;
var timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector('#timer').innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({
      player: player,
      enemy: enemy,
      timerId: timerId
    });
  }
}
decreaseTimer();
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === 'a') player.velocity.x = -5;
  if (keys.d.pressed && player.lastKey === 'd') player.velocity.x = 5;
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') enemy.velocity.x = -5;
  if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') enemy.velocity.x = 5;

  // detect for collision
  if (rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) && player.isAttacking) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector('#enemyHealth').style.width = enemy.health + '%';
  }
  if (rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector('#playerHealth').style.width = player.health + '%';
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({
      player: player,
      enemy: enemy,
      timerId: timerId
    });
  }
}
animate();
addEventListener('keydown', function (event) {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = event.key;
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = event.key;
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
});
addEventListener('keyup', function (event) {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
  }
});
/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map