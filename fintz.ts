// src/api/stockService.js

import type Indicadores from "./components/Indicadores.vue";

const BASE_URL = "https://api.fintz.com.br";
const HEADERS = { "X-API-Key": "75IdGVrQce2PfPOenodnL9FDiJ1yjAh71mFxTrWN" };

export interface Indicador {
  ticker: string;
  indicador: string;
  data: string;
  valor: number;
}

class Fintz {
  static async getIndicadoresPorTicker(ticker: string): Promise<Indicador[]> {
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

  static async getIndicadoresHistorico(ticker: string, indicador: string): Promise<Indicador[]> {
    const PARAMS = new URLSearchParams({ ticker: ticker.toUpperCase(), indicador: indicador });

    const endpoint = `${BASE_URL}/bolsa/b3/avista/indicadores/historico?${PARAMS.toString()}`;

    try {
      const response = await fetch(endpoint, { headers: HEADERS });
      const data = await response.json();
      return data; // Return the fetched data for further processing
    } catch (error) {
      console.error("Failed to fetch stock indicators:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async getItensContabeisPorTicker(ticker: string, tipoPeriodo: string = "") {
    let PARAMS: object = {}
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

  static async getItensContabeisHistorico(item : string, ticker : string, tipoPeriodo = "") {
    let PARAMS : object = {}
    if (tipoPeriodo === "" || tipoPeriodo === "12M") {
      PARAMS = new URLSearchParams({
        item: item,
        ticker: ticker.toUpperCase(),
        tipoPeriodo: tipoPeriodo,
      });
    } else {
      // tem que ser assim pq se mandar 12M não vai pegar o balanço
      // não tem opção "pegar prefencialmente 12M", quer dizer, tem, é não mandar o parametro...
      PARAMS = new URLSearchParams({
        item: item,
        ticker: ticker.toUpperCase(),
        tipoPeriodo: tipoPeriodo,
      });
    }

    const endpoint = `${BASE_URL}/bolsa/b3/avista/itens-contabeis/historico?${PARAMS.toString()}`;

    try {
      const response = await fetch(endpoint, { headers: HEADERS });
      const data = await response.json();
      return data; // Return the fetched data for further processing
    } catch (error) {
      console.error("Failed to fetch stock items:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }

  static async getCotacoesHistorico(ticker : string, startDate : string = "2010-01-01") {
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
