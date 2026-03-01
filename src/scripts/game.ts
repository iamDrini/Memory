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

    constructor(theme:Theme, player: "blue" | "orange", size:number){
        this.theme = theme;
        this.player = player;
        this.deck = this.createDeck(size, theme);
        this.renderCards();

        if (this.theme) {
        document.documentElement.setAttribute("data-theme", this.theme);
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
    }

    getCardTemplate(card: Card) {
        const imgSrc = `./../../public/img/${this.theme}_theme/cards/${card.value}`;
        const flippedClass = card.isFlipped ? "flipped" : "";
        return `<button class="memory-backside ${flippedClass}" data-id="${card.id}">
            <img src="${imgSrc}" alt="${card.value}" />
        </button>`;
    }
}

