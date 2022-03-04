const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const WIDTH = canvas.width = 800
const HEIGHT = canvas.height = 640

const log = console.log

let LEFT = false 
let RIGHT = false 
let UP = false 

let friction = 0.06

let particleSystems = []

document.addEventListener('keydown', ({key}) => {
  if(key == "ArrowLeft") {
    LEFT = true 
  } else if (key == "ArrowUp") {
    UP = true
  } else if (key == "ArrowRight") {
    RIGHT = true  
  }  
})
document.addEventListener('keyup', ({key}) => {
  if(key == "ArrowLeft") {
    LEFT = false  
  } else if (key == "ArrowUp") {
    UP = false
  } else if (key == "ArrowRight") {
    RIGHT = false 
  }  
})


class Spaceship {
  constructor(){
    this.pos = new Vector(WIDTH/2, HEIGHT/2)
    this.r = 20
    this.vel = new Vector(0, 0)
    this.acc = new Vector(0, 0)    
    this.angle = 0.1
    this.heading = 0
  }
  draw() {
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.translate(this.pos.x, this.pos.y)
    ctx.rotate(this.heading + Math.PI/2)
    ctx.moveTo(-this.r/2, this.r/2)
    ctx.lineTo(0, -this.r/2)
    ctx.lineTo(this.r/2, this.r/2)
    ctx.lineTo(-this.r/2, this.r/2)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }  
  unitVecFromAngle(a){
    let x = Math.cos(a) 
    let y = Math.sin(a)     
    return new Vector(x, y)
  }
  boost(){
    let force = this.unitVecFromAngle(this.heading)
    this.vel.add(force)    
  }
  setAngle(a) {
    this.angle = a
  }
  update() {
    
    if(LEFT){
      this.heading -= this.angle
    } else if(RIGHT){
      this.heading += this.angle
    } else if(UP){
      this.boost()
      
      particleSystems.push(new ParticleSystem(this.pos, this.heading))
      
    }   
    
    this.vel.add(this.acc)       
    this.vel = this.vel.mult(1-friction)
    this.pos.add(this.vel)
    
    if(this.pos.x - this.r > WIDTH){
      this.pos.x = - this.r
    } else if(this.pos.x + this.r < 0) {
      this.pos.x = WIDTH + this.r
    } else if(this.pos.y - this.r > HEIGHT){
      this.pos.y = -this.r
    } else if(this.pos.y + this.r < 0) {
      this.pos.y = HEIGHT - this.r
    }    
  }
}

let s = new Spaceship()

function animate() {
  ctx.clearRect(0,0,WIDTH,HEIGHT)
  s.update()
  s.draw()
  particleSystems.forEach(system => {
    for(let i = system.particles.length -1; i >= 0; i--) {
      let particle = system.particles[i]      
      particle.update()
      particle.draw()

      if(particle.lifeTime < 0){
        system.particles.splice(i, 1)
      }
    }
  })
  requestAnimationFrame(animate)
}


animate()