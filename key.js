const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetContainer = document.querySelector(".alphabet");
const input = document.querySelector(".input__push");
const delet = document.querySelector(".delet");
const submit = document.querySelector(".submit");
let quetion = document.querySelector(".quetion")
const word = "GOD";


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


// Проверка слова при нажатии на кнопку "Submit"
submit.addEventListener("click", () => {
  if (input.value === word) {
    alert("You won!");
  } else {
    alert("Try again!");
  }
});


