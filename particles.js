
class ParticleSystem {
	constructor({x, y}, angle){
		this.pos = new Vector(x, y)
		
		let dx = Math.cos(angle) * -1
		let dy = Math.sin(angle) * -1
		
		let unit = new Vector(dx,dy)

		this.pos.add(unit)		

		this.particles = []

		for(let i = 0; i < 10; i++){
			this.particles.push(new Particle(this.pos))
		}
	}
}

class Particle {
	constructor({x, y}){
		this.pos = new Vector(x,y)        

        let randX = Math.random() * 1 + 1 
		let randY = Math.random() * 1 + 1 

		randX = Math.random() > 0.5 ? randX * -1 : randX
		randY = Math.random() > 0.5 ? randY * -1 : randY
		 
		this.vel = new Vector(randX, randY)

		this.acc = new Vector(0, 0.1)

		this.lifeTime = 10
	}
	update() {
		this.vel.add(this.acc)
		this.pos.add(this.vel)
		this.lifeTime--
	}
	draw(){
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = "rgb(255, 0, 0)"
		ctx.arc(this.pos.x, this.pos.y, 3, 0, Math.PI * 2)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
	}
}