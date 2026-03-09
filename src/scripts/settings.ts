function addChangeListener(selector: string, name: string, spanId: string, text: string): void {
    const container = document.querySelector(selector);
    if (container) {
        container.addEventListener('change', () => {
            updateSpans(name, spanId, text, container);
            updateStartButtonState();
        });
    }
}

function initEventListeners(): void {
    addChangeListener('.input-container', 'theme', 'preview-theme', ' theme');
    addChangeListener('.input-player', 'player', 'preview-player', ' player');
    addChangeListener('.input-size', 'size', 'preview-size', ' cards');
}

initEventListeners();

function updateSpans(name: string, spanId: string, text: string, group: Element) {
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
