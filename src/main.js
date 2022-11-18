import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const createProductList = async () => {
  const listItems = await fetchProductsList('computador');
  const listProducts = document.querySelector('.products');
  listItems.forEach((element) => {
    const listElements = createProductElement(element);
    listProducts.appendChild(listElements);
  });
};
  
window.onload = () => {
  createProductList();
};
