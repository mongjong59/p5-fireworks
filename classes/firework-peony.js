class Peony extends Firework {
  constructor(x, y, colors) {
    super(x, y, colors)
    this.size = 8
    this.particleSize = 7
    this.particleTail = false
    this.particleLayer = 10
    this.particlePerLayer = 30
  }
}
