import './mocks/fetchSimulator';
import { fetchProductsList, fetchProduct } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';
import product from './mocks/product';
// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Verifica se fetchProductsList é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Verifica se o fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');

    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Verifica se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo', async () => {
    const productArgument = await fetchProduct('MLB1405519561');
    const expectedReturn = product;
    expect(productArgument).toEqual(expectedReturn);
  });

  it('Verifica se ao chamar a função fetchProduct sem nenhum argumento, retorna um erro com a mensagem: `ID não informado`', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});

describe('Teste a função fetchProductsList', () => {
  it('verifica se fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('verifica se fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('verifica se fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('verifica se fetch é chamado com o argumento computador e retorna um objeto igual a compuadorSearch', async () => {
    const returnedObject = await fetchProductsList('computador');
    const expectedResult = computadorSearch;
    expect(returnedObject).toEqual(expectedResult);
  });

  it('verifica se fetchProductsList fot chamado sem argumento retorna um erro com a mensagem: "Termo de busca nao informado"', async () => {
    try {
      await fetchProductsList();
    } catch (error) {
      expect(error.message).toBe('Termo de busca não informado')
    }
  })
});
