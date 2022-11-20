import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {

    it('Verifica se fetchProduct é uma função', () => {
      expect(typeof fetchProduct).toBe('function');
    });

    it('Verifica se o fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
      await fetchProduct('MLB1405519561');

      expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
    });

    it('Verifica se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo', async () => {
      const api = await fetchProduct('MLB1405519561');
      const expected = product;
      expect(api).toEqual(expected);
    });

    it('Verifica se ao chamar a função fetchProduct sem nenhum argumento, retorna a mensagem de erro: `ID não informado`', async () => {
      await expect(fetchProduct()).rejects.toThrow('ID não informado');
    });
    
  });
