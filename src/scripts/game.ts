import { Card } from "./cards";



function getThemeStorage() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        console.log(document.documentElement.getAttribute("data-theme"));
    }
}

function renderCards() {
    let cardRef = document.getElementById('card-container');
    if (cardRef)
        cardRef.innerHTML = " ";
    for (let i = 0; i < 16; i++) {
        if (cardRef)
            cardRef.innerHTML += getCardTemplate();
    }
}

function getCardTemplate() {
    return `<button class="memory-backside">
            </button>`;
}
