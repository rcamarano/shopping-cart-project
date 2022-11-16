import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductList } from './helpers/cepFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
