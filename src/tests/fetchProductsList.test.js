import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';
// implemente seus testes aqui
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
