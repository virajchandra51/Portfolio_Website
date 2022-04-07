//home page mouse cursor animation
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
const canvas = document.getElementById('mouse')
const c = canvas.getContext('2d')
console.log(canvas)

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: 3.8*(innerWidth / 5),
  y: innerHeight / 2
}

const colors = ['#F29F05', '#403012', '#d97904', '#a64f03','#0d0d0d']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2
    this.velocity = Math.random() * 0.03
    this.distanceFromCenter = randomIntFromRange(100,330)
    this.lastMouse = {x:x,y:y}
  }

  draw(lastPoint) {

    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius
    c.moveTo(lastPoint.x,lastPoint.y)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.closePath()
  }

  update() {
    const lastPoint = {x: this.x , y: this.y}
    //drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x)*0.05
    this.lastMouse.y += (mouse.y - this.lastMouse.y)*0.05
    this.x =  this.lastMouse.x + Math.cos(this.radians)*this.distanceFromCenter
    this.y =  this.lastMouse.y + Math.sin(this.radians)*this.distanceFromCenter
    this.radians += this.velocity

    
    this.draw(lastPoint)
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 300; i++) {
    particles.push(new Particle(
      randomIntFromRange(100,10000),
      randomIntFromRange(100,10000),
      randomIntFromRange(20,60),
      randomColor(colors)))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'rgba(18,18,18,0.55)'
  c.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update()
  });
  // objects.forEach(object => {
  //  object.update()
  // })
  
}

init()
animate()
