import { Card, Theme, THEME_IMAGES } from "./cards";

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    // Einstellungen aus localStorage holen
    const theme = (localStorage.getItem("theme") as Theme) || "code";
    const player = (localStorage.getItem("player") as "blue" | "orange") || "blue";
    const size = Number(localStorage.getItem("size")) || 16;
    // Game erzeugen und Karten rendern
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

        if (this.theme) {
        document.documentElement.setAttribute("data-theme", this.theme);
        }
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
        // Prüfen ob bereits 2 Karten umgedreht sind
        if (this.flippedCards.length >= 2) {
            return;
        }
        
        const cardRef = document.getElementById(id);
        if (!cardRef) return;
        
        // Prüfen ob Karte bereits umgedreht ist
        if (cardRef.classList.contains("is-flipped")) {
            return;
        }
        
        // Karte umdrehen
        cardRef.classList.add("is-flipped");
        this.flippedCards.push(id);
        
        // Wenn 2 Karten umgedreht sind, prüfen ob sie gleich sind
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
        
        // Prüfen ob die Werte gleich sind
        if (firstCard.value === secondCard.value) {
            // Match gefunden!
            firstCard.isMatched = true;
            secondCard.isMatched = true;
            
            // Karten als matched markieren
            const firstCardElement = document.getElementById(firstId);
            const secondCardElement = document.getElementById(secondId);
            
            if (firstCardElement) firstCardElement.classList.add("is-matched");
            if (secondCardElement) secondCardElement.classList.add("is-matched");
            
            // Punkt vergeben
            this.addPoint();
            
            // Array zurücksetzen ohne Karten zurückzudrehen
            this.flippedCards = [];
        } else {
            // Kein Match - Karten zurückdrehen
            this.resetCards();
        }
    }

    addPoint() {
        // Punkt für aktuellen Spieler hinzufügen
        const pointsElement = document.getElementById(this.player === "blue" ? "bl-points" : "or-points");
        if (pointsElement) {
            const currentPoints = parseInt(pointsElement.textContent || "0");
            pointsElement.textContent = (currentPoints + 1).toString();
        }
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
}
