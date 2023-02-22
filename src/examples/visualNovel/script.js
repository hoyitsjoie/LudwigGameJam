// Define the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the dialogue box properties
const dialogX = 50;
const dialogY = 320;
const dialogWidth = 540;
const dialogHeight = 120;
const dialogPadding = 10;
const dialogColor = '#ffffff';
const dialogBorderWidth = 5;
const dialogBorderColor = '#000000';

// Define the text properties
const textX = dialogX + dialogPadding;
const textY = dialogY + dialogPadding;
const textFont = '20px Arial';
const textColor = '#000000';

// Define the character properties
const characterX = 10;
const characterY = 10;
const characterWidth = 200;
const characterHeight = 300;
const characterImage = new Image();
characterImage.src = 'character.png';

// Define the dialogue lines
const dialogLines = [
  'Welcome to my visual novel!',
  'This is an example of how you can create dialogue in HTML5 Canvas.',
  'You can use JavaScript to manage the dialogue flow and display character portraits.',
  'I hope you find this helpful!',
  'Thanks for playing!'
];

// Define the current dialogue line
let currentLine = 0;

// Draw the dialogue box and text
function drawDialogueBox() {
  // Draw the box
  ctx.fillStyle = dialogColor;
  ctx.fillRect(dialogX, dialogY, dialogWidth, dialogHeight);
  ctx.lineWidth = dialogBorderWidth;
  ctx.strokeStyle = dialogBorderColor;
  ctx.strokeRect(dialogX, dialogY, dialogWidth, dialogHeight);
  
  // Draw the text
  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.fillText(dialogLines[currentLine], textX, textY);
}

// Draw the character portrait
function drawCharacter() {
  ctx.drawImage(characterImage, characterX, characterY, characterWidth, characterHeight);
}

// Handle the user input
function handleInput(e) {
  if (e.keyCode === 13) { // Enter key
    if (currentLine < dialogLines.length - 1) {
      currentLine++;
      redrawCanvas();
    } else {
      alert('Thanks for playing!');
    }
  }
}

// Redraw the canvas
function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDialogueBox();
  drawCharacter();
}

// Initialize the canvas and event listener
function init() {
  drawDialogueBox();
  drawCharacter();
  document.addEventListener('keydown', handleInput);
}

init();
