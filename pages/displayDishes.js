import { loadDishes }  from "./load_dishes.js";
export let menu = await loadDishes();

menu.sort((a, b) => a.name > b.name ? 1 : -1);

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

function makeOrder () {
  if (price["soup"] != 0) {
    if (price["main-course"] != 0) {
      if (price["salad"] != 0) {
        if (price["drink"] != 0) {
          make_order_button.disabled = false;
        }
        else {
          make_order_button.disabled = true;
        }
      }
      else {
        if(price["drink"] != 0) {
          make_order_button.disabled = false;
        }
        else {
          make_order_button.disabled = true;
        }
      }
    }
    else {
      if(price["salad"] != 0) {
        if (price["drink"] != 0) {
          make_order_button.removeAttribute("disabled");
        }
        else {
          make_order_button.setAttribute("disabled", "");
        }
      }
      else {
        make_order_button.setAttribute("disabled", "");
      }
    }
  }
      
  if (price["main-course"] != 0) {
    if (price["salad"] != 0) {
      if (price["drink"] != 0) {
        make_order_button.removeAttribute("disabled");
      }
      else {
        make_order_button.setAttribute("disabled", "");
      }
    }
    else {
      if (price["drink"] != 0) {
        make_order_button.removeAttribute("disabled");
      }
      else {
        make_order_button.setAttribute("disabled", "");
      }
    }
  }
  
}


let i = 1;
const make_order_button = document.getElementById('make_order_button');
const addInOrder = () => {
  for(const elem of document.getElementsByClassName('dish_elem')) {
    elem.addEventListener('click', () => {
      const arr = Array.from(elem.childNodes);
      const type_of_food = elem.dataset.dish;
      price[type_of_food] = Number(Array.from(arr[1].textContent).slice(0, -1).join(''));
      document.getElementById('make_order_price').innerHTML = "Итого: " + price.summ() + "&#8381";
      for (let el of menu) {
        if (el.name == arr[2].textContent) {
          localStorage.setItem(`${el.category}`, el.id); 
          i++;
        }
      }
      document.getElementById('make_order').style.display = 'flex';
      makeOrder();
    })
  };
}

function rend (paramMenu=menu, paramCategory='') {
  for (let i = 0; i < paramMenu.length; i++) {
    let dishElem = document.createElement("div");
    dishElem.classList.add('dish_elem');
    dishElem.dataset.dish = paramMenu[i].category;

    let img = document.createElement('img');
    img.src = paramMenu[i].image;
    img.alt = paramMenu[i].category;
    dishElem.appendChild(img);

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerHTML = paramMenu[i].price + "&#8381";
    dishElem.appendChild(price);

    let name = document.createElement('p');
    name.classList.add('name');
    name.innerHTML = paramMenu[i].name;
    dishElem.appendChild(name);

    let weight = document.createElement('p');
    weight.classList.add('weight');
    weight.innerHTML = paramMenu[i].count;
    dishElem.appendChild(weight);

    let button = document.createElement('button');
    button.classList.add('add_dish');
    button.innerHTML = "Добавить";
    dishElem.appendChild(button);

    let parent = document.getElementById(`dish_${paramCategory === '' ? paramMenu[i].category : paramCategory}`);
    parent.appendChild(dishElem);
  }
  addInOrder();
}

rend();

for(const elem of document.getElementsByClassName('filter_button')) {
  elem.addEventListener('click', () => {
    const isActive = elem.dataset.active;
    const kind = elem.dataset.kind;
    const category = elem.parentElement.parentElement.getElementsByClassName('dish')[0].id.split('').slice(5).join('');
    const parent = document.getElementById(`dish_${category}`);
    Array.from(parent.getElementsByClassName('dish_elem')).forEach((el) => parent.removeChild(el));
    if (isActive === "false") {
      const filteredElems = menu.filter((el) => el.category === category && el.kind === kind);      
      rend(filteredElems, category);
      Array.from(parent.parentElement.getElementsByClassName('active_button')).forEach((el) => {
        el.classList.remove('active_button');
        el.dataset.active = "false";
      });
      elem.dataset.active = 'true';
      elem.classList.add('active_button');
    } else {
      const filteredElems = menu.filter((el) => el.category === category);
      rend(filteredElems, category);
      elem.dataset.active = 'false';
      elem.classList.remove('active_button');
    }
  })
}

if (localStorage.length != 0) {
  document.getElementById('make_order').style.display = 'flex';
  for (let el of menu) {
    let dish = localStorage.getItem(el.category);
    if (dish == el.id) {
    let type_of_food = el.category;
    price[type_of_food] = el.price;
    }
    document.getElementById('make_order_price').innerHTML = "Итого: " + price.summ() + "&#8381";
    
  }
}

makeOrder();

