import { loadOrders, loadDishes } from "./load_dishes.js";

// Загружаем данные
let menu = await loadDishes();
let orders = await loadOrders();

// Сортируем заказы по дате создания (новые сверху)
orders.sort((a, b) => b.created_at - a.created_at);

// Функция для форматирования даты
function formatDate(dateString) {
  let date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// Функция для создания ячейки таблицы
function createCell(content, options = {}) {
  let cell = document.createElement('td');
  if (typeof content === 'string' || typeof content === 'number') {
    cell.innerHTML = content;
  } else {
    cell.appendChild(content);
  }
  if (options.style) {
    Object.assign(cell.style, options.style);
  }
  return cell;
}

// Функция для создания кнопки действия
function createActionButton(className, iconSrc, dataId) {
  let button = document.createElement('button');
  button.classList.add(className);
  button.dataset.idi = dataId;

  let icon = document.createElement('img');
  icon.classList.add('action_img');
  icon.src = iconSrc;

  button.appendChild(icon);
  return button;
}

// Создаем фрагмент для оптимизации работы с DOM
let fragment = document.createDocumentFragment();

orders.forEach((order, index) => {
  let dishElem = document.createElement("tr");

  // Номер заказа
  dishElem.appendChild(createCell(index + 1));

  // Дата заказа
  dishElem.appendChild(createCell(formatDate(order.created_at)));

  // Содержимое заказа
  let dishes = [];
  let totalSum = 0;
  
  for (let item of menu) {
    if ([order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id].includes(item.id)) {
      dishes.push(item.name);
      totalSum += item.price;
    }
  }

  dishElem.appendChild(createCell(dishes.join(', '), { style: { textAlign: 'left', paddingLeft: '3rem' } }));

  // Цена заказа
  dishElem.appendChild(createCell(`${totalSum}&#8381`));

  // Время доставки
  let deliveryTimeText = order.delivery_type === "now" 
    ? "Как можно скорее (с 7:00 до 23:00)" 
    : order.delivery_time.slice(0, 5);
    
  dishElem.appendChild(createCell(deliveryTimeText));

  // Действия
  let actionCell = document.createElement('td');
  actionCell.classList.add('action');

  actionCell.appendChild(createActionButton('see_order', '/icons/eye.svg', order.id));
  actionCell.appendChild(createActionButton('edit_order', '/icons/pencil.svg', order.id));
  actionCell.appendChild(createActionButton('del_order', '/icons/trash3.svg', order.id));

  dishElem.appendChild(actionCell);

  fragment.appendChild(dishElem);
});

// Добавляем все элементы в таблицу одним действием
document.getElementById('order_history').appendChild(fragment);


// кнопка Удалить
const delOrder = document.getElementsByClassName('del_order');
const modalBackDel = document.getElementsByClassName('modalBack')[0];
const yesBut = document.getElementById('yes');
for (const el of delOrder) {
  el.addEventListener('click', () => {
    modalBackDel.style.display = 'block';
    yesBut.addEventListener('click', async () => {
      try {
        let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=4a9777a8-af92-4a45-a4a9-40e6d80b31a6`, {
          method: "DELETE"
        });
        modalBackDel.style.display = 'none';
        location.reload();
      } catch (e) {
        alert(e);
      }
      setTimeout(() => {alert("Заказ успешно удален")}, 0);
    })    
  })
}

for (const cancelBut of document.getElementsByClassName('cancel')) {
  cancelBut.addEventListener('click', () => {
    modalBackDel.style.display = 'none';
    modalBackEdit.style.display = 'none';
  })
}

//кнопка просмотра
const seeOrder = document.getElementsByClassName('see_order');
const modalBackSee = document.getElementsByClassName('modalBack')[1];
for (const el of seeOrder) {
  el.addEventListener('click', async () => {
    try {
      let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=4a9777a8-af92-4a45-a4a9-40e6d80b31a6`);
      let order = await responce.json();
      let date = new Date (order.created_at);
      document.getElementById('date').innerHTML = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      document.getElementById('name').innerHTML = order.full_name;
      document.getElementById('address').innerHTML = order.delivery_address;
      if (order.delivery_type == "now") {
        document.getElementById('time').innerHTML = "Как можно скорее (с 7:00 до 23:00)";
      } else {
        document.getElementById('time').innerHTML = order.delivery_time.slice(0, 5);
      }
      document.getElementById('phone').innerHTML = order.phone;
      document.getElementById('email').innerHTML = order.email;
      document.getElementById('comment').innerHTML = order.comment;
      let summ = 0;
      for (let elem of menu) {
        if(elem.id == order.soup_id || elem.id == order.main_course_id || elem.id == order.salad_id || elem.id == order.drink_id || elem.id == order.dessert_id) {
          document.getElementById(`${elem.category}`).innerHTML = elem.name + ' (' + elem.price + '&#8381)';
          document.getElementById(`${elem.category}-name`).style.display = 'block';
          document.getElementById(`${elem.category}`).style.display = 'block';
          summ += elem.price;
        }
      }   
      document.getElementById('price').innerHTML = "Стоимость: " + summ + "&#8381";
      modalBackSee.style.display = 'block';
    } catch (e) {
      alert(e);
    }
  })
}

const okBut = document.getElementById('ok');
okBut.addEventListener('click', () => {
  modalBackSee.style.display = 'none';
  for (let elem of menu) {
    document.getElementById(`${elem.category}`).style.display = 'none';
    document.getElementById(`${elem.category}-name`).style.display = 'none';
  }
})

//кнопка редакатировать
const editOrder = document.getElementsByClassName('edit_order');
const modalBackEdit = document.getElementsByClassName('modalBack')[2];
for (const el of editOrder) {
  el.addEventListener('click', async () => {
    let responce = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=4a9777a8-af92-4a45-a4a9-40e6d80b31a6`);
    let order = await responce.json();
    let date = new Date (order.created_at);
    document.getElementById('date-input').innerHTML = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    document.getElementById('name-input').value = order.full_name;
    document.getElementById('address-input').value = order.delivery_address;
    if (order.delivery_type == "now") {
      document.getElementById('time-input-const').innerHTML = "Как можно скорее (с 7:00 до 23:00)";
      document.getElementById('time-input').style.display = 'none';
      document.getElementById('time-input-const').style.display = 'block';
    } else {
      document.getElementById('time-input').value = order.delivery_time;
      document.getElementById('time-input-const').style.display = 'none';
      document.getElementById('time-input').style.display = 'block';
    }
    document.getElementById('phone-input').value = order.phone;
    document.getElementById('email-input').value = order.email;
    document.getElementById('comment-input').value = order.comment;
    let summ = 0;
    for (let elem of menu) {
      if(elem.id == order.soup_id || elem.id == order.main_course_id || elem.id == order.salad_id || elem.id == order.drink_id || elem.id == order.dessert_id) {
        document.getElementById(`${elem.category}-`).innerHTML = elem.name + ' (' + elem.price + '&#8381)';
        document.getElementById(`${elem.category}-dish`).style.display = 'block';
        document.getElementById(`${elem.category}-`).style.display = 'block';
        summ += elem.price;
      }
    }   
    document.getElementById('price-input').innerHTML = "Стоимость: " + summ + "&#8381";
    modalBackEdit.style.display = 'block';
    const saveBut = document.getElementById('save');
      saveBut.addEventListener('click', async() => {
      const data = {
        full_name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        phone: document.getElementById('phone-input').value,
        delivery_address: document.getElementById('address-input').value,
        delivery_time: document.getElementById('time-input').value,
        comment: document.getElementById('comment-input').value,
      }
      try {
      const formData = new FormData();
      formData.append('full_name', data.full_name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('delivery_address', data.delivery_address);
      formData.append('delivery_time', data.delivery_time);
      formData.append('comment', data.comment);
      let response = await fetch(`https://edu.std-900.ist.mospolytech.ru/labs/api/orders/${el.dataset.idi}?api_key=4a9777a8-af92-4a45-a4a9-40e6d80b31a6`, {
        method: "PUT",
        body: formData, 
      });
      const ans = await response.json();
        if(response.status == 422) {
          throw new Error(ans.error);
        }
      }catch (e) {
        alert(e);
      }
      modalBackEdit.style.display = 'none';
      setTimeout(() => {alert("Заказ успешно изменен")}, 0);
    })
  })  
}

// кнопка крестик
for (let butX of document.getElementsByClassName('x')){
  butX.addEventListener('click', () => {
    modalBackSee.style.display = 'none';
    modalBackDel.style.display = 'none';
    modalBackEdit.style.display = 'none';
    for (let elem of menu) {
      document.getElementById(`${elem.category}`).style.display = 'none';
      document.getElementById(`${elem.category}-name`).style.display = 'none';
      document.getElementById(`${elem.category}-dish`).style.display = 'none';
      document.getElementById(`${elem.category}-`).style.display = 'none';
    }
  })
}