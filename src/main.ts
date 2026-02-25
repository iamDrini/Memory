
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
    }
}

const themeContainer = document.querySelector('.input-container');
if (themeContainer) {
    themeContainer.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.name === "theme") {
            getInputValue("theme");
        }
    });
}
