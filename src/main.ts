
const buttonPlay = document.getElementById('play-btn');
if (buttonPlay)
    buttonPlay.addEventListener("click", () => {
        window.location.href = "./src/pages/settings.html";
    });

const buttonStart = document.getElementById('start-btn');
if (buttonStart)
    buttonStart.addEventListener("click", () => {
        window.location.href = "/src/pages/game.html";
    })

function getInputValue(name: string) {
    const valueRef = document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    if (!valueRef) {
        return null;
    }
    const value = valueRef.value;
    console.log(value);
    if (name === "theme") {
        localStorage.setItem("theme", value);
    } else if (name === "player") {
        localStorage.setItem("player", value);
    } else if (name === "size") {
        localStorage.setItem("size", value);
    }
}

const themeContainer = document.querySelector('.input-container');
const playerContainer = document.querySelector('.input-player');
const sizeContainer = document.querySelector('.input-size');

if (themeContainer) {
    themeContainer.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name === "theme") {
            getInputValue("theme");
        }
    });
}
if (playerContainer) {
    playerContainer.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name === "player") {
            getInputValue("player");
        }
    });
}
if (sizeContainer) {
    sizeContainer.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name === "size") {
            getInputValue("size");
        }
    });
}

function flipCard(id:string){
    const cardRef = document.getElementById(`${id}`);
    if(cardRef)
        cardRef.classList.toggle("is-flipped");
    console.log(id + "es greift");
    
}
