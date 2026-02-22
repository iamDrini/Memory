function renderCards() {
    let cardRef = document.getElementById('card-container');
    if (cardRef)
        cardRef.innerHTML = " ";
    for (let i = 0; i < 16; i++) {
        if(cardRef)
        cardRef.innerHTML += getCardTemplate();
    }
}

function getCardTemplate() {
    return `<div class="memory-backside">
            </div>`;
}