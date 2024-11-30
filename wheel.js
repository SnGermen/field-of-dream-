// Получаем элементы
const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin');
const scoreDisplay = document.querySelector('.score');

// Массив значений на колесе
const values = ['200', '100', '50', '150', '0', '300', '350'];

// Текущий угол вращения
let currentAngle = 0;

spinButton.addEventListener('click', () => {
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

    // Рассчитываем, какой сектор находится сверху
    const sectorAngle = 360 / values.length; // Угол одного сектора
    const adjustedAngle = (360 - normalizedAngle + sectorAngle / 2) % 360; // Сдвиг для верхнего сектора
    const selectedIndex = Math.floor(adjustedAngle / sectorAngle);

    // Показываем результат
    scoreDisplay.innerText = `Score: ${values[selectedIndex]}`;

    // Включаем кнопку снова
    spinButton.disabled = false;
  }, 4000); // Время должно совпадать с длительностью анимации
});
