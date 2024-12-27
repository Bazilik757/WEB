const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '4a9777a8-af92-4a45-a4a9-40e6d80b31a6';

// Функция загрузки списка блюд
export const loadDishes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dishes`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки блюд: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Функция отправки заказа на сервер
export const loadServer = async (params) => {
  try {
    const formData = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => formData.append(key, value));

    const response = await fetch(`${API_BASE_URL}/orders?api_key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const result = await response.json();
    if (response.status === 422) {
      throw new Error(result.error);
    }

    localStorage.clear();
    return result;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Функция загрузки списка заказов
export const loadOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки заказов: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
