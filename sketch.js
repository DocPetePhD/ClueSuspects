  // ARRAYS OF OBJECTS – Cards placed automatically

let suspects = [];
let murdererIndex;
let message = "Click a suspect to accuse.";

function setup() {
  createCanvas(650, 300);
  textSize(18);

  // Just the suspect data — no drawing positions stored here!
  suspects = [
    { name: "Miss Scarlet",    isMurderer: false, revealed: false },
    { name: "Colonel Mustard", isMurderer: false, revealed: false },
    { name: "Mrs. Peacock",    isMurderer: false, revealed: false },
    { name: "Mr. Green",       isMurderer: false, revealed: false }
  ];

  // Pick one guilty suspect randomly
  murdererIndex = floor(random(suspects.length));
  suspects[murdererIndex].isMurderer = true;
}

function draw() {
  background(230);

  fill(0);
  text("ARRAYS of OBJECTS – Auto Positioned", 200, 30);
  text(message, 200, 60);

  // Loop through suspects and draw their cards
  for (let i = 0; i < suspects.length; i++) {
    drawSuspectCard(i, suspects[i]);
  }
}

// Draw each card based on index
function drawSuspectCard(i, suspect) {
  let cardWidth = 140;
  let cardHeight = 100;

  // Auto-position based on index
  let spacing = (width - (cardWidth * suspects.length)) / (suspects.length + 1);
  let x = spacing + i * (cardWidth + spacing);
  let y = 100;

  // Change card color if clicked
  if (suspect.revealed) {
    if (suspect.isMurderer) fill(255, 120, 120); // red for guilty
    else fill(120, 255, 120);                    // green for innocent
  } else {
    fill(255); // unrevealed
  }

  stroke(0);
  rect(x, y, cardWidth, cardHeight, 10);

  fill(0);
  textAlign(CENTER, CENTER);
  text(suspect.name, x + cardWidth / 2, y + cardHeight / 2);
}

function mousePressed() {
  let cardWidth = 140;
  let cardHeight = 100;
  let spacing = (width - (cardWidth * suspects.length)) / (suspects.length + 1);

  // Check each card for click
  for (let i = 0; i < suspects.length; i++) {
    let x = spacing + i * (cardWidth + spacing);
    let y = 100;
    let suspect = suspects[i];

    if (mouseX > x && mouseX < x + cardWidth &&
        mouseY > y && mouseY < y + cardHeight) {
      suspect.revealed = true;

      if (suspect.isMurderer) {
        message = "🎉 " + suspect.name + " is the murderer!";
      } else {
        message = "❌ " + suspect.name + " is innocent!";
      }
    }
  }
}
