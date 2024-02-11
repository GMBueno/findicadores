<template>
  <div v-if="isLoading" stroke="blue" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div>
      <ProgressSpinner style="width: 100px; height: 100px" strokeWidth="8" animationDuration=".5s" />
    </div>
  </div>
  <div class="flex flex-col min-h-screen">
    <div class="grow">
      <nav class="flex items-center justify-between mb-10 px-10 bg-blue-500 p-3 text-white">
        <h2 class="text-xl font-bold">Indicadores de Ações</h2>
        <InputText v-model="ticker" placeholder="Digite o código (ex: BBAS3)" class="mt-0 w-60 p-2 bg-blue-300 border border-blue-600 text-gray-700 placeholder-gray-700" />
        <Button class="bg-blue-300 hover:bg-blue-600 border-blue-600 text-black" label="Buscar indicadores" @click="fetchData" @keypress.enter="fetchData" />
      </nav>

      <!-- Custom Table -->
      <div class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border">
        <div class="align-middle inline-block min-w-full">
          <!-- Header -->
          <div class="flex p-2 text-xl bg-blue-400">
            <div class="flex-1 font-semibold text-black">Indicadores Fundamentalistas {{this.ticker.toUpperCase()}}</div>
          </div>
          <!--Subheader Indicadores Valuation -->
          <div class="flex p-2 bg-blue-300">
            <div class="flex-1 font-semibold">Valuation</div>
          </div>
          <!-- Individual Row 1 -->
          <div class="flex">
            <div class="flex-1 px-4 py-1 bg-blue-100 text-right">
              {{ this.indicators['DividendYield'].indicadorNomeBonito }}
            </div>
            <div class="flex-1 px-4 py-1 text-left">
              {{ this.indicators['DividendYield'].valueString }}
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
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'App',
  components: {
    InputText,
    Button,
    ProgressSpinner,
  },
  data() {
    return {
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