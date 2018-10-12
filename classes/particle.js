class Particle {
  constructor(attrs) {
    let attrNames = [
      "position", "velocity", "acc", "mult", "color", "size", "sizeDecrement",
      "life", "lifeDecrement", "hasTail", "tailSizeDecrement",
      "tailLifeDecrement", "shell"
    ]

    for (let i = 0; i < attrNames.length; i++) {
      let attrName = attrNames[i]
      this[attrName] = attrs[attrName]
    }

    // set default values
    this.acc = this.acc || createVector(0, 0.1) // acceleration
    this.velocity = this.velocity || createVector(0, -0.2)
    this.mult = this.mult || 1
    this.color = this.color || [60, 100, 100]
    this.size = this.size || 7
    this.sizeDecrement = this.sizeDecrement || 0
    if (this.life === undefined) this.life = 1000
    this.initialLife = this.life
    if (this.lifeDecrement === undefined) this.lifeDecrement = 20
    this.tailParticles = []
  }

  update() {
    this.velocity.add(this.acc)
    this.velocity.mult(this.mult)
    this.position.add(this.velocity)
    this.acc.mult(0)
    if (this.size >= this.sizeDecrement) this.size -= this.sizeDecrement
    let brightness = this.color[2]
    if (brightness < 100) {
      brightness += 10
      this.color = [this.color[0], this.color[1], brightness]
    }
    this.life -= this.lifeDecrement
    this.hasTail && this.updateTail()
  }

  applyForce(force) {
    this.acc.add(force)
  }

  updateTail() {
    for (let i = 0; i < this.tailParticles.length; i++) {
      let tailParticle = this.tailParticles[i]
      if (tailParticle.finished()) {
        this.tailParticles.splice(i, 1)
      } else {
        tailParticle.update()
        tailParticle.show()
      }
    }

    let clone = new Particle({
      position: createVector(this.position.x, this.position.y),
      color: this.color,
      life: this.life,
      lifeDecrement: this.tailLifeDecrement,
      size: this.size,
      sizeDecrement: this.tailSizeDecrement
    })
    this.tailParticles.push(clone)
  }

  show() {
    strokeWeight(this.size)
    stroke(...this.color, this.life / 1000)
    point(this.position.x, this.position.y)
  }

  finished() {
    return this.life < 0 || this.size <= 1
  }
}
