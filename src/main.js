import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

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

window.onload = () => {
  createProductList();
};
