<template>
  <div class="bg-slate-200">
    <div class="flex flex-col min-h-screen">
      <div class="grow">
        <nav class="flex items-center py-3 justify-between mb-10 px-10 bg-zinc-600 p-3 text-slate-100">
          <div class="flex items-center"> <!-- Wrap the logo and title in a div to align them side by side -->
            <img src="/src/assets/icone-negativo.png" alt="Logo" class="h-8 mr-2"> <!-- Adjust the class as needed -->
            <h2 class="text-2xl font-semibold">findicadores.com.br</h2>
          </div>
          <div class="flex items-center"> <!-- Wrap the logo and title in a div to align them side by side -->
            <InputText v-model="ticker" placeholder="Digite o código (ex: BBAS3)" @keypress.enter="fetchData" class="mt-0 w-60 px-2 py-1 placeholder:normal-case uppercase bg-slate-200 border border-slate-400 text-zinc-700 placeholder-zinc-500 mr-4" />
            <Button class="bg-slate-200 hover:bg-slate-300 border-slate-400 text-zinc-700 px-5 text-center py-1" label="Buscar" @click="fetchData" />
          </div>
        </nav>

        <!-- Custom Table -->
        <div class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border">
          <div class="align-middle inline-block min-w-full">
            <!-- Header -->
            <div class="flex p-2 text-xl bg-blue-400">
              <div class="flex-1 font-bold text-black">Indicadores Fundamentalistas {{this.ticker.toUpperCase()}}</div>
            </div>
            <!--Subheader Indicadores Valuation -->
            <div class="flex p-2 bg-blue-300">
              <div class="flex-1 font-semibold">Valuation</div>
            </div>
            <!-- Individual Row 1 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['DividendYield'].indicadorNomeBonito }}
                <i class="pi pi-question-circle ml-2 text-slate-500" v-tooltip="'Proventos últimos 12m / Preço'"></i>
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['DividendYield'].valueString }}
                <i v-if="ticker !== ''" class="pi pi-chart-line ml-2 cursor-pointer" @click="showChart('DividendYield')"></i>
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_VP'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_VP'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['EV_EBIT'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['EV_EBIT'].valueString }}
              </div>
            </div>
            <!-- Individual Row 2 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_EBITDA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_EBITDA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['VPA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['VPA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_Ativos'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_Ativos'].valueString }}
              </div>
            </div>
            <!-- Individual Row 3 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_L'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_L'].valueString }}
                <i class="pi pi-chart-line ml-2 cursor-pointer" @click="showChart('P_L')"></i>
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['EV_EBITDA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['EV_EBITDA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_SR'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_SR'].valueString }}
              </div>
            </div>
            <!-- Individual Row 4 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_EBIT'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_EBIT'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['LPA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['LPA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['P_CapitalDeGiro'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['P_CapitalDeGiro'].valueString }}
              </div>
            </div>
            <!--Subheader Indicadores Endividamento -->
            <div class="flex p-2 bg-blue-300">
              <div class="flex-1 font-semibold">Endividamento</div>
            </div>
            <!-- Individual Row 6 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['DividaLiquida_PatrimonioLiquido'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['DividaLiquida_PatrimonioLiquido'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['DividaLiquida_EBITDA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['DividaLiquida_EBITDA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['DividaLiquida_EBIT'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['DividaLiquida_EBIT'].valueString }}
              </div>
            </div>
            <!-- Individual Row 7 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['PatrimonioLiquido_Ativos'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['PatrimonioLiquido_Ativos'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['Passivos_Ativos'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['Passivos_Ativos'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['LiquidezCorrente'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['LiquidezCorrente'].valueString }}
              </div>
            </div>
            <!--Subheader Indicadores Eficiência -->
            <div class="flex p-2 bg-blue-300">
              <div class="flex-1 font-semibold">Eficiência</div>
              <div class="flex-1 font-semibold">Rentabilidade</div>
            </div>
            <!-- Individual Row 6 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['MargemBruta'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['MargemBruta'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['MargemEBITDA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['MargemEBITDA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['ROE'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['ROE'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['ROIC'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['ROIC'].valueString }}
              </div>
            </div>
            <!-- Individual Row 6 -->
            <div class="flex">
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['MargemEBIT'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['MargemEBIT'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['MargemLiquida'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['MargemLiquida'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['ROA'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['ROA'].valueString }}
              </div>
              <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
                {{ this.indicators['GiroAtivos'].indicadorNomeBonito }}
              </div>
              <div class="flex-1 px-4 py-1 text-left">
                {{ this.indicators['GiroAtivos'].valueString }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="mt-8 p-4 bg-blue-400 text-white text-center">
        Dados da <a href="https://fintz.com.br" target="_blank" class="underline text-white">API Fintz.com.br</a>
      </footer>
    </div>
    <div v-if="isLoading" stroke="blue" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div>
        <ProgressSpinner style="width: 100px; height: 100px" strokeWidth="8" animationDuration=".5s" />
      </div>
    </div>
    <Dialog v-model:visible="isChartVisible" modal :header="'Histórico ' + currentIndicatorKey" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <LineChart :chartData="chartData" :chartOptions="chartOptions" />
    </Dialog>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart';
import LineChart from '/src/components/LineChart.vue';

export default {
  name: 'App',
  components: {
    InputText,
    Button,
    ProgressSpinner,
    Dialog,
    Chart,
    LineChart
  },
  data() {
    return {
      currentIndicatorKey: '',
      isChartVisible: false,
      visible: true,
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {},
      ticker: '',
      isLoading: false,
      indicators: {
        'DividendYield': { indicadorNomeBonito: 'DY', value: '' },
        'P_L': { indicadorNomeBonito: 'P/L', value: '' },
        'P_VP': { indicadorNomeBonito: 'P/VP', value: '' },
        'EV_EBITDA': { indicadorNomeBonito: 'EV/EBITDA', value: '' },
        'EV_EBIT': { indicadorNomeBonito: 'EV/EBIT', value: '' },
        'P_EBITDA': { indicadorNomeBonito: 'P/EBITDA', value: '' },
        'P_EBIT': { indicadorNomeBonito: 'P/EBIT', value: '' },
        'VPA': { indicadorNomeBonito: 'VPA', value: '' },
        'P_Ativos': { indicadorNomeBonito: 'P/Ativo', value: '' },
        'LPA': { indicadorNomeBonito: 'LPA', value: '' },
        'P_SR': { indicadorNomeBonito: 'P/SR', value: '' },
        'P_CapitalDeGiro': { indicadorNomeBonito: 'P/Cap Giro', value: '' },
        'P_AtivoCirculanteLiquido': { indicadorNomeBonito: 'P/Ativo Circ Liq', value: '' },
        'DividaLiquida_PatrimonioLiquido': { indicadorNomeBonito: 'Dív Liq/PL', value: '' },
        'DividaLiquida_EBITDA': { indicadorNomeBonito: 'Dív Liq/EBITDA', value: '' },
        'DividaLiquida_EBIT': { indicadorNomeBonito: 'Dív Liq/EBIT', value: '' },
        'PatrimonioLiquido_Ativos': { indicadorNomeBonito: 'PL/Ativos', value: '' },
        'Passivos_Ativos': { indicadorNomeBonito: 'Passivos/Ativos', value: '' },
        'LiquidezCorrente': { indicadorNomeBonito: 'Liq Corrente', value: '' },
        'MargemBruta': { indicadorNomeBonito: 'M. Bruta', value: '' },
        'MargemEBITDA': { indicadorNomeBonito: 'M. EBITDA', value: '' },
        'MargemEBIT': { indicadorNomeBonito: 'M. EBIT', value: '' },
        'MargemLiquida': { indicadorNomeBonito: 'M. Líq', value: '' },
        'ROE': { indicadorNomeBonito: 'ROE', value: '' },
        'ROIC': { indicadorNomeBonito: 'ROIC', value: '' },
        'ROA': { indicadorNomeBonito: 'ROA', value: '' },
        'GiroAtivos': { indicadorNomeBonito: 'Giro Ativos', value: '' },
      },
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      await this.fetchStockIndicators()
      // ToDo: chamar api para última cotação
      // ToDo: chamar api para itens contábeis
      this.isLoading = false
    },

    async fetchStockIndicators() {
      const URL_BASE = 'https://api.fintz.com.br'
      const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }
      const PARAMS = new URLSearchParams({ ticker: this.ticker.toUpperCase() })

      const endpoint = `${URL_BASE}/bolsa/b3/avista/indicadores/por-ticker?${PARAMS.toString()}`

      try {
        const response = await fetch(endpoint, { headers: HEADERS })
        const data = await response.json()
        
        // Update each indicator in the object
        Object.keys(this.indicators).forEach(indicatorKey => {
          const apiValue = data.find(item => item.indicador === indicatorKey)?.valor || '-'
          this.indicators[indicatorKey].value = apiValue
        })
        
        // After updating values, format them
        this.formatIndicatorValues()
      } catch (error) {
        console.error("Failed to fetch stock indicators:", error)
        // Handle error for each indicator
        Object.keys(this.indicators).forEach(indicatorKey => {
          this.indicators[indicatorKey].valueString = 'Error'
        })
        this.formatIndicatorValues() // Format even if there's an error to ensure consistent UI
      }
    },
    
    formatIndicatorValues() {
      Object.keys(this.indicators).forEach(indicatorKey => {
        let formattedValue = this.indicators[indicatorKey].value
        if (!isNaN(formattedValue) && formattedValue !== '-' && formattedValue !== 'Error') {
          formattedValue = Number(formattedValue).toFixed(2)
          const percentIndicators = {
            DividendYield: true,
            MargemBruta: true,
            MargemEBITDA: true,
            MargemEBIT: true,
            MargemLiquida: true,
            ROE: true,
            ROIC: true,
            ROA: true
          }
          if (indicatorKey in percentIndicators) {
            formattedValue = (Number(this.indicators[indicatorKey].value) * 100).toFixed(2)
            formattedValue += '%'
          }
        }
        this.indicators[indicatorKey].valueString = formattedValue
      })
    },

    showChart(indicatorKey) {
      this.currentIndicatorKey = indicatorKey;
      this.isChartVisible = true;
      this.loadChartData(indicatorKey)
    },

    loadChartData(indicatorKey) {
      this.fetchStockIndicatorHistory(indicatorKey).then(historicalData => {
        if (!historicalData) {
          console.error("No historical data available");
          return;
        }

        // Check if the indicator is 'DividendYield' and multiply by 100 for percentage format
        const data = historicalData.map(item => {
          return indicatorKey === "DividendYield" ? item.valor * 100 :
          indicatorKey === "MargemBruta" ? item.valor * 100 :
          indicatorKey === "MargemEBITDA" ? item.valor * 100 :
          indicatorKey === "MargemEBIT" ? item.valor * 100 :
          indicatorKey === "MargemLiquida" ? item.valor * 100 :
          indicatorKey === "ROE" ? item.valor * 100 :
          indicatorKey === "ROA" ? item.valor * 100 :
          indicatorKey === "ROIC" ? item.valor * 100 : item.valor;
        });

        // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
        const chartData = {
          labels: historicalData.map(item => item.data), // Extracting dates
          datasets: [{
            label: indicatorKey, // You might want to customize this label
            data: data, // Extracting values
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Example background color
            borderColor: 'rgba(54, 162, 235, 1)', // Example border color
            borderWidth: 1,
          }]
        };

        const options = {
          scales: {
            y: {
              ticks: {
                // Format y-axis ticks as percentages if 'DividendYield'
                callback: function(value) {
                  return indicatorKey === "DividendYield" ? `${value}%` : value;
                }
              }
            }
          }
        };

        // Assigning formatted chartData for chart rendering
        this.chartData = chartData;
        this.chartOptions = options;

      }).catch(error => {
        console.error("Error loading chart data:", error);
      });
    },

    async fetchStockIndicatorHistory(indicatorKey) {
      const URL_BASE = 'https://api.fintz.com.br'
      const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }
      const PARAMS = new URLSearchParams({ indicador: indicatorKey, ticker: this.ticker.toUpperCase() })

      const endpoint = `${URL_BASE}/bolsa/b3/avista/indicadores/historico?${PARAMS.toString()}`

      try {
        const response = await fetch(endpoint, { headers: HEADERS })
        const data = await response.json()
        
        return data
      } catch (error) {
        console.error("Failed to fetch stock indicator history:", error)
      }
    },
  },

  computed: {
    isChartDataReady() {
      return true; // Or any other appropriate check
    }
  },
}
</script>

<style>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes p-progress-spinner-color {
  from {
      stroke: rgb(56, 132, 255);
  }

  to {
      stroke: rgb(21, 66, 215);
  }
}
</style>