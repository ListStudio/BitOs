// 1. Создание анимированных линий на фоне
const bg = document.getElementById('bg-canvas');

function createLine() {
    const line = document.createElement('div');
    const duration = Math.random() * 8 + 4;
    
    line.style.cssText = `
        position: absolute;
        width: ${Math.random() * 40 + 10}%;
        height: 1px;
        background: linear-gradient(90deg, transparent, #00f2ff, transparent);
        top: ${Math.random() * 100}%;
        left: -100%;
        opacity: ${Math.random() * 0.5};
        animation: slide ${duration}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    bg.appendChild(line);
}

// Добавляем CSS анимацию через JS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slide {
        0% { left: -100%; }
        100% { left: 100%; }
    }
`;
document.head.appendChild(style);

// Генерируем 15 линий
for (let i = 0; i < 15; i++) {
    createLine();
}

// 2. Логика перевода интерфейса
const langBtn = document.getElementById('lang-btn');
let isEnglish = false;

langBtn.addEventListener('click', () => {
    isEnglish = !isEnglish;
    const currentMode = isEnglish ? 'en' : 'ru';
    
    // Переводим все элементы с атрибутами data-en / data-ru
    document.querySelectorAll('[data-en]').forEach(el => {
        // Ищем текстовый узел внутри элемента, чтобы не удалить иконку
        el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                node.textContent = el.getAttribute(`data-${currentMode}`);
            }
        });
    });

    // Обновляем текст кнопки перевода
    const btnText = langBtn.querySelector('.btn-text');
    btnText.textContent = isEnglish ? "To Russian" : "На английский";
});
