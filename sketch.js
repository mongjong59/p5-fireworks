var fireworks = []

function setup() {
  createCanvas(300, 485)
  colorMode(HSB)
  stroke(255)
  var gravity = createVector(0, 0.2)
}

function draw() {
  // background(0);
  // blendMode(BLEND)
  background(0, 50);
  for (let i = 0; i < fireworks.length; i++) {
    let f = fireworks[i]
    f.update()
    f.finished() && fireworks.splice(i, 1)
  }
  // if (frameCount % 100 === 0) {
  //   console.log(fireworks)
  // }
  //
  // if (frameCount % 120 === 0 || frameCount === 50) {
  //   let sat = random(100)
  //   console.log(sat)
  //   createFireworks(Peony, [random([0, 60, 240, 360]), sat, 100])
  // }
  // if (frameCount % 200 === 0 || frameCount === 1) {
  //   createFireworks(Brocade, [60,  random(100), 100])
  // }
}

function mousePressed() {
  let F = random([Peony, Brocade])
  let color = floor(random(360))
  let sat = floor(random(100))

  fireworks.push(new F(mouseX, mouseY, [color, sat, 100]))
  // fireworks.push(new F(mouseX, mouseY, [328, 93, 100]))
}

function createFireworks(FireworkType, color, interval = 0) {
  let numOfFireworks
  console.log(FireworkType === Peony)
  if (FireworkType === Peony) {
    numOfFireworks = random(3, 5)
  } else {
    numOfFireworks = random(1, 3)
  }

  for (let i = 0; i < numOfFireworks; i++) {
    fireworks.push(new FireworkType(
      random(50, width - 50),
      random(100, 300),
      color
    ))
  }
}
