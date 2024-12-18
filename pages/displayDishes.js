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
  soup: { name: "", price: 0, image: "" },
  "main-course": { name: "", price: 0, image: "" },
  salad: { name: "", price: 0, image: "" },
  drink: { name: "", price: 0, image: "" },
  dessert: { name: "", price: 0, image: "" },
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


// Функция для сохранения текущего состояния корзины в localStorage
function saveBasketToLocalStorage() {
  const basketData = {
      soup: basket.soup.name ? basket.soup : null,
      "main-course": basket["main-course"].name ? basket["main-course"] : null,
      salad: basket.salad.name ? basket.salad : null,
      drink: basket.drink.name ? basket.drink : null,
      dessert: basket.dessert.name ? basket.dessert : null,
  };
  localStorage.setItem("basket", JSON.stringify(basketData));
}
// Функция для загрузки корзины из localStorage
function loadBasketFromLocalStorage() {
  const savedBasket = JSON.parse(localStorage.getItem("basket"));
  if (savedBasket) {
    Object.keys(savedBasket).forEach((key) => {
      if (savedBasket[key]) {
        basket[key] = savedBasket[key]; // Восстанавливаем все данные, включая image
        updateOrderDisplay({ category: key, ...savedBasket[key] });
      }
    });
  }
}


// Обновление отображения заказа
function updateOrderDisplay(dish) {
  const orderElem = document.getElementById(`${dish.category}_order`);
  if (orderElem) {
    orderElem.querySelector(".order-type-description").innerHTML = 
      `<img src="${basket[dish.category].image}" alt="${basket[dish.category].name}" style="width:50px; height:auto;"> 
       ${basket[dish.category].name} ${basket[dish.category].price}₽`;
    orderElem.querySelector("input").value = dish.keyword;
    orderElem.style.display = "block";
  }

  orderPrice.style.display = "block";
  orderPrice.querySelector(".order-type-description").innerHTML =
    `${basket.price()}₽`;
  orderPrice.querySelector("input").value = basket.price();
}


document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add_dish")) {
    const keyword = event.target.closest(".food-elem").dataset.keyword;
    const dish = sortedMenu.find((el) => el.keyword === keyword);
    if (dish) {
      // Сохраняем название, цену и путь к изображению
      basket[dish.category] = { 
        name: dish.name, 
        price: dish.price, 
        image: dish.image 
      };
      
      updateOrderDisplay(dish);
      saveBasketToLocalStorage(); // Сохраняем изменения в localStorage
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
// Загрузка состояния корзины при старте страницы
loadBasketFromLocalStorage();

// Отображение всех блюд при загрузке страницы
renderAllCategories(sortedMenu);
