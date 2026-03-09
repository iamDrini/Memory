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

function addClickListener(elementId: string, handler: () => void): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.addEventListener("click", handler);
    }
}

function addChangeListener(selector: string, inputName: string): void {
    const container = document.querySelector(selector);
    if (container) {
        container.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.name === inputName) {
                getInputValue(inputName);
            }
        });
    }
}

function initEventListeners(): void {
    addClickListener('play-btn', () => {
        window.location.href = "./src/pages/settings.html";
    });

    addClickListener('start-btn', () => {
        window.location.href = "./game.html";
    });

    addChangeListener('.input-container', 'theme');
    addChangeListener('.input-player', 'player');
    addChangeListener('.input-size', 'size');
}

initEventListeners();


