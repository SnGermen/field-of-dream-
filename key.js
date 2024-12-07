const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetContainer = document.querySelector(".alphabet");
const input = document.querySelector(".input__push");
const delet = document.querySelector(".delet");
const submit = document.querySelector(".submit");
const oneQuestion = document.querySelector(".question");  // Элемент для отображения вопроса

// Получаем элементы
const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin');
const scoreDisplay = document.querySelector('.score');

// Массив значений на колесе
const values = ['200', '100', '50', '150', '0', '300', '350'];

const questions = [
  { question: "Capital of France", answer: "Paris" },
  { question: "The largest animal", answer: "Whale" },
  { question: "Inventor of the electric light bulb", answer: "Edison" },
  { question: "Name of me", answer: "Yakubovich" },
  { question: "Planet in the Solar System", answer: "Mars" },
  { question: "a", answer: "a" },
  { question: "The fastest land animal", answer: "Cheetah" },
  { question: "The tallest mountain", answer: "Everest" },
  { question: "The largest ocean", answer: "Pacific" },
  { question: "The author of 'Hamlet'", answer: "Shakespeare" },
  { question: "The color of the sky on a clear day", answer: "Blue" },
  { question: "The hottest planet in the Solar System", answer: "Venus" },
  { question: "The number of days in a leap year", answer: "366" },
  { question: "The chemical symbol for water", answer: "H2O" },
  { question: "The currency of Japan", answer: "Yen" },
  { question: "The hardest natural substance", answer: "Diamond" },
];
console.log(questions)
// Генерируем случайный вопрос
let rundom = questions[Math.floor(Math.random() * questions.length)];

// Отображаем первый вопрос на экране
oneQuestion.innerHTML = rundom.question;

// Переменная для управления доступностью ввода
let canInputLetters = false;

// Переменная для хранения значения сектора
let selectedValue = 0;

// Генерация кнопок алфавита
for (let i = 0; i < alphabet.length; i++) {
  const letterDiv = document.createElement("button");
  const letter = alphabet[i];
  letterDiv.className = "letter";
  letterDiv.textContent = letter;

  // Добавляем букву в поле ввода при клике
  letterDiv.addEventListener("click", () => {
    if (canInputLetters) {
      input.value += letter;
    }
  });

  alphabetContainer.appendChild(letterDiv);
}

// Функция для переключения состояния кнопок алфавита
function toggleAlphabetButtons(enabled) {
  const buttons = alphabetContainer.querySelectorAll(".letter");
  buttons.forEach(button => {
    button.disabled = !enabled;
    button.style.opacity = enabled ? "1" : "0.5";
  });
}

// Отключаем кнопки алфавита по умолчанию
toggleAlphabetButtons(false);

// Удаление последнего символа
delet.addEventListener("click", () => {
  if (canInputLetters) {
    input.value = input.value.slice(0, -1);
  }
});

console.log(rundom);

// Текущий угол вращения
let currentAngle = 0;

spinButton.addEventListener('click', () => {
  if (canInputLetters) {
    return; // Запрещаем вращать колесо, если оно уже вращалось
  }

  // Отключаем кнопку во время вращения
  spinButton.disabled = true;

  // Генерируем случайный угол вращения
  const randomSpin = Math.floor(Math.random() * 360) + 3600; // От 3600° до 3960°
  currentAngle += randomSpin;

  // Запускаем анимацию вращения
  wheel.style.transition = 'transform 4s ease-out';
  wheel.style.transform = `rotate(${currentAngle}deg)`;

  setTimeout(() => {
    // Нормализуем угол (приводим к диапазону 0-360)
    const normalizedAngle = currentAngle % 360;

    // Угол одного сектора
    const sectorAngle = 360 / values.length;

    // Определяем индекс сектора сверху
    const selectedIndex = Math.floor((360 - normalizedAngle) / sectorAngle) % values.length;

    // Сохраняем значение сектора
    selectedValue = parseInt(values[selectedIndex]);

    // Разрешаем ввод букв
    canInputLetters = true;
    toggleAlphabetButtons(true);

    // Включаем кнопку снова
    spinButton.disabled = false;
  }, 4000); // Время анимации
});

submit.addEventListener("click", () => {
  // Сравниваем введенное слово с ответом
  if (input.value.trim().toLowerCase() === rundom.answer.toLowerCase()) {
    // Генерируем новый случайный вопрос
    rundom = questions[Math.floor(Math.random() * questions.length)];
    oneQuestion.innerHTML = rundom.question;

    // Очищаем поле ввода
    input.value = "";

    // Обновляем счет
    const currentScore = parseInt(scoreDisplay.innerHTML.replace('Score: ', '')) || 0;
    const newScore = currentScore + selectedValue;
    scoreDisplay.innerHTML = `Score: ${newScore}`;

    // Сбрасываем флаг возможности ввода букв
    canInputLetters = false;
    toggleAlphabetButtons(false);

    alert("You won!");
  } else {
    alert("Try again!");
  }
});
