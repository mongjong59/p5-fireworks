class Firework {
  constructor(initialX, maxHeight, color) {
    this.initialX = initialX
    this.maxHeight = maxHeight
    this.shellColor = color || [60, 100, 100]
    this.shellSize = 6
    this.shellLifeDecrement = 0
    this.shellTailLifeDecrement = 130
    this.explosive = true
    this.particleLayer = 1
    this.particleLife = 1000
    this.color1 = [floor(random(359)), floor(random(101)), floor(random(101))]
    this.color2 = [floor(random(359)), floor(random(101)), floor(random(101))]
    console.log(this.color1)
    console.log(this.color2)
    this.particleColors = [this.color1, this.color2]
    this.exploded = false
    this.particles = []
  }

  update() {
    // shell.applyForce(gravity)
    // console.log(this.maxHeight)
    this.shell || this.createShell()

    let maxHeightReached = this.shell.position.y <= this.maxHeight
    if (this.explosive && maxHeightReached && !this.exploded) { this.explode() }
    if (!this.exploded) {
      this.shell.update()
      this.shell.show()
    } else {
      for (let i = 0; i < this.particles.length; i++) {
        let particle = this.particles[i]
        if (particle.life >= 0 && particle.size > 0) {
          particle.show()
          particle.update()
        } else {
          this.particles.splice(0, 1)
        }
      }
    }
  }

  createShell() {
    var position = createVector(this.initialX, height)
    var velocity = createVector(0, -10)

    this.shell = new Particle({
      position,
      velocity,
      shell: true,
      size: this.shellSize,
      tailSizeDecrement: this.shellTailSizeDecrement,
      lifeDecrement: this.shellLifeDecrement,
      tailLifeDecrement: this.shellTailLifeDecrement,
      hasTail: this.shellHasTail
    })
  }

  explode() {
    this.exploded = true

    new Audio("sounds/cantelope-pow-1.ogg").play()
    background(...this.shellColor, 0.1)
    for (let i = 0; i < this.particleLayer; i++) {
      for (let i2 = 0; i2 < this.particlePerLayer; i2++) {
        const { x, y } = this.shell.position
        let position = createVector(x, y)
        let velocity = p5.Vector.random2D().mult(this.size - i + 1)

        this.particles.push(new Particle({
          position,
          velocity,
          mult: 0.89,
          color: random(this.particleColors),
          size: this.particleSize,
          hasTail: this.particleTail
        }))
      }
    }
  }

  finished() {
    let finished
    if (this.explosive) {
      finished = this.exploded && this.particles.length <= 0
    } else {
      finished = this.shell.life < 0
    }
    return finished
  }
}
