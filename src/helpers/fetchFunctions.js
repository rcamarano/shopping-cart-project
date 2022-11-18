export const fetchProduct = async (param) => {
  if (param !== undefined) {
    const url = `https://api.mercadolibre.com/items/${param}`;
    const json = await (await fetch(url).then((resp) => resp.json()));
    return json;
  }
  return Promise.reject(Error('ID não informado'));
};

export const fetchProductsList = async (product) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  if (!product) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results;
};
