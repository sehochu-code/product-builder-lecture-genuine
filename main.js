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

// 제휴 문의 폼 제출 처리
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formStatus.textContent = '문의가 성공적으로 전송되었습니다. 감사합니다!';
            formStatus.classList.add('success');
            contactForm.reset();
        } else {
            throw new Error('서버 오류');
        }
    } catch {
        formStatus.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해주세요.';
        formStatus.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '문의 보내기';
    }
});

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