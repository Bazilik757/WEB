import { bin } from "./order.js";

const notific = document.getElementById('notific');
const notific_text = document.getElementById('notific_text');
const notific_button = document.getElementById('notific_button');
const butElem = document.getElementById('submit_button');

export const notificFoo = (e) => {
  const showNotification = (message) => {
    e.preventDefault();
    notific_text.innerHTML = message;
    notific.style.display = 'flex';
    return false;
  };

  const hasDrink = bin["drink"] !== "";
  const hasSoup = bin["soup"] === "1";
  const hasMainCourse = bin["main-course"] === "1";
  const hasSalad = bin["salad"] === "1";

  if (hasSoup) {
    if (!hasMainCourse && !hasSalad) {
      return showNotification('Выберите главное блюдо или салат/стартер');
    }
    if (!hasDrink) {
      return showNotification('Выберите напиток');
    }
  } else {
    if (hasMainCourse || hasSalad) {
      if (!hasDrink) {
        return showNotification('Выберите напиток');
      }
    } else {
      if (!hasDrink) {
        return showNotification('Ничего не выбрано');
      }
      return showNotification('Выберите главное блюдо');
    }
  }

  return true;
};

notific_button.addEventListener('click', () => {
  notific.style.display = 'none';
});
