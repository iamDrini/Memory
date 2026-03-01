const container = document.querySelector('.input-container');
if(container)
container.addEventListener('change', () => {
    updateSpans("theme", "preview-theme", " theme", container);
    updateStartButtonState();
});

const playerRef = document.querySelector('.input-player');
if(playerRef)
playerRef.addEventListener('change', () => {
    updateSpans("player", "preview-player", " player", playerRef);
    updateStartButtonState();
});

const sizeRef = document.querySelector('.input-size');
if(sizeRef)
sizeRef.addEventListener('change', () => {
    updateSpans("size", "preview-size", " cards", sizeRef);
    updateStartButtonState();
});

function updateSpans(name: string, spanId: string, text: string, group:Element) {
    const selected = group?.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const valueRef = selected?.value;

    const spanRef = document.getElementById(`${spanId}`);
    if (spanRef && valueRef !== undefined) {
        spanRef.innerText = valueRef + `${text}`;
    }
}

function updateStartButtonState() {
    const startButton = document.getElementById('start-btn') as HTMLButtonElement | null;
    if (!startButton) {
        return;
    }

    const requiredGroups = ['theme', 'player', 'size'];
    const allGroupsSelected = requiredGroups.every((groupName) => {
        return document.querySelector(`input[name="${groupName}"]:checked`) !== null;
    });

    startButton.disabled = !allGroupsSelected;
}
