const container = document.getElementById("container");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const fruits = ["🥝", "🍇", "🍉", "🍊", "🍌", "🍍", "🥭", "🍎", "🍓", "🥕"];
const cards = [...fruits, ...fruits];
let flippedCards = [];
let matches = 0;
let score = 0;
let timer = 30;
let timeInterval;
let comparing = false;

cards.forEach((fruit, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.dataset.index1 = index;
  console.log(card.dataset.index1);
  const cardContent = document.createElement("span");
  cardContent.classList.add("hidden");
  cardContent.textContent = fruit;
  card.appendChild(cardContent);
  card.addEventListener("click", handleCardClick);
  container.appendChild(card);
});

timeInterval = setInterval(updateTimer, 1000);

function handleCardClick() {
  const clickCard = this;
  console.log(clickCard);
  const index = clickCard.dataset.index1;

  if (
    flippedCards.length === 2 ||
    clickCard.classList.contains("flipped") ||
    comparing
  ) {
    return;
  }

  showCard(clickCard);

  flippedCards.push(clickCard);

  if (flippedCards.length === 2) {
    comparing = true;
    setTimeout(() => {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matches++;
        score += 10;
        updateScore();
      } else {
        hideCard(firstCard);
        hideCard(secondCard);
      }
      flippedCards = [];
      comparing = false;
    }, 1000);
  }
}

function showCard(card) {
  card.classList.add("flipped");
  card.children[0].classList.remove("hidden");
}

function updateScore() {
  scoreDisplay.textContent = "score: " + score;
}

function hideCard(card) {
  card.classList.remove("flipped");
  card.children[0].classList.add("hidden");
}
