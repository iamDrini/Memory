import { Card, Theme, THEME_IMAGES } from "./cards";

// Attribute SOFORT setzen beim Script-Laden
const theme = (localStorage.getItem("theme") as Theme) || "code";
const player = (localStorage.getItem("player") as "blue" | "orange") || "blue";
const size = Number(localStorage.getItem("size")) || 16;

document.documentElement.setAttribute("data-theme", theme);
document.documentElement.setAttribute("data-player", player);

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game(theme, player, size);
});

class Game {
    theme: Theme;
    player: "blue" | "orange";
    deck: Card[];
    flippedCards: string[] = [];

    constructor(theme:Theme, player: "blue" | "orange", size:number){
        this.theme = theme;
        this.player = player;
        this.deck = this.createDeck(size, theme);
        this.renderCards();
        const containerRef = document.getElementById('card-container');
        if(size==16){
            containerRef?.classList.add("small-board");
        }else if(size==24|| 32){
            containerRef?.classList.add("medium-big-board");
        }
    }

    private createDeck(size: number, theme: Theme): Card[] {
        const pairCount = size / 2;
        const images = THEME_IMAGES[theme];
        const shuffled = images.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, pairCount);
        return this.createCardsArray(selected);
    }

    createCardsArray(arr: string[]): Card[] {
        let cards: Card[] = [];
        arr.forEach((img, idx) => {
            cards.push({
                id: `${img}-a${idx}`,
                value: img,
                isFlipped: false,
                isMatched: false
            });
            cards.push({
                id: `${img}-b${idx}`,
                value: img,
                isFlipped: false,
                isMatched: false
            });
        });
        return cards.sort(() => Math.random() - 0.5);
    }

    renderCards() {
        const cardRef = document.getElementById('card-container');
        if (!cardRef) return;
        cardRef.innerHTML = "";
        this.deck.forEach(card => {
            cardRef.innerHTML += this.getCardTemplate(card);
        });
        this.attachCardListeners();
    }

    getCardTemplate(card: Card) {
        const imgSrc = `./../../public/img/${this.theme}_theme/cards/${card.value}`;
        const flippedClass = card.isFlipped ? "flipped" : "";
        return `<button class="card" id="${card.id}">
                    <div class="card__inner">
                        <div class="card__face"></div>
                        <div class="card__face card__face--back"><img src="${imgSrc}"></div>
                    </div>
                </button>`;
    }

    attachCardListeners() {
        this.deck.forEach(card => {
            const cardElement = document.getElementById(card.id);
            if (cardElement) {
                cardElement.addEventListener('click', () => this.flipCard(card.id));
            }
        });
    }

    flipCard(id: string) {
        if (this.flippedCards.length >= 2) {
            return;
        }
        const cardRef = document.getElementById(id);
        if (!cardRef) return;
        if (cardRef.classList.contains("is-flipped")) {
            return;
        }
        cardRef.classList.add("is-flipped");
        this.flippedCards.push(id);
        if (this.flippedCards.length === 2) {
            setTimeout(() => {
                this.checkMatch();
            }, 1000);
        }
    }

    checkMatch() {
        const [firstId, secondId] = this.flippedCards;
        const firstCard = this.deck.find(card => card.id === firstId);
        const secondCard = this.deck.find(card => card.id === secondId);
        
        if (!firstCard || !secondCard) {
            this.resetCards();
            return;
        }
        
        if (firstCard.value === secondCard.value) {
            this.handleMatch(firstCard, secondCard, firstId, secondId);
        } else {
            this.handleNoMatch();
        }
    }

    handleMatch(firstCard: Card, secondCard: Card, firstId: string, secondId: string) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        
        const firstCardElement = document.getElementById(firstId);
        const secondCardElement = document.getElementById(secondId);
        
        if (firstCardElement) firstCardElement.classList.add("is-matched");
        if (secondCardElement) secondCardElement.classList.add("is-matched");
        
        this.addPoint();
        this.flippedCards = [];
    }

    handleNoMatch() {
        this.resetCards();
        this.switchPlayer();
    }

    addPoint() {
        if(this.checkAllMatched()){
            this.endGame();
        }
        const pointsElement = document.getElementById(this.player === "blue" ? "bl-points" : "or-points");
        if (pointsElement) {
            const currentPoints = parseInt(pointsElement.textContent || "0");
            pointsElement.textContent = (currentPoints + 1).toString();
        }
        this.updateScoreboard();
    }

    resetCards() {
        this.flippedCards.forEach(id => {
            const cardRef = document.getElementById(id);
            if (cardRef) {
                cardRef.classList.remove("is-flipped");
            }
        });
        this.flippedCards = [];
    }

    switchPlayer() {
        this.player = this.player === "blue" ? "orange" : "blue";
        this.updateCurrentPlayerDisplay();
    }

    updateCurrentPlayerDisplay() {
        document.documentElement.setAttribute("data-player", this.player);
    }

    endGame(){
        const dialogRef = document.getElementById("scoreboard");
        if(dialogRef)
            dialogRef.style.display = "flex";
    }

    checkAllMatched(){
        return this.deck.every(card => card.isMatched);
    }
    updateScoreboard(){
        const bluePointsElement = document.getElementById('bl-points');
        const orangePointsElement = document.getElementById('or-points');
        const blueRef = document.getElementById('bl-sb');
        const orangeRef = document.getElementById('or-sb');
        
        if(blueRef && orangeRef && bluePointsElement && orangePointsElement){
            blueRef.innerHTML = bluePointsElement.innerHTML;
            orangeRef.innerHTML = orangePointsElement.innerHTML;
        }
    }

    showWinner(){
        
    }
}