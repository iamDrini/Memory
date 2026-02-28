import { Card, Theme } from "./cards";

class Game {
    theme: Theme;
    player: "blue" | "orange";
    size:number;
    deck: Card[];

    constructor(theme:Theme, player: "blue" | "orange", size:number){
        this.theme = theme;
        this.player = player;
        this.size = size;
        this.deck = this.createDeck();
    }

    private createDeck(): Card [] {
        return [];
    }

    renderCards() {
        let cardRef = document.getElementById('card-container');
        if (cardRef)
            cardRef.innerHTML = " ";
        for (let i = 0; i < 16; i++) {
            if (cardRef)
                cardRef.innerHTML += this.getCardTemplate();
        }
    }

    getCardTemplate() {
        return `<button class="memory-backside">
            </button>`;
    }
}

