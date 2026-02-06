const headline = document.getElementById("headline");
const subtext = document.getElementById("subtext");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const statusMessage = document.getElementById("statusMessage");
const confettiContainer = document.getElementById("confetti-container");

const statusNotes = [
  "The No button keeps running. The Yes button is just standing there.",
  "You could keep chasing the No button… or press Yes and save some time.",
  "The No button chose chaos. The Yes button chose peace.",
  "At this point, the No button is just doing cardio.",
  "Meanwhile, the Yes button waits patiently.",
  "The No button refuses responsibility today.",
  "This situation could be resolved instantly with one Yes.",
  "The No button is clearly avoiding commitment.",
  "Ah yes, chasing the No button. Bold strategy.",
  "The No button has clearly chosen flight over fight.",
  "Still trying? The Yes button has been available this whole time.",
  "At this point, the No button deserves cardio credit.",
  "You know… pressing Yes would have been faster 😌",
  "The No button said ‘not today’.",
  "You’re really committed to this chase, huh?",
  "Meanwhile, the Yes button is just standing there… patiently.",
  "The No button is working overtime avoiding you.",
  "This could all end instantly with one Yes.",
  "The No button seems very confident in its escape skills.",
  "You keep trying. I admire the determination.",
  "The Yes button is starting to feel ignored.",
  "Plot twist: the No button never planned to stay.",
  "Some answers are clearly easier than others 💖",
];

const celebrationVariants = [
  {
    title: "Oh wow, a Yes. Shocking. 💖",
    text: "I definitely didn’t design this entire page expecting that.",
    tagline: "Confetti acting surprised...",
  },
  {
    title: "You said yes!",
    text: "Good choice. The Yes button had better vibes anyway.",
    tagline: "Celebration officially justified.",
  },
  {
    title: "Finally 😌",
    text: "That only took a little persuasion and a very fast No button.",
    tagline: "Confetti approves this decision.",
  },
  {
    title: "Correct answer detected 💘",
    text: "System confirms excellent decision-making.",
    tagline: "Loading happiness..."
  },
  {
    title: "You chose wisely.",
    text: "The No button never stood a chance.",
    tagline: "Confetti deployed successfully."
  },
  {
    title: "As expected.",
    text: "The Yes button knew you'd come around.",
    tagline: "Romance mode enabled."
  },
  {
    title: "Yay! 💖",
    text: "See? That wasn’t so hard.",
    tagline: "Confetti says you did great."
  },
  {
    title: "You said yes!",
    text: "The Yes button appreciates the attention.",
    tagline: "Smiles unlocked."
  },
  {
    title: "That’s the spirit ✨",
    text: "Some choices just make everything brighter.",
    tagline: "Celebration incoming."
  }
];

const confettiColors = ["#ff6ec7", "#ffd1ec", "#ff99c8", "#ffb3d1"];
let escapeCount = 0;

function getNameFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const firstName = params.get("firstName")?.trim();
  const lastName = params.get("lastName")?.trim();
  if (!firstName) {
    return "there";
  }
  return lastName ? `${firstName} ${lastName}` : firstName;
}

function clampToViewport(x, y, buttonRect) {
  const margin = 20;
  const minX = margin;
  const minY = margin + 40;
  const maxX = Math.max(window.innerWidth - buttonRect.width - margin, minX);
  const maxY = Math.max(window.innerHeight - buttonRect.height - margin, minY);
  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, minY), maxY),
  };
}

function moveNoButton() {
  const buttonRect = noBtn.getBoundingClientRect();
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;
  const { x, y } = clampToViewport(randomX, randomY, buttonRect);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "translate(0, 0)";
  noBtn.classList.add("freed");
}

function createConfetti() {
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDelay = `${Math.random() * 0.6}s`;
    piece.style.animationDuration = `${Math.random() * 1.1 + 1.1}s`;
    confettiContainer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function showYesState() {
  const celebration =
    celebrationVariants[Math.floor(Math.random() * celebrationVariants.length)];
  headline.textContent = celebration.title;
  subtext.textContent = celebration.text;
  statusMessage.textContent = celebration.tagline;
  statusMessage.classList.add("success");
  statusMessage.classList.remove("released");
  yesBtn.classList.add("celebration");
  createConfetti();
  noBtn.setAttribute("aria-disabled", "true");
  noBtn.disabled = true;
  noBtn.style.cursor = "not-allowed";
}

function updateGreeting() {
  const name = getNameFromQuery();
  headline.textContent = `Hey ${name} 💘`;
  subtext.textContent = "Will you be my Valentine?";
}

function handleNoAttempt(event) {
  if (event.cancelable) {
    event.preventDefault();
  }
  event.stopPropagation();

  moveNoButton();
  escapeCount += 1;
  statusMessage.classList.remove("success");

  const noteIndex = Math.min(escapeCount - 1, statusNotes.length - 1);
  statusMessage.textContent = statusNotes[noteIndex];
}

["mouseenter", "focus", "touchstart", "pointerenter"].forEach((eventName) => {
  noBtn.addEventListener(eventName, handleNoAttempt);
});

noBtn.addEventListener("click", handleNoAttempt);
yesBtn.addEventListener("click", showYesState);

updateGreeting();

const staticNotes = [
  "The No button keeps running. The Yes button is just standing there.",
  "You could keep chasing the No button… or press Yes and save some time.",
  "The No button chose chaos. The Yes button chose peace.",
  "At this point, the No button is just doing cardio.",
  "Meanwhile, the Yes button waits patiently.",
  "The No button refuses responsibility today.",
  "This situation could be resolved instantly with one Yes.",
]
const randomStatus = () =>
  staticNotes[Math.floor(Math.random() * staticNotes.length)];

statusMessage.textContent = randomStatus();