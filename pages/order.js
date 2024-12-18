// Загрузка данных из localStorage
function loadOrderFromLocalStorage() {
    const savedOrder = JSON.parse(localStorage.getItem("basket"));
    return savedOrder || {};
}

// Отображение состава заказа
function renderOrderSummary(order) {
    const orderItemsContainer = document.getElementById("order-items");
    const emptyMessage = document.getElementById("empty-order-message");
    orderItemsContainer.innerHTML = ""; // Очищаем контейнер

    let totalPrice = 0;

    Object.keys(order).forEach((key) => {
        if (order[key]) {
            const item = order[key];
            totalPrice += item.price;

            // Создаем карточку блюда
            const itemCard = document.createElement("div");
            itemCard.classList.add("order-item");
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>${item.price}₽</p>
                <button data-category="${key}" class="remove-item">Удалить</button>`;
            
            orderItemsContainer.appendChild(itemCard);
        }
    });

    // Если ничего не выбрано, показываем сообщение
    if (totalPrice === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }

    // Обновляем итоговую стоимость
    document.getElementById("total-price").textContent = `${totalPrice}₽`;
}


// Удаление блюда из заказа
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const category = event.target.dataset.category;

        // Удаляем из localStorage и обновляем отображение
        const order = loadOrderFromLocalStorage();
        delete order[category];
        localStorage.setItem("basket", JSON.stringify(order));
        
        renderOrderSummary(order);
    }
});

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
    const order = loadOrderFromLocalStorage();
    renderOrderSummary(order);
});
