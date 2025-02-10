import { randomIntFromRange, randomColor, distance } from './utils.js'

import { collisions } from '../data/collisions.js'
import { battleZonesData } from '../data/battleZones.js'
import { attacks } from '../data/attacks.js'
import { monsters } from '../data/monsters.js'
import { audio } from '../data/audio.js'


import pelletTownPng from '../img/Pellet Town.png'
import playerDownPng from '../img/playerDown.png'
import playerLeftPng from '../img/playerLeft.png'
import playerRightPng from '../img/playerRight.png'
import playerUpPng from '../img/playerUp.png'
import foregroundObjectsPng from '../img/foregroundObjects.png'
import battleBackgroundPng from '../img/battleBackground.png'


import fireballPng from '../img/fireball.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


gsap.to('#overlappingDiv', {
  opacity: 0
})

canvas.width = 1024 // innerWidth
canvas.height = 576 // innerHeight

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}


class Boundary {
  static width = 48
  static height = 48
  constructor({ position }) {
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
  x: -735,
  y: -620
}

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(new Boundary({
        position: {
          x: j * Boundary.width + offset.x,
          y: i * Boundary.height + offset.y
        }
      }))
  })
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(new Boundary({
        position: {
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

const playerDownImage = new Image()
playerDownImage.src = playerDownPng

const playerUpImage = new Image()
playerUpImage.src = playerUpPng

const playerLeftImage = new Image()
playerLeftImage.src = playerLeftPng

const playerRightImage = new Image()
playerRightImage.src = playerRightPng

// addEventListener('resize', () => {
//   canvas.width = innerWidth
//   canvas.height = innerHeight

// })

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
  constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, rotation = 0 }) {
    this.position = position
    this.image = image
    this.frames = { ...frames, val: 0, elapsed: 0 }
    //this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    //}
    this.animate = animate
    this.sprites = sprites
    this.opacity = 1
    this.rotation = rotation
  }
  draw() {
    c.save()
    c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
    c.rotate(this.rotation)
    c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
    c.globalAlpha = this.opacity
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
    c.restore()

    if (!this.animate) return

    if (this.frames.max > 1) {
      this.frames.elapsed++
    }
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1)
        this.frames.val++
      else
        this.frames.val = 0
    }
  }


}

class Monster extends Sprite {
  constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({
      position, velocity, image, frames, sprites, animate, rotation
    })
    this.health = 100
    this.isEnemy = isEnemy
    this.name = name
    this.attacks = attacks
  }

  faint() {
    document.querySelector('#dialogueBox').innerHTML = this.name + ' fainted!'
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
    audio.battle.pause()
    audio.victory.play()
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector('#dialogueBox').style.display = 'block'
    document.querySelector('#dialogueBox').innerHTML = this.name + ' used ' + attack.name

    let healthBar = '#enemyHealthBar'
    if (this.isEnemy) healthBar = '#playerHealthBar'

    let rotation = 1
    if (this.isEnemy) rotation = -2.2

    recipient.health -= attack.damage

    switch (attack.name) {
      case 'Fireball':
        audio.initFireball.play()
        const fireballImage = new Image()
        fireballImage.src = fireballPng
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10
          },
          animate: true,
          rotation
        })

        renderedSprites.splice(1, 0, fireball)

        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Enemy actually gets hit
            audio.fireballHit.play()
            gsap.to(healthBar, {
              width: recipient.health + '%'
            })

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            })

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
            renderedSprites.splice(1, 1)
          }
        })

        break;
      case 'Tackle':
        const tl = gsap.timeline()

        let movementDistance = 20
        if (this.isEnemy) movementDistance = -20

        tl.to(this.position, {
          x: this.position.x - movementDistance
        }).to(this.position, {
          x: this.position.x + movementDistance * 2,
          duration: 0.1,
          onComplete: () => {
            // Enemy actually gets hit
            audio.tackleHit.play()

            gsap.to(healthBar, {
              width: recipient.health + '%'
            })

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            })

            gsap.to(recipient, {
              opacity: 0,
              repeat: 5,
              yoyo: true,
              duration: 0.08
            })
          }
        }).to(this.position, {
          x: this.position.x
        })
        break;
      default:
        break;
    }

  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  }
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
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


const movables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x
    && rectangle1.position.x <= rectangle2.position.x + rectangle2.width
    && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
  )
}

