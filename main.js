const drawButton = document.getElementById('draw-button');
const gamesContainer = document.getElementById('games');
const themeToggle = document.getElementById('theme-toggle-input');

// 저장된 테마 적용
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

drawButton.addEventListener('click', () => {
    drawAllGames();
});

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function drawAllGames() {
    gamesContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const gameRow = document.createElement('div');
        gameRow.classList.add('game-row');

        const label = document.createElement('span');
        label.classList.add('game-label');
        label.textContent = `Game ${i + 1}`;
        gameRow.appendChild(label);

        const numberContainer = document.createElement('div');
        numberContainer.classList.add('number-container');

        generateNumbers().forEach(number => {
            const el = document.createElement('div');
            el.classList.add('number');
            el.textContent = number;
            numberContainer.appendChild(el);
        });

        gameRow.appendChild(numberContainer);
        gamesContainer.appendChild(gameRow);
    }
}