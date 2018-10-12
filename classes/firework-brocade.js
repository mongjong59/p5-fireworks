class Brocade extends Firework {
  constructor(x, y, colors) {
    super(x, y, colors)
    this.size = 7
    this.particleSize = 4
    this.particleTail = true
    this.particleLayer = 5
    this.particlePerLayer = 10
  }
}
