import loadDishes from "./load_dishes.js";

let menu = await loadDishes();

// Сортировка меню по имени
const sortedMenu = menu.sort((a, b) => a.name.localeCompare(b.name));

// Рендер всех категорий при загрузке страницы
function renderAllCategories(menu) {
  const categories = [...new Set(menu.map((item) => item.category))];
  categories.forEach((categoryId) => {
    const filteredMenu = menu.filter((item) => item.category === categoryId);
    renderDishes(filteredMenu, categoryId);
  });
}

// Рендер блюд конкретной категории
function renderDishes(filteredMenu, categoryId) {
  const parent = document.getElementById(categoryId);
  if (!parent) return;

  parent.innerHTML = filteredMenu
    .map(
      (dish) => `
      <div class="food-elem" data-keyword="${dish.keyword}">
        <img src="${dish.image}" alt="${dish.name}" />
        <p>${dish.name}</p>
        <p>${dish.price}₽</p>
        <button class="add_dish">Добавить</button>
      </div>
    `
    )
    .join("");
}

// Корзина для отслеживания выбранных блюд
const orderPrice = document.getElementById("order_price");

export let basket = {
  soup: { name: "", price: 0, keyword: "" },
  "main-course": { name: "", price: 0, keyword: "" },
  salad: { name: "", price: 0, keyword: "" },
  drink: { name: "", price: 0, keyword: "" },
  dessert: { name: "", price: 0, keyword: "" },
  price() {
    return (
      this.soup.price +
      this["main-course"].price +
      this.salad.price +
      this.drink.price +
      this.dessert.price
    );
  },
};

// Функции для работы с localStorage
function saveBasketToLocalStorage() {
  const basketData = Object.keys(basket).reduce((acc, category) => {
    if (category !== "price" && basket[category].name) {
      acc[category] = basket[category].keyword; // Сохраняем только keyword
    }
    return acc;
  }, {});
  localStorage.setItem("basket", JSON.stringify(basketData));
}

function loadBasketFromLocalStorage() {
  const savedBasket = JSON.parse(localStorage.getItem("basket")) || {};
  Object.keys(savedBasket).forEach((category) => {
    const keyword = savedBasket[category];
    const dish = sortedMenu.find((el) => el.keyword === keyword);
    if (dish) {
      basket[category] = { name: dish.name, price: dish.price, keyword };
      updateOrderDisplay(dish);
    }
  });
}

// Обновление отображения заказа с сохранением в localStorage
function updateOrderDisplay(dish) {
  const orderElem = document.getElementById(`${dish.category}_order`);
  if (orderElem) {
    orderElem.querySelector(".order-type-description").innerHTML =
      `${basket[dish.category].name} ${basket[dish.category].price}₽`;
    orderElem.querySelector("input").value = dish.keyword;
    orderElem.style.display = "block";
  }

  orderPrice.style.display = "block";
  orderPrice.querySelector(".order-type-description").innerHTML =
    `${basket.price()}₽`;
  orderPrice.querySelector("input").value = basket.price();

  // Сохраняем изменения в localStorage
  saveBasketToLocalStorage();
}

// Загрузка сохраненных данных при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  loadBasketFromLocalStorage();
});

// Добавление события для кнопок "Добавить"
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add_dish")) {
    const keyword = event.target.closest(".food-elem").dataset.keyword;
    const dish = sortedMenu.find((el) => el.keyword === keyword);
    if (dish) {
      basket[dish.category] = { name: dish.name, price: dish.price, keyword };
      updateOrderDisplay(dish);
    }
  }
});

// Фильтрация блюд по категориям и типам
function filterDishes(categoryId, kind = null) {
  const filteredMenu = sortedMenu.filter(
    (item) => item.category === categoryId && (!kind || item.kind === kind)
  );
  renderDishes(filteredMenu, categoryId);
}

document.querySelectorAll(".filter_button").forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const isActive = filterButton.dataset.active === "true";
    const kind = filterButton.dataset.kind;
    const categoryContainer =
      filterButton.closest(".category-container").querySelector(".dish");
    const categoryId = categoryContainer.id;

    filterDishes(categoryId, isActive ? null : kind);

    filterButton.dataset.active = !isActive;
    filterButton.classList.toggle("active_button", !isActive);

    // Сброс других кнопок фильтра
    filterButton.parentNode.querySelectorAll(".filter_button").forEach((btn) => {
      if (btn !== filterButton) {
        btn.dataset.active = false;
        btn.classList.remove("active_button");
      }
    });
  });
});

// Отображение всех блюд при загрузке страницы
renderAllCategories(sortedMenu);
