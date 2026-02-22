
const buttonPlay = document.getElementById('play-btn');
if(buttonPlay)
buttonPlay.addEventListener("click", () => {
    window.location.href = "./src/pages/settings.html";
});

const buttonStart = document.getElementById('start-btn');
if(buttonStart)
buttonStart.addEventListener("click", () => {
    window.location.href = "/src/pages/game.html";
})