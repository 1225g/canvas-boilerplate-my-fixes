import { randomIntFromRange, randomColor, distance } from './utils.js'

import {collisions} from '../data/collisions.js'

import pelletTownPng from '../img/Pellet Town.png'
import playerDownPng from '../img/playerDown.png'
import playerLeftPng from '../img/playerLeft.png'
import playerRightPng from '../img/playerRight.png'
import playerUpPng from '../img/playerUp.png'
import foregroundObjectsPng from '../img/foregroundObjects.png'



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
    c.fillStyle = 'rgba(255,0,0,0)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const boundaries = []
const offset = {
  x: -480,
  y: -520
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(new Boundary({position: {
        x: j * Boundary.width + offset.x,
        y: i * Boundary.height + offset.y
      }
      }))
  })
})

const image = new Image()
image.src = pelletTownPng

const foregroundImage = new Image()
foregroundImage.src = foregroundObjectsPng

const playerImage = new Image()
playerImage.src = playerDownPng

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
  constructor({position, velocity, image, frames = {max: 1}}) {
    this.position = position
    this.image = image
    this.frames = {...frames, val: 0, elapsed: 0}
    this.image.onload = () => { 
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }
    this.moving = false
  }
  draw() {
    c.drawImage(this.image, 
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    )

    if (!this.moving) return

    if (this.frames.max > 1) {
      this.frames.elapsed ++
    }
    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max -1 )
        this.frames.val ++
      else
        this.frames.val = 0
    }
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4
  }

})

const background = new Sprite({ position: {
  x: offset.x,
  y: offset.y
  },
  image: image
})

const foreground = new Sprite({ position: {
  x: offset.x,
  y: offset.y
  },
  image: foregroundImage
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


const movables = [background, ...boundaries, foreground]

function rectangularCollision({rectangle1, rectangle2}){
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  )
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

  player.draw()
  foreground.draw()
    
  let moving = true
  player.moving = false
  if (keys.w.pressed) {
    player.moving = true
    for (let i = 0; i< boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x,
          y: boundary.position.y + 3,
        }}
      })
      ) {
        console.log('collide')
        moving = false
        break
      }
    }
    if (moving) {
        movables.forEach((movable) => {
          movable.position.y += 3
      })
    }
  }
  if (keys.a.pressed) {
    player.moving = true
    for (let i = 0; i< boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x + 3,
          y: boundary.position.y,
        }}
      })
      ) {
        console.log('collide')
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3
    })}
  }
  if (keys.s.pressed) {
    player.moving = true
    for (let i = 0; i< boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x,
          y: boundary.position.y - 3,
        }}
      })
      ) {
        console.log('collide')
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3
    })}
  }
  if (keys.d.pressed) {
    player.moving = true
    for (let i = 0; i< boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {...boundary, position: {
          x: boundary.position.x - 3,
          y: boundary.position.y,
        }}
      })
      ) {
        console.log('collide')
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3
    })}
  }
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