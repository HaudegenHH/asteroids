
class Vector {
  
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add(v){
    this.x += v.x
    this.y += v.y
  }  
  mult(s){
    return new Vector(this.x * s, this.y * s)
  }
  sub(v){
    this.x -= v.x
    this.y -= v.y
  }  
  mag(){
    return Math.sqrt(this.x**2 + this.y**2)
  }
}