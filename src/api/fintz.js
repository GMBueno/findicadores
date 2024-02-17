// src/api/stockService.js

const BASE_URL = 'https://api.fintz.com.br'
const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }

class Fintz {
  static async getFintzIndicadores(ticker) {
    const PARAMS = new URLSearchParams({ ticker: ticker.toUpperCase() });
    
    const endpoint = `${BASE_URL}/bolsa/b3/avista/indicadores/por-ticker?${PARAMS.toString()}`;
    
    try {
      const response = await fetch(endpoint, { headers: HEADERS });
      const data = await response.json();
      return data; // Return the fetched data for further processing
    } catch (error) {
      console.error("Failed to fetch stock indicators:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async getFintzItensContabeis(ticker) {
    const PARAMS = new URLSearchParams({ ticker: ticker.toUpperCase() });

    const endpoint = `${BASE_URL}/bolsa/b3/avista/itens-contabeis/por-ticker?${PARAMS.toString()}`;

    try {
      const response = await fetch(endpoint, { headers: HEADERS });
      const data = await response.json();
      return data; // Return the fetched data for further processing
    } catch (error) {
      console.error("Failed to fetch stock items:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async getFintzCotacoes(ticker, startDate = '2010-01-01') {
    const PARAMS = new URLSearchParams({ ticker: ticker.toUpperCase(), dataInicio: startDate });

    const endpoint = `${BASE_URL}/bolsa/b3/avista/cotacoes/historico?${PARAMS.toString()}`;

    try {
      const response = await fetch(endpoint, { headers: HEADERS });
      const data = await response.json();
      return data; // Return the data for further processing
    } catch (error) {
      console.error("Failed to fetch stock price history:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

}

export default Fintz
