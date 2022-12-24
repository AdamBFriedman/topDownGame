const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1600;
canvas.height = 780;

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    // tiles were increased by 4x and started at 12x12
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

const boundaries = [];
const offset = {
  x: 0,
  y: -150,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const mapImage = new Image();
mapImage.src = './images/Game Map.png';

const playerImage = new Image();
playerImage.src = './images/playerDown.png';

class Sprite {
  constructor({ position, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    // 192 is the actual width of the sprite image
    x: canvas.width / 2 - 192 / 4 / 2,
    // 68 is the actual height of the sprite image
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: mapImage,
});

const keys = {
  w: {
    pressed: false,
  },
  arrowUp: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  arrowLeft: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  arrowDown: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  arrowRight: {
    pressed: false,
  },
};

const testBoundary = new Boundary({ position: { x: 400, y: 400 } });
const movables = [background, testBoundary];

const detectCollision = ({ block1, block2 }) => {
  return (
    block1.position.x + block1.width >= block2.position.x &&
    block1.position.x <= block2.position.x + block2.width &&
    block1.position.y <= block2.position.y + block2.height &&
    block1.position.y + block1.height >= block2.position.y
  );
};

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  //   boundaries.forEach((boundary) => {
  //     boundary.draw();
  //   });
  //   c.drawImage(
  //     playerImage,
  //     0,
  //     0,
  //     playerImage.width / 4,
  //     playerImage.height,
  //     canvas.width / 2 - playerImage.width / 4 / 2,
  //     canvas.height / 2 - playerImage.height / 2,
  //     playerImage.width / 4,
  //     playerImage.height
  //   );
  testBoundary.draw();
  player.draw();

  if (
    detectCollision({
      block1: player,
      block2: testBoundary,
    })
  ) {
    console.log('colliding');
  }

  // Check if right side of player > left side of collision block

  if (
    (keys.w.pressed && lastKey === 'w') ||
    (keys.arrowUp.pressed && lastKey === 'ArrowUp')
  ) {
    movables.forEach((movable) => (movable.position.y += 3));
  } else if (
    (keys.a.pressed && lastKey === 'a') ||
    (keys.arrowLeft.pressed && lastKey === 'ArrowLeft')
  ) {
    movables.forEach((movable) => (movable.position.x += 3));
  } else if (
    (keys.s.pressed && lastKey === 's') ||
    (keys.arrowDown.pressed && lastKey === 'ArrowDown')
  ) {
    movables.forEach((movable) => (movable.position.y -= 3));
  } else if (
    (keys.d.pressed && lastKey === 'd') ||
    (keys.arrowRight.pressed && lastKey === 'ArrowRight')
  ) {
    movables.forEach((movable) => (movable.position.x -= 3));
  }
}
animate();

let lastKey = '';
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    // Up
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'ArrowUp':
      keys.arrowUp.pressed = true;
      lastKey = 'ArrowUp';
      break;
    // Left
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = true;
      lastKey = 'ArrowLeft';
      break;
    // Down
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'ArrowDown':
      keys.arrowDown.pressed = true;
      lastKey = 'ArrowDown';
      break;
    case 'd':
      // Right
      keys.d.pressed = true;
      lastKey = 'd';
      break;
    case 'ArrowRight':
      keys.arrowRight.pressed = true;
      lastKey = 'ArrowRight';
      break;
    default:
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    // Up
    case 'w':
      keys.w.pressed = false;
      break;
    case 'ArrowUp':
      keys.arrowUp.pressed = false;
      break;
    // Left
    case 'a':
      keys.a.pressed = false;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.pressed = false;
      break;
    // Down
    case 's':
      keys.s.pressed = false;
      break;
    case 'ArrowDown':
      keys.arrowDown.pressed = false;
      break;
    // Right
    case 'd':
      keys.d.pressed = false;
      break;
    case 'ArrowRight':
      keys.arrowRight.pressed = false;
      break;
    default:
      break;
  }
});
