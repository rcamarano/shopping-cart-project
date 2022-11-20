import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const container = document.querySelector('.products');
const createParagraph = document.createElement('p');
const errorAlert = document.createElement('h1');

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

const prductsButton = document.querySelector('.products');
prductsButton.addEventListener('click', async (event) => {
  console.log(event.target.parentNode.firstChild.innerText);
  const productId = event.target.parentNode.firstChild.innerText;
  saveCartID(productId);
  const result = await fetchProduct(productId);
  const getList = document.querySelector('.cart__products');
  getList.appendChild(createCartProductElement(result));
});

const recoverdItem = () => {
  getSavedCartIDs().map((elementId) => Promise.all([fetchProduct(elementId)])
    .then((response) => response.map((element) => {
      const getList = document.querySelector('.cart__products');
      return getList.appendChild(createCartProductElement(element));
    })));
};

window.onload = () => {
  createProductList();
  recoverdItem();
};
