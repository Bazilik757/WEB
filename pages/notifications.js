import { basket } from "./displayDishes.js";

// Функция для показа уведомления
function showNotification(message) {
  const notification = document.getElementById("notification");
  const messageElem = document.getElementById("notification-message");
  
  messageElem.textContent = message;
  
  notification.classList.remove("hidden");
}

// Обработчик нажатия на кнопку "Окей"
document.getElementById("notification-ok").addEventListener("click", () => {
  const notification = document.getElementById("notification");
  
  notification.classList.add("hidden");
});

// Функция для проверки заказа
function checkOrder() {
  // Получаем текущий набор блюд из корзины
  const selectedDishes = {
    soup: basket.soup.name !== "",
    main_dish: basket.main_dish.name !== "",
    salad_starter: basket.salad_starter.name !== "",
    juice: basket.juice.name !== "",
    dessert: basket.dessert.name !== ""
  };

 // Логика проверки на соответствие одному из вариантов ланча
 if (!selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter && !selectedDishes.juice && !selectedDishes.dessert) {
    return "Ничего не выбрано. Выберите блюда для заказа";
  }
  if (selectedDishes.dessert && !selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter && !selectedDishes.juice) {
    return "Только десерт заказать нельзя. Выберите другие блюда.";
  }
  if (!selectedDishes.juice) {
    return "Выберите напиток";
  }
  if (selectedDishes.soup && !selectedDishes.main_dish && !selectedDishes.salad_starter) {
    return "Выберите главное блюдо/салат/стартер";
  }
  if (selectedDishes.salad_starter && (!selectedDishes.soup || !selectedDishes.main_dish)) {
    return "Выберите суп или главное блюдо";
  }
  if (!selectedDishes.main_dish) {
    return "Выберите главное блюдо";
  }

  // Если все условия соблюдены, возвращаем null
  return null;
}



// Обработчик отправки формы
document.querySelector("form").addEventListener("submit", (event) => {
  const errorMessage = checkOrder();
  
  if (errorMessage) {
    event.preventDefault(); // Отменяем отправку формы
    showNotification(errorMessage); // Показываем уведомление
  }
});

  