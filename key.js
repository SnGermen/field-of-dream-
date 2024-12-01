const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetContainer = document.querySelector(".alphabet");
const input = document.querySelector(".input__push");
const delet = document.querySelector(".delet");
const submit = document.querySelector(".submit");
const oneQuestion = document.querySelector(".question");  // Элемент для отображения вопроса

const questions = [
  { question: "Capital of France", answer: "Paris" },
  { question: "The largest animal", answer: "Whale" },
  { question: "Inventor of the electric light bulb", answer: "Edison" },
  { question: "Name of me", answer: "Germen" },
  { question: "Planet in the Solar System", answer: "Mars" },
  { question: "a", answer: "a" },
];

// Генерируем случайный вопрос
let rundom = questions[Math.floor(Math.random() * questions.length)];

// Отображаем первый вопрос на экране
oneQuestion.innerHTML = rundom.question;

// Генерация кнопок алфавита
for (let i = 0; i < alphabet.length; i++) {
  const letterDiv = document.createElement("button");
  const letter = alphabet[i];
  letterDiv.className = "letter";
  letterDiv.textContent = letter;

  // Добавляем букву в поле ввода при клике
  letterDiv.addEventListener("click", () => {
    input.value += letter;
  });

  alphabetContainer.appendChild(letterDiv);
}

// Удаление последнего символа
delet.addEventListener("click", () => {
  input.value = input.value.slice(0, -1);
});

console.log(rundom);

let check = false;

submit.addEventListener("click", () => {
  // Сравниваем введенное слово с ответом
  if (input.value.trim().toLowerCase() === rundom.answer.toLowerCase()) {
    check = true;  // Если ответ правильный, устанавливаем check в true
    rundom = questions[Math.floor(Math.random() * questions.length)];  // Генерируем новый случайный вопрос
    oneQuestion.innerHTML = rundom.question;  // Обновляем вопрос на экране
    input.value = "";  // Очищаем поле ввода
    alert("You won!");
  } else {
    alert("Try again!");
  }
})

