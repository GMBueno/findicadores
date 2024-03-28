// src/api/stockService.js

import type Indicadores from "./components/Indicadores.vue";

const BASE_URL = "https://api.fintz.com.br";
const HEADERS = { "X-API-Key": "chave-de-teste-api-fintz" };

export interface Indicador {
  ticker: string;
  indicador: string;
  data: string;
  valor: number;
}

class Fintz {
  static async getFintzIndicadores(ticker: string): Promise<Indicador[]> {
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

  static async getFintzItensContabeis(ticker, tipoPeriodo = "") {
    let PARAMS = "";
    if (tipoPeriodo === "" || tipoPeriodo === "12M") {
      PARAMS = new URLSearchParams({ ticker: ticker.toUpperCase() });
    } else {
      // tem que ser assim pq se mandar 12M não vai pegar o balanço
      // não tem opção "pegar prefencialmente 12M", quer dizer, tem, é não mandar o parametro...
      PARAMS = new URLSearchParams({
        ticker: ticker.toUpperCase(),
        tipoPeriodo: tipoPeriodo,
      });
    }

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

  static async getFintzCotacoes(ticker, startDate = "2010-01-01") {
    const PARAMS = new URLSearchParams({
      ticker: ticker.toUpperCase(),
      dataInicio: startDate,
    });

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

export default Fintz;
