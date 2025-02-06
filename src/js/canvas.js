import { randomIntFromRange, randomColor, distance } from './utils.js'

import {collisions} from '../data/collisions.js'

import pelletTownPng from '../img/Pellet Town.png'
import playerDownPng from '../img/playerDown.png'
import playerLeftPng from '../img/playerLeft.png'
import playerRightPng from '../img/playerRight.png'
import playerUpPng from '../img/playerUp.png'



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
  static width = 48
  static height = 48
  constructor({position}) {
    this.position = position
    this.width = 48
    this.height = 48
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(new Boundary({position: {
        x: j * Boundary.width,
        y: i * Boundary.height
      }
      }))
  })
})

const image = new Image()
image.src = pelletTownPng

const playerImage = new Image()
playerImage.src = playerDownPng

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

})

// Objects
class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

class Sprite {
  constructor({position, velocity, image}) {
    this.position = position
    this.image = image
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const background = new Sprite({ position: {
  x: -480,
  y: -500
  },
  image: image
})

const keys = {
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
  },
}
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  //c.fillStyle = 'white'
  //c.fillRect(0, 0, canvas.width, canvas.height)

  background.draw()

  boundaries.forEach(boundary => {
    boundary.draw()
  })

  c.drawImage(playerImage, 
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2, 
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height)

  if (keys.w.pressed) background.position.y += 3
  if (keys.a.pressed) background.position.x += 3
  if (keys.s.pressed) background.position.y -= 3
  if (keys.d.pressed) background.position.x -= 3
}

animate()

let lastKey = ''

addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'w':
      keys.w.pressed = true
      break
    case 'a':
      keys.a.pressed = true
      break
    case 's':
      keys.s.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
  }
  lastKey = e.key
})

addEventListener('keyup', (e) => {
  switch(e.key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
})