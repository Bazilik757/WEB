const dishes = [
    {
        img: "/images/soups/gazpacho.jpg",
        price: 195,
        name: "Гаспачо",
        keyword: "gaspacho",
        weight: "350г",
        category: "soup",
        kind: "vegetarian",
      },
      {
        img: "/images/soups/mushroom_soup.jpg",
        price: 185,
        name: "Грибной суп-пюре",
        keyword: "mushroom",
        weight: "330г",
        category: "soup", 
        kind: "vegetarian",
      },
      {
        img: "/images/soups/norwegian_soup.jpg",
        price: 270,
        name: "Норвежский суп",
        keyword: "norvezskiy",
        weight: "330г",
        category: "soup", 
        kind: "fish",
      },
      {
        img: "/images/soups/chicken.jpg",
        price: 330,
        name: "Куриный суп",
        keyword: "chicken_soup",
        weight: "350г",
        category: "soup", 
        kind: "meat",
      },
      {
        img: "/images/soups/ramen.jpg",
        price: 375,
        name: "Рамен",
        keyword: "ramen",
        weight: "425г",
        category: "soup", 
        kind: "meat",
      },
      {
        img: "/images/soups/tomyum.jpg",
        price: 650,
        name: "Том ям с креветками",
        keyword: "ramen",
        weight: "500г",
        category: "soup", 
        kind: "fish",
      },
      {
        img: "/images/main_course/friedpotatoeswithmushrooms1.jpg",
        price: 150,
        name: "Жареная картошка с грибами",
        keyword: "friedpotato",
        weight: "210г",
        category: "main_dish", 
        kind: "vegetarian"
      },
      {
        img: "/images/main_course/lasagna.jpg",
        price: 385,
        name: "Лазанья",
        keyword: "lasagna",
        weight: "310г",
        category: "main_dish", 
        kind: "meat"
      },
      {
        img: "/images/main_course/chickencutletsandmashedpotatoes.jpg",
        price: 225,
        name: "Котлеты из курицы с картофельным пюре",
        keyword: "chicken",
        weight: "280г",
        category: "main_dish",
        kind: "meat" 
      },
      {
        img: "/images/main_course/fishrice.jpg",
        price: 320,
        name: "Рыбная котлета с рисом и спаржей",
        keyword: "fishrice",
        weight: "270г",
        category: "main_dish", 
        kind: "fish"
      },
      {
        img: "/images/main_course/pizza.jpg",
        price: 450,
        name: "Пицца Маргарита",
        keyword: "pizza",
        weight: "470г",
        category: "main_dish",
        kind: "vegetarian" 
      },
      {
        img: "/images/main_course/shrimppasta.jpg",
        price: 340,
        name: "Паста с креветками",
        keyword: "shrimppasta",
        weight: "280г",
        category: "main_dish", 
        kind: "fish"
      },
      {
        img: "/images/salads_starters/caesar.jpg",
        price: 370,
        name: "Цезарь с цыпленком",
        keyword: "caesar",
        weight: "220г",
        category: "salad_starter",
        kind: "meat"
      },
      {
        img: "/images/salads_starters/caprese.jpg",
        price: 350,
        name: "Капрезе с моцареллой",
        keyword: "caprese",
        weight: "235г",
        category: "salad_starter", 
        kind: "vegetarian"
      },
      {
        img: "/images/salads_starters/frenchfries1.jpg",
        price: 280,
        name: "Картофель фри с соусом Цезарь",
        keyword: "frenchfries_caesar",
        weight: "235г",
        category: "salad_starter", 
        kind: "vegetarian"
      },
      {
        img: "/images/salads_starters/frenchfries2.jpg",
        price: 260,
        name: "Картофель фри с кетчупом",
        keyword: "frenchfries",
        weight: "235г",
        category: "salad_starter", 
        kind: "vegetarian"
      },
      {
        img: "/images/salads_starters/saladwithegg.jpg",
        price: 330,
        name: "Корейский салат с овощами и яйцом",
        keyword: "saladwithegg",
        weight: "250г",
        category: "salad_starter",
        kind: "vegetarian" 
      },
      {
        img: "/images/salads_starters/tunasalad.jpg",
        price: 480,
        name: "Салат с тунцом",
        keyword: "tunasalad",
        weight: "250г",
        category: "salad_starter", 
        kind: "fish"
      },
      {
        img: "/images/beverages/applejuice.jpg",
        price: 90,
        name: "Яблочный сок",
        keyword: "apple_juice",
        weight: "300мл",
        category: "juice", 
        kind: "cold"
      },
      {
        img: "/images/beverages/carrotjuice.jpg",
        price: 110,
        name: "Морковный сок",
        keyword: "carrot_juice",
        weight: "300мл",
        category: "juice", 
        kind: "cold"
      },
      {
        img: "/images/beverages/orangejuice.jpg",
        price: 120,
        name: "Апельсиновый сок",
        keyword: "orange_juice",
        weight: "300мл",
        category: "juice", 
        kind: "cold"
      },
      {
        img: "/images/beverages/cappuccino.jpg",
        price: 180,
        name: "Капучино",
        keyword: "capuccino",
        weight: "300мл",
        category: "juice", 
        kind: "hot"
      },
      {
        img: "/images/beverages/greentea.jpg",
        price: 100,
        name: "Зеленый чай",
        keyword: "greentea",
        weight: "300мл",
        category: "juice", 
        kind: "hot"
      },
      {
        img: "/images/beverages/tea.jpg",
        price: 90,
        name: "Черный чай",
        keyword: "tea",
        weight: "300мл",
        category: "juice", 
        kind: "hot"
      },
      {
        img: "/images/desserts/baklava.jpg",
        price: 220,
        name: "Пахлава",
        keyword: "paklava",
        weight: "300гр",
        category: "dessert", 
        kind: "average"
      },
      {
        img: "/images/desserts/checheesecake.jpg",
        price: 240,
        name: "Чизкейк",
        keyword: "checheesecake",
        weight: "125гр",
        category: "dessert", 
        kind: "small"
      },
      {
        img: "/images/desserts/chocolatecake.jpg",
        price: 270,
        name: "Шоколадный торт",
        keyword: "chocolatecake",
        weight: "140гр",
        category: "dessert", 
        kind: "small"
      },
      {
        img: "/images/desserts/chocolatecheesecake.jpg",
        price: 260,
        name: "Шоколадный чизкейк",
        keyword: "chocolatecheesecake",
        weight: "125гр",
        category: "dessert",
        kind: "small" 
      },
      {
        img: "/images/desserts/donuts.jpg",
        price: 650,
        name: "Пончики (6 штук)",
        keyword: "donuts6",
        weight: "700гр",
        category: "dessert", 
        kind: "big"
      },
      {
        img: "/images/desserts/donuts2.jpg",
        price: 410,
        name: "Пончики (3 штуки)",
        keyword: "donuts3",
        weight: "700гр",
        category: "dessert", 
        kind: "average"
      }
];


export default dishes;