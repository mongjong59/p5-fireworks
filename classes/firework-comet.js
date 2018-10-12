class Comet extends Firework {
  constructor(x, y, colors) {
    super(x, y, colors)
    this.explosive = false
    this.shellSize = 10
    this.shellTailSizeDecrement = 0.3
    this.shellLifeDecrement = 10
  }
}
