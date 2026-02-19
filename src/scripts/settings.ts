const container = document.querySelector('.input-container');
container?.addEventListener('change', () => {
    updateSpans("theme", "preview-theme", " theme", container);
});

const playerRef = document.querySelector('.input-player');
playerRef?.addEventListener('change', () => {
    updateSpans("player", "preview-player", " player", playerRef);
});

const sizeRef = document.querySelector('.input-size');
sizeRef?.addEventListener('change', () => {
    updateSpans("size", "preview-size", " cards", sizeRef);
});


function updateSpans(name: string, spanId: string, text: string, group:Element) {
    const selected = group?.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    const valueRef = selected?.value;

    const spanRef = document.getElementById(`${spanId}`);
    if (spanRef && valueRef !== undefined) {
        spanRef.innerText = valueRef + `${text}`;
    }
}