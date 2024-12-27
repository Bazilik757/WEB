import { loadDishes, loadServer}  from "./load_dishes.js";
import { notificFoo } from "./notifications.js";
export let menu = await loadDishes();

for (let elem of menu) {
  let dish = localStorage.getItem(elem.category);
  if (dish == elem.id) {
    let dishElem = document.createElement("div");
    dishElem.classList.add('dish_elem');
    dishElem.dataset.dish = elem.category;

    let img = document.createElement('img');
    img.src = elem.image;
    img.alt = elem.category;
    dishElem.appendChild(img);

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerHTML = elem.price + "&#8381";
    dishElem.appendChild(price);

    let name = document.createElement('p');
    name.classList.add('name');
    name.innerHTML = elem.name;
    dishElem.appendChild(name);

    let weight = document.createElement('p');
    weight.classList.add('weight');
    weight.innerHTML = elem.count;
    dishElem.appendChild(weight);

    let button = document.createElement('button');
    button.classList.add('delete_dish');
    button.innerHTML = "Удалить";
    dishElem.appendChild(button);

    let parent = document.getElementById('order_content');
    parent.appendChild(dishElem);
  }
}

let price = {
  "soup": 0,
  "main-course": 0,
  "salad": 0,
  "drink": 0,
  "dessert": 0,
  summ: function () {
    return this["soup"] + this["main-course"] + this["salad"] + this["drink"] +this["dessert"]
  }
}

export let bin = {
  "soup": '',
  "main-course": '',  
  "salad": '',
  "drink": '',
  "dessert": ''
}

const order_price = document.getElementById('order_price');
const no_order = document.getElementById('no_dishes');
const orders = document.getElementById('orders');
const no_order_content = document.getElementById('no_order_content');

for (const elem of document.getElementsByClassName('dish_elem')) {
  const arr = Array.from(elem.childNodes);
  const type_of_food = elem.dataset.dish;
  price[type_of_food] = Number(Array.from(arr[1].textContent).slice(0, -1).join(''));
  document.getElementById(`no_${type_of_food}`).innerHTML = arr[2].textContent + " " + price[type_of_food] + "&#8381";
  order_price.innerHTML = price.summ() + "&#8381";
  
  document.getElementById(`order_${type_of_food}_value`).value = arr[2].textContent;
  document.getElementById('order_price_value').value = price.summ();
  bin[type_of_food] = '1';
  
};

for (const el of document.getElementsByClassName('delete_dish')){
  el.addEventListener('click', () => {
    let dishCategory = el.parentNode.dataset.dish;
    localStorage.removeItem(dishCategory);
    el.parentElement.remove();
    document.getElementById(`no_${dishCategory}`).innerHTML = "Блюдо не выбрано";
    price[dishCategory] = 0;
    order_price.innerHTML = price.summ() + "&#8381";
    bin[dishCategory] = '';
    
    if(price.summ() == 0) {
      no_order.hidden = false;
      orders.hidden = true;
      no_order_content.innerHTML = "Ничего не выбрано";
    }
   })
}

if(price.summ() != 0) {
  no_order.hidden = true;
}

if(price.summ() == 0) {
  orders.hidden = true;
  no_order_content.innerHTML = "Ничего не выбрано";
}

const submit_button = document.getElementById('submit_button');
submit_button.addEventListener('click', async (e) => {
  e.preventDefault();
  if(!notificFoo(e)) {
    return;
  }
  const form_data = new FormData(document.getElementById('form_data'));
  const data = {
    full_name: form_data.get('name'),
    email: form_data.get('email'),
    subscribe: form_data.get('information') === 'on',
    phone: form_data.get('phone'),
    delivery_address: form_data.get('address'),
    delivery_type: form_data.get('time'),
    delivery_time: form_data.get('time_delivery'),
    comment: form_data.get('comments'),
    soup_id: localStorage.getItem('soup') == null ? "" : localStorage.getItem('soup'),
    main_course_id: localStorage.getItem('main-course') == null ? "" : localStorage.getItem('main-course'),
    salad_id: localStorage.getItem('salad') == null ? "" : localStorage.getItem('salad'),
    drink_id: localStorage.getItem('drink') == null ? "" : localStorage.getItem('drink'),
    dessert_id: localStorage.getItem('dessert') == null ? "" : localStorage.getItem('dessert')
  }
  const ans = await loadServer(data)
  console.log(ans);
  location.reload();
})