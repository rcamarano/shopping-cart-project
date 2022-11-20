import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const container = document.querySelector('.products');
const createParagraph = document.createElement('p');
const errorAlert = document.createElement('h1');
const getList = document.querySelector('.cart__products');

const createErrorAlert = () => {
  errorAlert.className = 'error';
  errorAlert.textContent = 'Algum erro ocorreu, recarregue a página e tente novamente';
  container.appendChild(errorAlert);
};

const createLoading = () => {
  container.appendChild(createParagraph);
  createParagraph.className = 'loading';
  createParagraph.textContent = 'carregando...';
};

const stopLoading = () => {
  createParagraph.remove();
};

const createProductList = async () => {
  createLoading();
  try {
    const listItems = await fetchProductsList('computador');
    stopLoading();
    const listProducts = document.querySelector('.products');
    listItems.forEach((element) => {
      const listElements = createProductElement(element);
      listProducts.appendChild(listElements);
    });
  } catch (error) {
    stopLoading();
    createErrorAlert();
  }
};

const getTotalPrice = document.querySelector('.total-price');

const sumTotalPrices = () => {
  let sum = 0;
  getSavedCartIDs().map((elementId) => Promise.all([fetchProduct(elementId)])
    .then((response) => {
      sum += response[0].price;
      getTotalPrice.textContent = sum.toFixed(2);
      localStorage.setItem('cartPrice', sum.toFixed(2));
    }));
};

getList.addEventListener('click', (event) => {
  console.log(event.target.innerText);
  const sub = event.target.parentNode.lastElementChild.lastElementChild.innerHTML;
  const number1 = Number(sub);
  const number2 = Number(getTotalPrice.innerHTML);
  const result = number2 - number1;
  getTotalPrice.innerHTML = '';
  getTotalPrice.innerHTML = result;
});

const prductsButton = document.querySelector('.products');

prductsButton.addEventListener('click', async (event) => {
  console.log(event.target.parentNode.firstChild.innerText);
  const productId = event.target.parentNode.firstChild.innerText;

  saveCartID(productId);
  const result = await fetchProduct(productId);
  getList.appendChild(createCartProductElement(result));
  sumItems();
});

const recoverdItem = () => {
  getSavedCartIDs().map((elementId) => Promise.all([fetchProduct(elementId)])
    .then((response) => response.map((element) => getList
      .appendChild(createCartProductElement(element)))));
};
};

window.onload = () => {
  createProductList();
  sumTotalPrices();
  recoverdItem();
};
