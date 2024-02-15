<template>
  <div class="bg-slate-200">
    <div class="flex flex-col min-h-screen">
      <div class="grow">
        <nav class="flex items-center py-3 justify-between mb-10 px-10 bg-white text-slate-600">
          <div class="flex items-center"> <!-- Wrap the logo and title in a div to align them side by side -->
            <img src="/src/assets/icone-positivo.png" alt="Logo" class="h-8 mr-2"> <!-- Adjust the class as needed -->
            <h2 class="text-2xl font-semibold">findicadores.com.br</h2>
          </div>
          <!-- <div class="flex items-center">
            <img src="/src/assets/icone-negativo.png" alt="Logo" class="h-8 mr-2">
            <h2 class="text-2xl font-semibold">findicadores.com.br</h2>
          </div> -->
          <div class="flex items-center"> <!-- Wrap the logo and title in a div to align them side by side -->
            <InputText v-model="ticker" placeholder="Digite o código (ex: BBAS3)" @keypress.enter="fetchData" class="mt-0 w-60 px-2 py-1 placeholder:normal-case uppercase bg-slate-200 border border-slate-400 text-zinc-700 placeholder-zinc-500 mr-4" />
            <Button class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 px-5 text-center py-1" label="Buscar" @click="fetchData" />
          </div>
        </nav>

        <!-- Tabela Informações / Infos Gerais -->
        <div class="mx-auto max-w-screen-lg">
          <div class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border mb-8">
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-bold text-black">Informações {{this.ticker.toUpperCase()}}</div>
              </div>
              <!-- Individual Row 1 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">Preço</span>
                </div>
                <div class="flex justify-between items-center w-2/12 px-4">
                  <span @click="showChart('Preço')" class="cursor-pointer">{{ this.cotacoes.length > 0 ? 'R$' + this.cotacoes[0].precoFechamento : '' }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['ValorDeMercado'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex justify-between items-center w-2/12 px-4">
                  <span @click="showChart('ValorDeMercado')" class="cursor-pointer">{{ this.indicators['ValorDeMercado'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['EV'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex justify-between items-center w-2/12 px-4">
                  <span @click="showChart('EV')" class="cursor-pointer">{{ this.indicators['EV'].valueString }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela de Indicadores -->
        <div class="mx-auto max-w-screen-lg">
          <div class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border mb-8">
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-bold text-black">Indicadores {{this.ticker.toUpperCase()}}</div>
              </div>
              <!--Subheader Indicadores Valuation -->
              <div class="flex p-1 bg-blue-200">
                <div class="flex-1 font-semibold">Valuation</div>
              </div>
              <!-- Individual Row 1 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['DividendYield'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex justify-between items-center w-2/12 px-4">
                  <span @click="showChart('DividendYield')" class="cursor-pointer">{{ this.indicators['DividendYield'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'Proventos últimos 12m / Preço'">{{ this.indicators['P_VP'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex justify-between items-center w-2/12 px-4">
                  <span @click="showChart('P_VP')" class="cursor-pointer">{{ this.indicators['P_VP'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['EV_EBIT'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('EV_EBIT')" class="cursor-pointer">{{ this.indicators['EV_EBIT'].valueString }}</span>
                </div>
              </div>
              <!-- Individual Row 2 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_EBITDA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_EBITDA')" class="cursor-pointer">{{ this.indicators['P_EBITDA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['VPA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('VPA')" class="cursor-pointer">{{ this.indicators['VPA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_Ativos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_Ativos')" class="cursor-pointer">{{ this.indicators['P_Ativos'].valueString }}</span>
                </div>
              </div>
              <!-- Individual Row 3 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_L'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_L')" class="cursor-pointer">{{ this.indicators['P_L'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['EV_EBITDA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('EV_EBITDA')" class="cursor-pointer">{{ this.indicators['EV_EBITDA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_SR'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_SR')" class="cursor-pointer">{{ this.indicators['P_SR'].valueString }}</span>
                </div>
              </div>
              <!-- Individual Row 4 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_EBIT'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_EBIT')" class="cursor-pointer">{{ this.indicators['P_EBIT'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['LPA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('LPA')" class="cursor-pointer">{{ this.indicators['LPA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['P_CapitalDeGiro'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('P_CapitalDeGiro')" class="cursor-pointer">{{ this.indicators['P_CapitalDeGiro'].valueString }}</span>
                </div>
              </div>
              <!--Subheader Indicadores Endividamento -->
              <div class="flex p-1 bg-blue-200">
                <div class="flex-1 font-semibold">Endividamento</div>
              </div>
              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['DividaLiquida_PatrimonioLiquido'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('DividaLiquida_PatrimonioLiquido')" class="cursor-pointer">{{ this.indicators['DividaLiquida_PatrimonioLiquido'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['DividaLiquida_EBITDA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('DividaLiquida_EBITDA')" class="cursor-pointer">{{ this.indicators['DividaLiquida_EBITDA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['DividaLiquida_EBIT'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('DividaLiquida_EBIT')" class="cursor-pointer">{{ this.indicators['DividaLiquida_EBIT'].valueString }}</span>
                </div>
              </div>
              <!-- Individual Row 7 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['PatrimonioLiquido_Ativos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('PatrimonioLiquido_Ativos')" class="cursor-pointer">{{ this.indicators['PatrimonioLiquido_Ativos'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['Passivos_Ativos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('Passivos_Ativos')" class="cursor-pointer">{{ this.indicators['Passivos_Ativos'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['LiquidezCorrente'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('LiquidezCorrente')" class="cursor-pointer">{{ this.indicators['LiquidezCorrente'].valueString }}</span>
                </div>
              </div>
              <!--Subheader Indicadores Eficiência -->
              <div class="flex p-1 bg-blue-200">
                <div class="flex-1 font-semibold">Eficiência</div>
                <div class="flex-1 font-semibold">Rentabilidade</div>
              </div>
              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['MargemBruta'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('MargemBruta')" class="cursor-pointer">{{ this.indicators['MargemBruta'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['MargemEBITDA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('MargemEBITDA')" class="cursor-pointer">{{ this.indicators['MargemEBITDA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['ROE'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('ROE')" class="cursor-pointer">{{ this.indicators['ROE'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['ROIC'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('ROIC')" class="cursor-pointer">{{ this.indicators['ROIC'].valueString }}</span>
                </div>
              </div>
              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['MargemEBIT'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('MargemEBIT')" class="cursor-pointer">{{ this.indicators['MargemEBIT'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['MargemLiquida'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('MargemLiquida')" class="cursor-pointer">{{ this.indicators['MargemLiquida'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['ROA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('ROA')" class="cursor-pointer">{{ this.indicators['ROA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.indicators['GiroAtivos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChart('GiroAtivos')" class="cursor-pointer">{{ this.indicators['GiroAtivos'].valueString }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Tabela de Itens Balanço -->
        <div class="mx-auto max-w-screen-lg">
          <div class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border">
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-bold text-black">Resultado {{this.ticker.toUpperCase()}}</div>
                <div class="flex-1 font-bold text-black">Balanço {{this.ticker.toUpperCase()}}</div>
              </div>
              <!-- DRE / Balanço Row 1 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['ReceitaLiquida'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('ReceitaLiquida')" class="cursor-pointer">{{ this.itens['ReceitaLiquida'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['PatrimonioLiquido'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('PatrimonioLiquido')" class="cursor-pointer">{{ this.itens['PatrimonioLiquido'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 2 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['Custos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('Custos')" class="cursor-pointer">{{ this.itens['Custos'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['AtivoTotal'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('AtivoTotal')" class="cursor-pointer">{{ this.itens['AtivoTotal'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 3 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['ResultadoBruto'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('ResultadoBruto')" class="cursor-pointer">{{ this.itens['ResultadoBruto'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['PassivoTotal'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('PassivoTotal')" class="cursor-pointer">{{ this.itens['PassivoTotal'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 4 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['DespesasReceitasOperacionaisOuAdministrativas'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('DespesasReceitasOperacionaisOuAdministrativas')" class="cursor-pointer">{{ this.itens['DespesasReceitasOperacionaisOuAdministrativas'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['DividaBruta'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('DividaBruta')" class="cursor-pointer">{{ this.itens['DividaBruta'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 5 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['EBIT'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('EBIT')" class="cursor-pointer">{{ this.itens['EBIT'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['DividaLiquida'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('DividaLiquida')" class="cursor-pointer">{{ this.itens['DividaLiquida'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['EBITDA'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('EBITDA')" class="cursor-pointer">{{ this.itens['EBITDA'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['Disponibilidades'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('Disponibilidades')" class="cursor-pointer">{{ this.itens['Disponibilidades'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 7 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['ResultadoFinanceiro'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('ResultadoFinanceiro')" class="cursor-pointer">{{ this.itens['ResultadoFinanceiro'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['AtivoCirculante'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('AtivoCirculante')" class="cursor-pointer">{{ this.itens['AtivoCirculante'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 8 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['LAIR'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('LAIR')" class="cursor-pointer">{{ this.itens['LAIR'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['AtivoNaoCirculante'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('AtivoNaoCirculante')" class="cursor-pointer">{{ this.itens['AtivoNaoCirculante'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 9 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['Impostos'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('Impostos')" class="cursor-pointer">{{ this.itens['Impostos'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['PassivoCirculante'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('PassivoCirculante')" class="cursor-pointer">{{ this.itens['PassivoCirculante'].valueString }}</span>
                </div>
              </div>
              <!-- DRE / Balanço Row 9 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['LucroLiquidoSociosControladora'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('LucroLiquidoSociosControladora')" class="cursor-pointer">{{ this.itens['LucroLiquidoSociosControladora'].valueString }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-help" v-tooltip="'tooltip'">{{ this.itens['PassivoNaoCirculante'].indicadorNomeBonito }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span @click="showChartItem('PassivoNaoCirculante')" class="cursor-pointer">{{ this.itens['PassivoNaoCirculante'].valueString }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="mt-8 p-2 bg-blue-400 text-white text-center">
        Dados da <a href="https://fintz.com.br" target="_blank" class="underline text-white">API Fintz.com.br</a>
      </footer>
    </div>
    <div v-if="isLoading" stroke="blue" class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div>
        <ProgressSpinner style="width: 100px; height: 100px" strokeWidth="8" animationDuration=".5s" />
      </div>
    </div>
    <Dialog v-model:visible="isChartVisible" modal :header="chartTitle" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
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
      chartTitle: '',
      cotacoes: [],
      ticker: '',
      isLoading: false,
      indicators: {
        'ValorDeMercado': { indicadorNomeBonito: 'Market Cap', value: '' },
        'EV': { indicadorNomeBonito: 'EV', value: '' },
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
      itens: {
        'ReceitaLiquida': { indicadorNomeBonito: 'Receita', value: '' },
        'Custos': { indicadorNomeBonito: 'Custos', value: '' },
        'ResultadoBruto': { indicadorNomeBonito: 'Res. Bruto', value: '' },
        'DespesasReceitasOperacionaisOuAdministrativas': { indicadorNomeBonito: 'Despesas', value: '' },
        'EBIT': { indicadorNomeBonito: 'EBIT', value: '' },
        'EBITDA': { indicadorNomeBonito: 'EBITDA', value: '' },
        'ResultadoFinanceiro': { indicadorNomeBonito: 'Res. Financ.', value: '' },
        'LAIR': { indicadorNomeBonito: 'LAIR', value: '' },
        'Impostos': { indicadorNomeBonito: 'Impostos', value: '' },
        'LucroLiquidoSociosControladora': { indicadorNomeBonito: 'Lucro Líq.', value: '' },
        'PatrimonioLiquido': { indicadorNomeBonito: 'PL', value: '' },
        'AtivoTotal': { indicadorNomeBonito: 'Ativo', value: '' },
        'PassivoTotal': { indicadorNomeBonito: 'Passivo', value: '' },
        'DividaBruta': { indicadorNomeBonito: 'Dív. Bruta', value: '' },
        'DividaLiquida': { indicadorNomeBonito: 'Dív. Líquida', value: '' },
        'CaixaEquivalentes': { indicadorNomeBonito: 'Caixa e Equiv.', value: '' },
        'Disponibilidades': { indicadorNomeBonito: 'Dispon.', value: '' },
        'PassivoCirculante': { indicadorNomeBonito: 'Passivo Circ.', value: '' },
        'PassivoNaoCirculante': { indicadorNomeBonito: 'Passivo N. Circ.', value: '' },
        'ReceitasFinanceiras': { indicadorNomeBonito: 'Receitas Fin.', value: '' },
        'DespesasFinanceiras': { indicadorNomeBonito: 'Despesas Fin.', value: '' },
        'AtivoCirculante': { indicadorNomeBonito: 'Ativo Circ.', value: '' },
        'AtivoNaoCirculante': { indicadorNomeBonito: 'Ativo N. Circ.', value: '' },
        'EquivalenciaPatrimonial': { indicadorNomeBonito: 'Eq. Patrimonial', value: '' },
      }
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true
      await this.fetchStockIndicators()
      this.fetchStockPriceHistory()
      this.fetchStockItens()
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

    async fetchStockPriceHistory() {
      const URL_BASE = 'https://api.fintz.com.br'
      const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }
      const PARAMS = new URLSearchParams({ ticker: this.ticker.toUpperCase(), dataInicio: '2010-01-01' })

      const endpoint = `${URL_BASE}/bolsa/b3/avista/cotacoes/historico?${PARAMS.toString()}`

      try {
        const response = await fetch(endpoint, { headers: HEADERS })
        const data = await response.json()
        this.cotacoes = data
      
      } catch (error) {
        console.error("Failed to fetch stock price history", error)
      }
    },

    async fetchStockItens() {
      const URL_BASE = 'https://api.fintz.com.br'
      const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }
      const PARAMS = new URLSearchParams({ ticker: this.ticker.toUpperCase() })

      const endpoint = `${URL_BASE}/bolsa/b3/avista/itens-contabeis/por-ticker?${PARAMS.toString()}`

      try {
        const response = await fetch(endpoint, { headers: HEADERS })
        const data = await response.json()
        
        // Update each indicator in the object
        Object.keys(this.itens).forEach(itemKey => {
          const apiValue = data.find(item => item.item === itemKey)?.valor || '-'
          this.itens[itemKey].value = apiValue
        })
        
        // After updating values, format them
        this.formatItemValues()
      } catch (error) {
        console.error("Failed to fetch stock itens:", error)
        // Handle error for each indicator
        Object.keys(this.itens).forEach(itemKey => {
          this.itens[itemKey].valueString = 'Error'
        })
        this.formatItemValues() // Format even if there's an error to ensure consistent UI
      }
    },
    
    formatIndicatorValues() {
      Object.keys(this.indicators).forEach(indicatorKey => {
        let formattedValue = this.indicators[indicatorKey].value
        if (!isNaN(formattedValue) && formattedValue !== '-' && formattedValue !== 'Error') {
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
          const currencyIndicators = {
            EV: true,
            ValorDeMercado: true
          }
          if (!(indicatorKey in percentIndicators) && !(indicatorKey in currencyIndicators)) {
            const formatter = Intl.NumberFormat('pt-br', {  maximumFractionDigits: 2, minimumFractionDigits: 2 })
            formattedValue = formatter.format(formattedValue)
          }
          if (indicatorKey in percentIndicators) {
            const formatter = Intl.NumberFormat('pt-br', { style: 'percent', maximumFractionDigits: 1, minimumFractionDigits: 1 })
            formattedValue = formatter.format(formattedValue)
          }
          if (indicatorKey in currencyIndicators) {
            const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
            formattedValue = formatter.format(formattedValue)
          }
        }
        this.indicators[indicatorKey].valueString = formattedValue
      })
    },
    
    formatItemValues() {
      Object.keys(this.itens).forEach(itemKey => {
        let formattedValue = this.itens[itemKey].value
        const value = formattedValue
        if (!isNaN(formattedValue) && formattedValue !== '-' && formattedValue !== 'Error') {
          // const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
          // formattedValue = formatter.format(formattedValue)
          const formatter = new Intl.NumberFormat('en', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
            notation: 'compact'
          });

          formattedValue = formatter.format(value);
        }
        this.itens[itemKey].valueString = formattedValue
      })
    },

    showChart(indicatorKey) {
      if (this.ticker !== '') { 
        this.chartData = {}; // resetting
        this.chartOptions = {}; // resetting
        this.currentIndicatorKey = indicatorKey;
        this.isChartVisible = true;
        if (this.currentIndicatorKey == 'Preço') {
          this.chartTitle = this.ticker.toUpperCase() + ' Cotação'
          this.loadChartDataPrice(indicatorKey)
        } else {
          this.chartTitle = this.ticker.toUpperCase() + ' ' + this.indicators[indicatorKey].indicadorNomeBonito
          this.loadChartData(indicatorKey)
        }
      }
    },

    showChartItem(indicatorKey) {
      if (this.ticker !== '') { 
        this.chartData = {}; // resetting
        this.chartOptions = {}; // resetting
        this.currentIndicatorKey = indicatorKey;
        this.isChartVisible = true;
        this.chartTitle = this.ticker.toUpperCase() + ' ' + this.itens[indicatorKey].indicadorNomeBonito
        
        const not_12m = ['PatrimonioLiquido', 'AtivoTotal','PassivoTotal','DividaBruta','DividaLiquida','CaixaEquivalentes','Disponibilidades','PassivoCirculante','PassivoNaoCirculante','AtivoCirculante','AtivoNaoCirculante']
        if (!(not_12m.includes(indicatorKey))) {
          this.chartTitle += ' 12m'
        }

        this.loadChartDataItem(indicatorKey)
      }
    },

    loadChartDataItem(indicatorKey) {
      this.fetchStockItemHistory(indicatorKey).then(historicalData => {
        if (!historicalData) {
          console.error("No historical data available");
          return;
        }

        const data = historicalData.map(item => item.valor)

        // Function to map 'ano' and 'trimestre' to a date string
        const mapToQuarterEndMonth = (year, quarter) => {
          const month_day = quarter === 1 ? '03-31' : quarter === 2 ? '06-30' : quarter === 3 ? '09-30' : '12-31';
          return `${year}-${month_day}`;
        };
        
        // Generating labels using 'ano' and 'trimestre'
        const labels = historicalData.map(item => mapToQuarterEndMonth(item.ano, item.trimestre));

        // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
        const chartData = {
          labels: labels, // Extracting dates
          datasets: [{
            label: this.itens[indicatorKey].indicadorNomeBonito, // You might want to customize this label
            data: data, // Extracting values
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Example background color
            borderColor: 'rgba(54, 162, 235, 1)', // Example border color
            borderWidth: 1,
          }]
        };

        const options = {
          scales: {
            x: {
              type: 'time', // Specify that this is a time series scale
              time: {
                unit: 'month', // Display ticks in month intervals
                displayFormats: {
                  month: 'yyyy-MM' // Format dates as 'Year-Month'
                }
              },
              ticks: {
                autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
                maxTicksLimit: 60 // Maximum number of ticks displayed
              }
            },
            y: {
              ticks: {
                callback: function(value) {
                  const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
                  return(formatter.format(value))
                }
              }
            }
          }
        };

        // Assigning formatted chartData for chart rendering
        this.chartData = chartData;
        this.chartOptions = options;

      }).catch(error => {
        console.error("Error loading chart ITEM data:", error);
      });
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

        const percentIndicators = {
          DividendYield: true,
          MargemBruta: true,
          MargemEBITDA: true,
          MargemEBIT: true,
          MargemLiquida: true,
          ROE: true,
          ROIC: true,
          ROA: true
        };

        const currencyIndicators = {
          EV: true,
          ValorDeMercado: true
        }

        const options = {
          scales: {
            x: {
              type: 'time', // Specify that this is a time series scale
              time: {
                unit: 'month', // Display ticks in month intervals
                displayFormats: {
                  month: 'yyyy-MM' // Format dates as 'Year-Month'
                }
              },
              ticks: {
                autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
                maxTicksLimit: 60 // Maximum number of ticks displayed
              }
            },
            y: {
              ticks: {
                // Format y-axis ticks based on the indicatorKey
                callback: function(value) {
                  // Check if the indicatorKey requires percentage formatting
                  if (percentIndicators[indicatorKey]) {
                    return `${value}%`; // Format as percentage
                  } else if (currencyIndicators) {
                    const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
                    return(formatter.format(value))
                  } else {
                    return value.toFixed(2); // Format as a decimal with two places
                  }
                }
              }
            }
          }
        };

        // Assigning formatted chartData for chart rendering
        this.chartData = chartData;
        this.chartOptions = options;

      }).catch(error => {
        console.error("Error loading chart INDICATOR data:", error);
      });
    },

    loadChartDataPrice(indicatorKey) {
        // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
        const chartData = {
          labels: this.cotacoes.map(item => item.data), // Extracting dates
          datasets: [{
            label: indicatorKey, // You might want to customize this label
            data: this.cotacoes.map(item => item.precoFechamentoAjustado), // Extracting values
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Example background color
            borderColor: 'rgba(54, 162, 235, 1)', // Example border color
            borderWidth: 1,
          }]
        };

        const options = {
          scales: {
            x: {
              type: 'time', // Specify that this is a time series scale
              time: {
                unit: 'month', // Display ticks in month intervals
                displayFormats: {
                  month: 'yyyy-MM' // Format dates as 'Year-Month'
                }
              },
              ticks: {
                autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
                maxTicksLimit: 60 // Maximum number of ticks displayed
              }
            },
            y: {
              ticks: {
                callback: function(value) {
                  const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
                  return(formatter.format(value))
                }
              }
            }
          }
        };

      // Assigning formatted chartData for chart rendering
      this.chartData = chartData;
      this.chartOptions = options;
    },

    async fetchStockItemHistory(indicatorKey) {
      const URL_BASE = 'https://api.fintz.com.br'
      const HEADERS = { 'X-API-Key': 'chave-de-teste-api-fintz' }
      const not_12m = ['PatrimonioLiquido', 'AtivoTotal','PassivoTotal','DividaBruta','DividaLiquida','CaixaEquivalentes','Disponibilidades','PassivoCirculante','PassivoNaoCirculante','AtivoCirculante','AtivoNaoCirculante']

      let tipoPeriodo = '12M'
      if (not_12m.includes(indicatorKey)) {
        tipoPeriodo = 'TRIMESTRAL'
      }

      const PARAMS = new URLSearchParams({ item: indicatorKey, ticker: this.ticker.toUpperCase(), tipoPeriodo: tipoPeriodo })

      const endpoint = `${URL_BASE}/bolsa/b3/avista/itens-contabeis/historico?${PARAMS.toString()}`

      try {
        const response = await fetch(endpoint, { headers: HEADERS })
        const data = await response.json()
        
        return data
      } catch (error) {
        console.error("Failed to fetch stock ITEM history:", error)
      }
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
        console.error("Failed to fetch stock INDICATOR history:", error)
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