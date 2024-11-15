const words = [
    
   
"казахстан", "история", "культура", "степь", "наука", "традиции", "природа", "город", "река", "горы",
    
 
"пустыня", "кочевники", "школа", "университет", "герб", "флаг", "памятник", "архитектура", "искусство",
    
 
"танцы", "музыка", "поэзия", "национальный", "государство", "республика", "язык", "мода", "туризм", 
    
    
"спорт", "источник", "этнос", "богатство", "дружба", "община", "экономика", "век", "цивилизация", 
    
 
"евразия", "столица", "путешествия", "деньги", "работа", "молодежь", "ученые", "технология", 
    "достижения", "новость", "реформы", "космос", "медицина", "исследования", "экология", "образование", 
    
 
"физика", "математика", "биология", "химия", "психология", "философия", "политика", "экономия", 
    
  
"инновации", "производство", "интернет", "социальные", "компьютеры", "программирование", "автомобили",
    
 
"молекулы", "космонавты", "ученик", "кандидат", "инженер", "студент", "профессор", "ученый", "доктор",
    
    
"генетика", "анализ", "лингвистика", "математика", "астрофизика", "историк", "палеонтология", 
    
 
"эксперименты", "компьютеры", "интернет", "создание", "вычисления", "разработка", "математика", 
    
    
"физика", "проектирование", "анализ", "глобализация", "тренды", "управление", "маркетинг", "планирование",
    
   
"удаленная", "работа", "сеть", "оптимизация", "контент", "мобильность", "интернет", "расширение", 
    
  
"высокоскоростной", "веб", "дизайн", "вебинары", "искусственный", "интеллект", "платформа", "опыт", 
    
   
"карьера", "профессионализм", "конкуренция", "развитие", "реинжиниринг", "инновационные", "открытия", 
    
   
"модернизация", "реформы", "производственные", "решения", "энергия", "возобновляемые", "ресурсы", 
    
   
"генерация", "инвестиции", "страна", "глобальные", "потребности", "развитие", "сотрудничество", 
    
    
"работа", "международные", "экономики", "участие", "создание", "менеджмент", "управление", "интеграция", 
    "наука", "развитие", "учебный", "план", "кадры", "компании", "разработка", "программы", "экспорт", 
    "маркетинг", "компании", "поставки", "товары", "торговля", "инвестиции", "глобальные", "влияние", 
    "развитие", "приобретение", "контракт", "прибыль", "партнер", "объединение", "расширение", "проект",
    
   
"дизайн", "инновации", "потребности", "разработка", "эффективность", "креативность", "менеджмент", 
    
  
"производственные", "компании", "анализ", "экономика", "интеграция", "компании", "международные",
    
    
"финансы", "уровень", "развитие", "успех", "успешные", "процессы", "участие", "развитие", "программы",
    
    
"инфраструктура", "глобальные", "потребности", "отрасли", "инвестиции", "эффективность", "интеллект",
    "политика", "мониторинг", "взаимодействие", "научные", "развитие", "интеграция", "управление", "развитие",
    "качество", "производственные", "эффективность", "инвестиции", "политика", "влияние", "потребности",
    "дизайн", "инновации", "создание", "основы", "производство", "профессии", "технологии", "изучение", 
    
  
"интернет", "управление", "развитие", "ресурсы", "энергия", "управление", "эффективность", "влияние"
];
let chosenWord, guessedLetters, mistakes;
const maxMistakes = 10;

const wordElem = document.getElementById("word");
const messageElem = document.getElementById("message");
const lettersElem = document.getElementById("letters");
const resetBtn = document.getElementById("reset");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function initializeGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = Array(chosenWord.length).fill("_");
    mistakes = 0;
    updateWord();
    drawHangman();
    messageElem.textContent = "";
    lettersElem.innerHTML = "";
    createLetterButtons();
}

function updateWord() {
    wordElem.textContent = guessedLetters.join(" ");
}

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#333";

    if (mistakes > 0) ctx.strokeRect(10, 230, 80, 5); 
    if (mistakes > 1) ctx.strokeRect(30, 10, 5, 220); 
    if (mistakes > 2) ctx.strokeRect(30, 10, 100, 5); 
    if (mistakes > 3) ctx.strokeRect(120, 10, 5, 30);
    if (mistakes > 4) {
        ctx.beginPath();
        ctx.arc(122, 55, 15, 0, Math.PI * 2); 
        ctx.stroke();
    }
    if (mistakes > 5) {
        ctx.moveTo(122, 70); ctx.lineTo(122, 140); // тело
        ctx.stroke();
    }
    if (mistakes > 6) {
        ctx.moveTo(122, 85); ctx.lineTo(105, 115); // левая рука
        ctx.stroke();
    }
    if (mistakes > 7) {
        ctx.moveTo(122, 135); ctx.lineTo(105, 175); // левая нога
        ; // правая нога
        ctx.stroke();
    }
    if (mistakes > 8) {
        ctx.moveTo(122, 135); ctx.lineTo(139, 175) // тело
        ctx.stroke();
    }
    if (mistakes > 9) {
        ctx.moveTo(122, 85); ctx.lineTo(139, 115); // тело
        ctx.stroke();
    }
}

function checkGameStatus() {
    if (guessedLetters.join("") === chosenWord) {
        messageElem.textContent = "Поздравляем! Вы выиграли!";
        lettersElem.innerHTML = "";
    } else if (mistakes >= maxMistakes) {
        messageElem.textContent = `Вы проиграли! Слово было: ${chosenWord}`;
        lettersElem.innerHTML = "";
    }
}

function handleLetterClick(letter) {
    if (chosenWord.includes(letter)) {
        chosenWord.split("").forEach((ch, i) => {
            if (ch === letter) guessedLetters[i] = letter;
        });
    } else {
        mistakes++;
        drawHangman();
    }
    updateWord();
    checkGameStatus();
}

function createLetterButtons() {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    alphabet.split("").forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.className = "letter-btn";
        button.addEventListener("click", () => {
            button.disabled = true;
            handleLetterClick(letter);
        });
        lettersElem.appendChild(button);
    });
}

resetBtn.addEventListener("click", initializeGame);
initializeGame();
