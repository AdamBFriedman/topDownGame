const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 576;

const c = canvas.getContext('2d');

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const map = new Image();
map.src = './images/Game Map.png';
map.onload = () => {
  c.drawImage(map, 0, 0);
};
