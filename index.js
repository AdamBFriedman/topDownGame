const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1700;
canvas.height = 780;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const mapImage = new Image();
mapImage.src = './images/Game Map.png';

const playerImage = new Image();
playerImage.src = './images/playerDown.png';

class Sprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, 0, -150);
  }
}

const background = new Sprite({
  position: {
    x: 0,
    y: -150,
  },
  image: mapImage,
});

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
}
animate();

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      console.log('w');
      break;
    case 'a':
      console.log('a');
      break;
    case 's':
      console.log('s');
      break;
    case 'd':
      console.log('d');
      break;

    default:
      break;
  }
});
