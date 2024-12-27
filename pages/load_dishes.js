const loadDishes = async () => {
  let response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
  let menu = await response.json();
  return menu;
}

export default loadDishes;
  
  