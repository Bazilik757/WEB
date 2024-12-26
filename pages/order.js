import loadDishes from "./load_dishes.js";

// Загрузка данных из localStorage
function loadBasketFromLocalStorage() {
  return JSON.parse(localStorage.getItem("basket")) || {};
}

// Удаление блюда из localStorage
function removeDishFromBasket(category) {
  const basket = loadBasketFromLocalStorage();
  delete basket[category];
  localStorage.setItem("basket", JSON.stringify(basket));
}

// Рендер списка блюд
async function renderOrderSummary() {
  const basket = loadBasketFromLocalStorage();
  const menu = await loadDishes();
  
  const orderDishesContainer = document.getElementById("order_dishes");
  const emptyOrderMessage = document.getElementById("empty_order_message");

  // Получаем данные о выбранных блюдах
  const selectedDishes = Object.keys(basket).map((category) => {
    const keyword = basket[category];
    return menu.find((dish) => dish.keyword === keyword);
  }).filter(Boolean);

  // Если ничего не выбрано, показываем сообщение
  if (selectedDishes.length === 0) {
    emptyOrderMessage.style.display = "block";
    orderDishesContainer.innerHTML = "";
    return;
  }

  emptyOrderMessage.style.display = "none";

  // Отображаем блюда
  orderDishesContainer.innerHTML = selectedDishes.map((dish) => `
    <div class="food-elem" data-category="${dish.category}">
      <img src="${dish.image}" alt="${dish.name}" />
      <p>${dish.name}</p>
      <p>${dish.price}₽</p>
      <button class="remove_dish">Удалить</button>
    </div>
  `).join("");

  // Добавляем обработчики для кнопок "Удалить"
  document.querySelectorAll(".remove_dish").forEach((button) => {
    button.addEventListener("click", (event) => {
      const category = event.target.closest(".food-elem").dataset.category;
      removeDishFromBasket(category);
      renderOrderSummary(); // Перерисовываем список блюд
    });
  });
}

// Обработка формы оформления заказа
document.getElementById("checkout_form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  if (!name || !address || !phone) {
    alert("Пожалуйста, заполните все поля формы.");
    return;
  }

  // Отправка данных на сервер (заглушка)
  console.log("Заказ оформлен:", { name, address, phone });

  // Очистка localStorage и обновление страницы
  localStorage.removeItem("basket");
  alert("Ваш заказ успешно оформлен!");
  renderOrderSummary();
});

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();
});
