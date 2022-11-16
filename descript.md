Iniciando leitura do projeto

1. (TDD) Desenvolva testes de no mínimo 50% de cobertura das funções e linhas do arquivo fetchFunctions
    - Testar se a fetchProductsList é uma função
        usar o describe pra saber se
        it(verificar se o fetchProductsList é uma função)
        verificar qual o matcher correto. toBe(function) ou typeOff(function) ou algum outro.
    - TEstar se ao passar 'computador' como parametro se o fetch é cgamado e traz um computador da API
        it(verifica se o fetch retorna um computador da API ao passar 'computador' como parametro) toEqual(computador)
    -  Testar se ao chamar o fetch, retorna o end point = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
        it(Verifica se o fetch retorna o endpoint correto da API) toEqual(https://api.mercadolibre.com/sites/MLB/search?q=computador)
    -  Testar se, ao passar o 'computador' como argumento retorna um objeto igual ao computadorSearch já importado
        it(verifica se ao passar 'computador' como argumento, o fetch retorna um objeto igual ao computadorSearch) toEqual(computadorSearch).
    -  Testar se ao não passar nenhum parametro retorna um erro com a mesagem 'Termo de busca não informado'    
        it(Verifica se ratona a mensagem de erro ao não passar nehum parametro) toEqual('Termo de busca não informado').

2. Implemente a função fetchProductsList
    - Implementar a função fetchProductsList. Ela deve:
        Retronar um erro caso não seja passado nenhum parametro = throw new error() com a mensagem 'Termo de busca não informado'
        Chamar a API com o endpoint correto
        Retorna o array[] de produtos da API        