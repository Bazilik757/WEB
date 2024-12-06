import menu from "./menu-data.js";

// Sort menu items by name
const sortedMenu = menu.sort((a, b) => (a.name > b.name ? 1 : -1));

// Create and append dish elements
for (let i = 0; i < sortedMenu.length; i++) {
  let dishElem = document.createElement("div");
  dishElem.classList.add("food-elem");
  dishElem.dataset.keyword = sortedMenu[i].keyword;

  // Create image
  let img = document.createElement("img");
  img.src = sortedMenu[i].img;
  img.alt = sortedMenu[i].category;
  dishElem.appendChild(img);

  // Create price paragraph
  let price = document.createElement("p");
  price.classList.add("price");
  price.innerHTML = `${sortedMenu[i].price}&#8381`;
  dishElem.appendChild(price);

  // Create name paragraph
  let name = document.createElement("p");
  name.classList.add("name");
  name.innerHTML = sortedMenu[i].name;
  dishElem.appendChild(name);

  // Create weight span
  let weight = document.createElement("span");
  weight.classList.add("weight");
  weight.innerHTML = sortedMenu[i].weight;
  dishElem.appendChild(weight);

  // Create "Add" button
  let button = document.createElement("button");
  button.classList.add("add_dish");
  button.innerHTML = "Добавить";
  dishElem.appendChild(button);

  // Append dish element to parent category element
  let parent = document.getElementById(`${sortedMenu[i].category}`);
  if (parent) {
    parent.appendChild(dishElem);
  }
}

// Basket object to track selected items
const orderPrice = document.getElementById("order_price");

let busket = {
  soup: { name: "", price: 0 },
  main_dish: { name: "", price: 0 },
  juice: { name: "", price: 0 },
  price: function () {
    return this.soup.price + this.main_dish.price + this.juice.price;
  },
};

// Add event listeners to buttons
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add_dish")) {
    const keyword = event.target.parentElement.dataset.keyword;
    const dish = sortedMenu.find((el) => el.keyword === keyword);
    if (dish) {
      busket[dish.category] = { name: dish.name, price: dish.price };

      const orderElem = document.getElementById(`${dish.category}_order`);
      if (orderElem) {
        orderElem.getElementsByClassName("order-type-description")[0].innerHTML =
          `${busket[dish.category].name} ${busket[dish.category].price}&#8381;`;

        orderElem.getElementsByClassName("order-type-description")[1].value =
          keyword;

        orderElem.style.display = "block";
      }

      orderPrice.style.display = "block";
      orderPrice.getElementsByClassName(
        "order-type-description"
      )[0].innerHTML = `${busket.price()}&#8381;`;
      orderPrice.getElementsByClassName(
        "order-type-description"
      )[1].value = busket.price();
    }
  }
});
