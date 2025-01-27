import { randomIntFromRange, randomColor, distance } from './utils'

//npm install @chriscourses/perlin-noise
import { noise } from '@chriscourses/perlin-noise'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.offset = offset
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

const circles = []

for (let i = 0; i < 100; i++) {
  circles.push(new Circle(-30, -30, 100 * Math.random(), `hsl(${Math.random() * 255}, 100%, 50%)`, i * 0.01));
}

let time = 0
// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(0, 0, 0, 0.01)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  circles.forEach(circle => {
    circle.x = noise(time + circle.offset + 20) * canvas.width
    circle.y = noise(time + circle.offset) * canvas.height

    circle.draw()    

  });
  // circle.update()
  
  time += 0.005
  // console.log(circle.y)
}

animate()