const battle = {
  initiated: false
}

// Animation Loop
function animate() {
  const animationId = requestAnimationFrame(animate)

  background.draw()

  boundaries.forEach(boundary => {
    boundary.draw()
  })

  battleZones.forEach(battleZone => {
    battleZone.draw()
  })

  player.draw()
  foreground.draw()

  let moving = true
  player.animate = false

  if (battle.initiated) return

  // activate a battle
  if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i]
      const overlappingArea =
        (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)
          - Math.max(player.position.x, battleZone.position.x))
        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
          - Math.max(player.position.y, battleZone.position.y))
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: battleZone
      })
        && overlappingArea > (player.width * player.height) / 2
        && Math.random() < 0.1
      ) {
        console.log('activate battle')

        // deactive current animation loop
        cancelAnimationFrame(animationId)

        audio.Map.pause()
        audio.Map.currentTime = 0; // Reset to the beginning
        audio.initBattle.volume = 0.1
        audio.initBattle.play()
        audio.battle.volume = 0.1
        audio.battle.play()
        
        battle.initiated = true
        gsap.to('#overlappingDiv', {
          opacity: 1,
          repeat: 3,
          yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to('#overlappingDiv', {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                // activate a new animation loop
                initBattle()
                animateBattle()
                gsap.to('#overlappingDiv', {
                  opacity: 0,
                  duration: 0.4,
                })
              }
            })
          }
        })
        break
      }
    }
  }


  if (keys.w.pressed) {
    player.animate = true
    player.image = player.sprites.up

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y + 3,
          }
        }
      })
      ) {
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
    player.animate = true
    player.image = player.sprites.left

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary, position: {
            x: boundary.position.x + 3,
            y: boundary.position.y,
          }
        }
      })
      ) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x += 3
      })
    }
  }
  if (keys.s.pressed) {
    player.animate = true
    player.image = player.sprites.down

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y - 3,
          }
        }
      })
      ) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
    }
  }
  if (keys.d.pressed) {
    player.animate = true
    player.image = player.sprites.right

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...boundary, position: {
            x: boundary.position.x - 3,
            y: boundary.position.y,
          }
        }
      })
      ) {
        moving = false
        break
      }
    }
    if (moving) {
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
    }
  }
}

const battleBackgroundImage = new Image()
battleBackgroundImage.src = battleBackgroundPng
const battleBackground = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  image: battleBackgroundImage
})

let draggle
let emby
let renderedSprites
let battleAnimationId
let queue

function initBattle() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()

  draggle = new Monster(monsters.Draggle)
  emby = new Monster(monsters.Emby)
  renderedSprites = [draggle, emby]
  queue = []

  emby.attacks.forEach(attack => {
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('#attacksBox').append(button)
  })

  // our event listeners for our buttons (attack)
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites
      })

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint()
        })
        queue.push(() => {
          // fade back to black
          gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationId)
              animate()
              document.querySelector('#userInterface').style.display = 'none'

              gsap.to('#overlappingDiv', {
                opacity: 0
              })

              battle.initiated = false
              audio.Map.play()
            }
          })
        })
      }
      // draggle or enemy attacks right here
      const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites
        })

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint()
          })

          queue.push(() => {
            // fade back to black
            gsap.to('#overlappingDiv', {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                animate()
                document.querySelector('#userInterface').style.display = 'none'
  
                gsap.to('#overlappingDiv', {
                  opacity: 0
                })

                battle.initiated = false
                audio.Map.play()
              }
            })
          })
        }
      })
    })

    button.addEventListener('mouseenter', (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML]
      document.querySelector('#attackType').innerHTML = selectedAttack.type
      document.querySelector('#attackType').style.color = selectedAttack.color
    })
  })
}

function animateBattle() {
  battleAnimationId = requestAnimationFrame(animateBattle)
  battleBackground.draw()

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animate()
//initBattle()
//animateBattle()

document.querySelector('#dialogueBox').addEventListener('click', (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = 'none'
})

let lastKey = ''

addEventListener('keydown', (e) => {
  switch (e.key) {
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
  switch (e.key) {
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

let clicked = false
addEventListener('click', () => {
  if (!clicked){
    audio.Map.volume = 0.5
    audio.Map.play()

    clicked = true
  }
})