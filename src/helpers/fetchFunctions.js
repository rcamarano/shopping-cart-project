export const fetchProduct = () => {
  // seu código aqui
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
