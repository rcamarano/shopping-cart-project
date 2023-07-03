const cartAddress = document.querySelector('.cart__address');

export const getAddress = async (cep) => {
  const cepResponse = await Promisse.any([
    fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
  ]);
  const { logradouro, bairro, localidade, uf,
    address, district, city, state,
  } = await cepResponse.json();

  return {
    rua: logradouro || address,
    bairro: bairro || district,
    cidade: localidade || city,
    estado: uf || state,
  };
};

export const searchCep = async () => {
  const cepValue = 8;

  const { value } = document.querySelector('.cep-input');
  if (value.length !== cepValue) return;
  try {
    const fullAddress = await getAddress(value);
    const { address, district, city, state } = fullAddress;
    const result = `${address} - ${district} - ${city} - ${state}`;
    cartAddress.innerHTML = result;
  } catch (e) {
    cartAddress.innerHTML = 'CEP não encontrado';
  }
};
