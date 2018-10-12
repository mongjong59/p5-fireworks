function setup() {
  var l = 300
  createCanvas(l, l);
  background(0);

  var d = 30
  var x = Math.floor(Math.random() * (l - d)) + d / 2
  var y = Math.floor(Math.random() * (l - d)) + d / 2

  var maxTravel = 200
  var currentTravel = 0

  var xMovement = 0
  var yMovement = 0

  function resetMovements() {
    prevXMovement = xMovement
    prevYMovement = yMovement
    do {
      xMovement = Math.floor(Math.random() * 3) - 1
      yMovement = Math.floor(Math.random() * 3) - 1
      var noMovement = (xMovement === 0) && (yMovement === 0)
      var opposite = (xMovement === prevXMovement * -1) && (yMovement === prevYMovement * -1)
    } while (noMovement || opposite)
  }

  resetMovements()

  var colors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
  var change = [-1, 1][Math.floor(Math.random() * 2)]
  var colorIdx = Math.floor(Math.random() * 3)

  setInterval(function() {
    var maxTravelReached = currentTravel > maxTravel
    var xMaxReached = (x + xMovement + d / 2 > l) || (x + xMovement - d / 2 < 0)
    var yMaxReached = (y + yMovement + d / 2 > l) || (y + yMovement - d / 2 < 0)

    if (!maxTravelReached && !xMaxReached && !yMaxReached) {
      x += xMovement
      y += yMovement

      function invalid(c, c2) {
        return c + c2 > 255 || c + c2 < 0
      }
      while (invalid(colors[colorIdx], change)) {
        change = [-1, 1][Math.floor(Math.random() * 2)]
        colorIdx = Math.floor(Math.random() * 3)
      }
      colors[colorIdx] += change
      fill(colors[0], colors[1], colors[2])
      noStroke()
      ellipse(x, y, d, d)
      currentTravel += 1
    } else {
      resetMovements()
      currentTravel = 0
    }
  }, 10)
}

function draw() {

}
