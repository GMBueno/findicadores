<template>
  <div class="bg-slate-200">
    <div class="flex flex-col min-h-screen">
      <div class="grow">
        <NavBar @update:ticker="updateTicker" @fetchData="fetchData" />

        <!-- Tabela Informações / Infos Gerais -->
        <div class="mx-auto max-w-screen-lg">
          <div
            class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border mb-7"
          >
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-semibold text-black cursor-default text-center">
                  Informações {{ this.lockedTicker.toUpperCase() }}
                </div>
              </div>

              <!-- Individual Row 1 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['Preco']"
                    >Preço</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('Preço')"
                    class="cursor-pointer text-black"
                    >{{
                      this.cotacoes.length > 0
                        ? "R$" + this.cotacoes[0].precoFechamento
                        : ""
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['UltimoBalanco']"
                    >Últ. Balanço</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span class="cursor-pointer text-black">{{
                    this.balancoData
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['ValorDeMercado']"
                    >{{
                      this.indicators["ValorDeMercado"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('ValorDeMercado')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["ValorDeMercado"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['EV']"
                    >{{ this.indicators["EV"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('EV')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["EV"].valueString }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela de Indicadores -->
        <div class="mx-auto max-w-screen-lg">
          <div
            class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border mb-7"
          >
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-semibold text-black cursor-default text-center">
                  Indicadores
                </div>
              </div>

              <!--Subheader Indicadores Valuation -->
              <div class="flex p-0 bg-blue-200">
                <div class="flex-1 font-semibold cursor-default text-black">
                  Valuation
                </div>
              </div>

              <!-- Individual Row 1 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="this.tooltip['DividendYield']"
                    >{{
                      this.indicators["DividendYield"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('DividendYield')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["DividendYield"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_VP']"
                    >{{ this.indicators["P_VP"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_VP')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_VP"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['EV_EBIT']"
                    >{{ this.indicators["EV_EBIT"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('EV_EBIT')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["EV_EBIT"].valueString }}</span
                  >
                </div>
              </div>

              <!-- Individual Row 2 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_EBITDA']"
                    >{{ this.indicators["P_EBITDA"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_EBITDA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_EBITDA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['VPA']"
                    >{{ this.indicators["VPA"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('VPA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["VPA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_Ativos']"
                    >{{ this.indicators["P_Ativos"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_Ativos')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_Ativos"].valueString }}</span
                  >
                </div>
              </div>

              <!-- Individual Row 3 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_L']"
                    >{{ this.indicators["P_L"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_L')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_L"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['EV_EBITDA']"
                    >{{
                      this.indicators["EV_EBITDA"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('EV_EBITDA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["EV_EBITDA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_SR']"
                    >{{ this.indicators["P_SR"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_SR')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_SR"].valueString }}</span
                  >
                </div>
              </div>

              <!-- Individual Row 4 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_EBIT']"
                    >{{ this.indicators["P_EBIT"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_EBIT')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_EBIT"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['LPA']"
                    >{{ this.indicators["LPA"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('LPA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["LPA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['P_CapitalDeGiro']"
                    >{{
                      this.indicators["P_CapitalDeGiro"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('P_CapitalDeGiro')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["P_CapitalDeGiro"].valueString }}</span
                  >
                </div>
              </div>

              <!--Subheader Indicadores Endividamento -->
              <div class="flex p-0 bg-blue-200">
                <div class="flex-1 font-semibold cursor-default text-black">
                  Endividamento
                </div>
              </div>

              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['DividaLiquida_PatrimonioLiquido']"
                    >{{
                      this.indicators["DividaLiquida_PatrimonioLiquido"]
                        .indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('DividaLiquida_PatrimonioLiquido')"
                    class="cursor-pointer text-black"
                    >{{
                      this.indicators["DividaLiquida_PatrimonioLiquido"]
                        .valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['DividaLiquida_EBITDA']"
                    >{{
                      this.indicators["DividaLiquida_EBITDA"]
                        .indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('DividaLiquida_EBITDA')"
                    class="cursor-pointer text-black"
                    >{{
                      this.indicators["DividaLiquida_EBITDA"].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['DividaLiquida_EBIT']"
                    >{{
                      this.indicators["DividaLiquida_EBIT"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('DividaLiquida_EBIT')"
                    class="cursor-pointer text-black"
                    >{{
                      this.indicators["DividaLiquida_EBIT"].valueString
                    }}</span
                  >
                </div>
              </div>

              <!-- Individual Row 7 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['PatrimonioLiquido_Ativos']"
                    >{{
                      this.indicators["PatrimonioLiquido_Ativos"]
                        .indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('PatrimonioLiquido_Ativos')"
                    class="cursor-pointer text-black"
                    >{{
                      this.indicators["PatrimonioLiquido_Ativos"].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['Passivos_Ativos']"
                    >{{
                      this.indicators["Passivos_Ativos"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('Passivos_Ativos')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["Passivos_Ativos"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['LiquidezCorrente']"
                    >{{
                      this.indicators["LiquidezCorrente"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('LiquidezCorrente')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["LiquidezCorrente"].valueString }}</span
                  >
                </div>
              </div>

              <!--Subheader Indicadores Eficiência -->
              <div class="flex p-0 bg-blue-200">
                <div class="flex-1 font-semibold cursor-default text-black">
                  Eficiência
                </div>
                <div class="flex-1 font-semibold cursor-default text-black">
                  Rentabilidade
                </div>
              </div>

              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['MargemBruta']"
                    >{{
                      this.indicators["MargemBruta"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('MargemBruta')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["MargemBruta"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['MargemEBITDA']"
                    >{{
                      this.indicators["MargemEBITDA"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('MargemEBITDA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["MargemEBITDA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['ROE']"
                    >{{ this.indicators["ROE"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('ROE')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["ROE"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['ROIC']"
                    >{{ this.indicators["ROIC"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('ROIC')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["ROIC"].valueString }}</span
                  >
                </div>
              </div>

              <!-- Individual Row 6 -->
              <div class="flex">
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['MargemEBIT']"
                    >{{
                      this.indicators["MargemEBIT"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('MargemEBIT')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["MargemEBIT"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['MargemLiquida']"
                    >{{
                      this.indicators["MargemLiquida"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('MargemLiquida')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["MargemLiquida"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['ROA']"
                    >{{ this.indicators["ROA"].indicadorNomeBonito }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('ROA')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["ROA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span
                    class="cursor-help text-black"
                    v-tooltip="tooltip['GiroAtivos']"
                    >{{
                      this.indicators["GiroAtivos"].indicadorNomeBonito
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChart('GiroAtivos')"
                    class="cursor-pointer text-black"
                    >{{ this.indicators["GiroAtivos"].valueString }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela de Itens Balanço -->
        <div class="mx-auto max-w-screen-lg">
          <div
            class="overflow-hidden shadow-xl shadow-blue-100 drop-shadow sm:rounded-lg mx-6 border-gray-400 border"
          >
            <div class="align-middle inline-block min-w-full">
              <!-- Header -->
              <div class="flex p-1 text-xl bg-blue-400">
                <div class="flex-1 font-semibold text-black cursor-default text-center">
                  <span class="font-semibold"> Resultado </span>
                  <!-- Toggle Trimestral e Acumulado 12M -->
                  <div
                    class="inline-flex items-center text-base border-slate-200 border-2 bg-slate-200 rounded-full ml-3 p-0 cursor-pointer"
                  >
                    <div
                      :class="{
                        'bg-blue-500 text-white font-semibold':
                          this.tipoPeriodo === '12M',
                      }"
                      class="rounded-full py-0 px-3"
                      @click="this.tipoPeriodo = '12M'"
                    >
                      12M
                    </div>
                    <div
                      :class="{
                        'bg-blue-500 text-white font-semibold':
                          this.tipoPeriodo === '3M',
                      }"
                      class="rounded-full py-0 px-3"
                      @click="this.tipoPeriodo = '3M'"
                    >
                      3M
                    </div>
                  </div>
                </div>
                <div class="flex-1 font-semibold text-black cursor-default text-center">
                  Balanço {{ this.balancoData }}
                </div>
              </div>

              <!-- DRE / Balanço Row 1 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["ReceitaLiquida"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('ReceitaLiquida')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["ReceitaLiquida"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["ReceitaLiquida"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('ReceitaLiquida')"
                    class="cursor-pointer text-black"
                    >{{
                      this.itensTrimestral["ReceitaLiquida"].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["PatrimonioLiquido"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('PatrimonioLiquido')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["PatrimonioLiquido"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 2 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["Custos"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('Custos')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["Custos"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["Custos"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('Custos')"
                    class="cursor-pointer text-black"
                    >{{ this.itensTrimestral["Custos"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["AtivoTotal"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('AtivoTotal')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["AtivoTotal"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 3 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["ResultadoBruto"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('ResultadoBruto')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["ResultadoBruto"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["ResultadoBruto"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('ResultadoBruto')"
                    class="cursor-pointer text-black"
                    >{{
                      this.itensTrimestral["ResultadoBruto"].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["PassivoTotal"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('PassivoTotal')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["PassivoTotal"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 4 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["DespesasReceitasOperacionaisOuAdministrativas"]
                      .indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="
                      showChartItem(
                        'DespesasReceitasOperacionaisOuAdministrativas'
                      )
                    "
                    class="cursor-pointer text-black"
                    >{{
                      this.itens[
                        "DespesasReceitasOperacionaisOuAdministrativas"
                      ].valueString
                    }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral[
                      "DespesasReceitasOperacionaisOuAdministrativas"
                    ].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="
                      showChartItemTrimestral(
                        'DespesasReceitasOperacionaisOuAdministrativas'
                      )
                    "
                    class="cursor-pointer text-black"
                    >{{
                      this.itensTrimestral[
                        "DespesasReceitasOperacionaisOuAdministrativas"
                      ].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["DividaBruta"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('DividaBruta')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["DividaBruta"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 5 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["EBIT"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('EBIT')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["EBIT"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["EBIT"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('EBIT')"
                    class="cursor-pointer text-black"
                    >{{ this.itensTrimestral["EBIT"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["DividaLiquida"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('DividaLiquida')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["DividaLiquida"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 6 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["EBITDA"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('EBITDA')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["EBITDA"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["EBITDA"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('EBITDA')"
                    class="cursor-pointer text-black"
                    >{{ this.itensTrimestral["EBITDA"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["Disponibilidades"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('Disponibilidades')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["Disponibilidades"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 7 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["ResultadoFinanceiro"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('ResultadoFinanceiro')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["ResultadoFinanceiro"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["ResultadoFinanceiro"]
                      .indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('ResultadoFinanceiro')"
                    class="cursor-pointer text-black"
                    >{{
                      this.itensTrimestral["ResultadoFinanceiro"].valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["AtivoCirculante"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('AtivoCirculante')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["AtivoCirculante"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 8 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["LAIR"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('LAIR')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["LAIR"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["LAIR"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('LAIR')"
                    class="cursor-pointer text-black"
                    >{{ this.itensTrimestral["LAIR"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["AtivoNaoCirculante"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('AtivoNaoCirculante')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["AtivoNaoCirculante"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 9 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["Impostos"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('Impostos')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["Impostos"].valueString }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["Impostos"].indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItemTrimestral('Impostos')"
                    class="cursor-pointer text-black"
                    >{{ this.itensTrimestral["Impostos"].valueString }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["PassivoCirculante"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('PassivoCirculante')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["PassivoCirculante"].valueString }}</span
                  >
                </div>
              </div>

              <!-- DRE / Balanço Row 9 -->
              <div class="flex">
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itens["LucroLiquidoSociosControladora"]
                      .indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '12M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="showChartItem('LucroLiquidoSociosControladora')"
                    class="cursor-pointer text-black"
                    >{{
                      this.itens["LucroLiquidoSociosControladora"].valueString
                    }}</span
                  >
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 bg-sky-100 text-right"
                >
                  <span class="cursor-default text-black">{{
                    this.itensTrimestral["LucroLiquidoSociosControladora"]
                      .indicadorNomeBonito
                  }}</span>
                </div>
                <div
                  v-if="tipoPeriodo === '3M'"
                  class="flex-1 px-4 py-0 text-left"
                >
                  <span
                    @click="
                      showChartItemTrimestral('LucroLiquidoSociosControladora')
                    "
                    class="cursor-pointer text-black"
                    >{{
                      this.itensTrimestral["LucroLiquidoSociosControladora"]
                        .valueString
                    }}</span
                  >
                </div>
                <div class="flex-1 px-4 py-0 bg-sky-100 text-right">
                  <span class="cursor-default text-black">{{
                    this.itens["PassivoNaoCirculante"].indicadorNomeBonito
                  }}</span>
                </div>
                <div class="flex-1 px-4 py-0 text-left">
                  <span
                    @click="showChartItem('PassivoNaoCirculante')"
                    class="cursor-pointer text-black"
                    >{{ this.itens["PassivoNaoCirculante"].valueString }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="mt-8 p-2 bg-blue-400 text-white text-center">
        Dados da
        <a
          href="https://fintz.com.br"
          target="_blank"
          class="underline text-white"
          >API Fintz.com.br</a
        >
      </footer>
    </div>

    <div
      v-if="isLoading"
      stroke="blue"
      class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <div>
        <ProgressSpinner
          style="width: 100px; height: 100px"
          strokeWidth="8"
          animationDuration=".5s"
        />
      </div>
    </div>

    <Dialog
      v-model:visible="isChartVisible"
      modal
      :header="chartTitle"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <LineChart
        type="line"
        :chart-data="chartData"
        :chart-options="chartOptions"
      />
    </Dialog>
  </div>
</template>

<script>
import tooltip from "@/tooltip";
import Fintz from "@/fintz";

export default {
  name: "App",

  props: {
    ticker: String,
  },

  watch: {
    // Whenever the ticker prop changes, this function will run
    ticker(newTicker, oldTicker) {
      console.log("ticker " + this.ticker);
      this.fetchData(newTicker);
    },
  },

  mounted() {
    if (this.ticker) {
      this.fetchData(this.ticker);
    }
  },

  data() {
    return {
      tooltip,
      currentIndicatorKey: "",
      isChartVisible: false,
      visible: true,
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {},
      chartTitle: "",
      cotacoes: [],
      lockedTicker: "",
      balancoData: "",
      tipoPeriodo: "12M",
      isLoading: false,
      indicators: {
        ValorDeMercado: { indicadorNomeBonito: "Market Cap", value: "" },
        EV: { indicadorNomeBonito: "EV", value: "" },
        DividendYield: { indicadorNomeBonito: "DY", value: "" },
        P_L: { indicadorNomeBonito: "P/L", value: "" },
        P_VP: { indicadorNomeBonito: "P/VP", value: "" },
        EV_EBITDA: { indicadorNomeBonito: "EV/EBITDA", value: "" },
        EV_EBIT: { indicadorNomeBonito: "EV/EBIT", value: "" },
        P_EBITDA: { indicadorNomeBonito: "P/EBITDA", value: "" },
        P_EBIT: { indicadorNomeBonito: "P/EBIT", value: "" },
        VPA: { indicadorNomeBonito: "VPA", value: "" },
        P_Ativos: { indicadorNomeBonito: "P/Ativo", value: "" },
        LPA: { indicadorNomeBonito: "LPA", value: "" },
        P_SR: { indicadorNomeBonito: "P/SR", value: "" },
        P_CapitalDeGiro: { indicadorNomeBonito: "P/Cap Giro", value: "" },
        P_AtivoCirculanteLiquido: {
          indicadorNomeBonito: "P/Ativo Circ Liq",
          value: "",
        },
        DividaLiquida_PatrimonioLiquido: {
          indicadorNomeBonito: "Dív Liq/PL",
          value: "",
        },
        DividaLiquida_EBITDA: {
          indicadorNomeBonito: "Dív Liq/EBITDA",
          value: "",
        },
        DividaLiquida_EBIT: { indicadorNomeBonito: "Dív Liq/EBIT", value: "" },
        PatrimonioLiquido_Ativos: {
          indicadorNomeBonito: "PL/Ativos",
          value: "",
        },
        Passivos_Ativos: { indicadorNomeBonito: "Passivos/Ativos", value: "" },
        LiquidezCorrente: { indicadorNomeBonito: "Liq Corrente", value: "" },
        MargemBruta: { indicadorNomeBonito: "M. Bruta", value: "" },
        MargemEBITDA: { indicadorNomeBonito: "M. EBITDA", value: "" },
        MargemEBIT: { indicadorNomeBonito: "M. EBIT", value: "" },
        MargemLiquida: { indicadorNomeBonito: "M. Líq", value: "" },
        ROE: { indicadorNomeBonito: "ROE", value: "" },
        ROIC: { indicadorNomeBonito: "ROIC", value: "" },
        ROA: { indicadorNomeBonito: "ROA", value: "" },
        GiroAtivos: { indicadorNomeBonito: "Giro Ativos", value: "" },
      },
      itens: {
        ReceitaLiquida: { indicadorNomeBonito: "Receita", value: "" },
        Custos: { indicadorNomeBonito: "Custos", value: "" },
        ResultadoBruto: { indicadorNomeBonito: "Res. Bruto", value: "" },
        DespesasReceitasOperacionaisOuAdministrativas: {
          indicadorNomeBonito: "Despesas",
          value: "",
        },
        EBIT: { indicadorNomeBonito: "EBIT", value: "" },
        EBITDA: { indicadorNomeBonito: "EBITDA", value: "" },
        ResultadoFinanceiro: { indicadorNomeBonito: "Res. Financ.", value: "" },
        LAIR: { indicadorNomeBonito: "LAIR", value: "" },
        Impostos: { indicadorNomeBonito: "Impostos", value: "" },
        LucroLiquidoSociosControladora: {
          indicadorNomeBonito: "Lucro Líq.",
          value: "",
        },
        PatrimonioLiquido: { indicadorNomeBonito: "PL", value: "" },
        AtivoTotal: { indicadorNomeBonito: "Ativo", value: "" },
        PassivoTotal: { indicadorNomeBonito: "Passivo", value: "" },
        DividaBruta: { indicadorNomeBonito: "Dív. Bruta", value: "" },
        DividaLiquida: { indicadorNomeBonito: "Dív. Líquida", value: "" },
        CaixaEquivalentes: { indicadorNomeBonito: "Caixa e Equiv.", value: "" },
        Disponibilidades: { indicadorNomeBonito: "Dispon.", value: "" },
        PassivoCirculante: { indicadorNomeBonito: "Passivo Circ.", value: "" },
        PassivoNaoCirculante: {
          indicadorNomeBonito: "Passivo N. Circ.",
          value: "",
        },
        ReceitasFinanceiras: {
          indicadorNomeBonito: "Receitas Fin.",
          value: "",
        },
        DespesasFinanceiras: {
          indicadorNomeBonito: "Despesas Fin.",
          value: "",
        },
        AtivoCirculante: { indicadorNomeBonito: "Ativo Circ.", value: "" },
        AtivoNaoCirculante: {
          indicadorNomeBonito: "Ativo N. Circ.",
          value: "",
        },
        EquivalenciaPatrimonial: {
          indicadorNomeBonito: "Eq. Patrimonial",
          value: "",
        },
      },
      itensTrimestral: {
        ReceitaLiquida: { indicadorNomeBonito: "Receita", value: "" },
        Custos: { indicadorNomeBonito: "Custos", value: "" },
        ResultadoBruto: { indicadorNomeBonito: "Res. Bruto", value: "" },
        DespesasReceitasOperacionaisOuAdministrativas: {
          indicadorNomeBonito: "Despesas",
          value: "",
        },
        EBIT: { indicadorNomeBonito: "EBIT", value: "" },
        EBITDA: { indicadorNomeBonito: "EBITDA", value: "" },
        ResultadoFinanceiro: { indicadorNomeBonito: "Res. Financ.", value: "" },
        LAIR: { indicadorNomeBonito: "LAIR", value: "" },
        Impostos: { indicadorNomeBonito: "Impostos", value: "" },
        LucroLiquidoSociosControladora: {
          indicadorNomeBonito: "Lucro Líq.",
          value: "",
        },
        PatrimonioLiquido: { indicadorNomeBonito: "PL", value: "" },
        AtivoTotal: { indicadorNomeBonito: "Ativo", value: "" },
        PassivoTotal: { indicadorNomeBonito: "Passivo", value: "" },
        DividaBruta: { indicadorNomeBonito: "Dív. Bruta", value: "" },
        DividaLiquida: { indicadorNomeBonito: "Dív. Líquida", value: "" },
        CaixaEquivalentes: { indicadorNomeBonito: "Caixa e Equiv.", value: "" },
        Disponibilidades: { indicadorNomeBonito: "Dispon.", value: "" },
        PassivoCirculante: { indicadorNomeBonito: "Passivo Circ.", value: "" },
        PassivoNaoCirculante: {
          indicadorNomeBonito: "Passivo N. Circ.",
          value: "",
        },
        ReceitasFinanceiras: {
          indicadorNomeBonito: "Receitas Fin.",
          value: "",
        },
        DespesasFinanceiras: {
          indicadorNomeBonito: "Despesas Fin.",
          value: "",
        },
        AtivoCirculante: { indicadorNomeBonito: "Ativo Circ.", value: "" },
        AtivoNaoCirculante: {
          indicadorNomeBonito: "Ativo N. Circ.",
          value: "",
        },
        EquivalenciaPatrimonial: {
          indicadorNomeBonito: "Eq. Patrimonial",
          value: "",
        },
      },
    };
  },
  methods: {
    updateTicker(ticker) {
      this.ticker = ticker;
    },

    async fetchData() {
      this.isLoading = true;
      this.cleanUI();
      await this.buscarIndicadores(); // only wait for this one so seems fast
      this.buscarItensContabeis(); // loads later
      this.buscarItensContabeisTrimestral(); // loads later
      this.buscarCotacoes(); // loads later
      this.isLoading = false;
      this.lockedTicker = this.ticker; // so changing input field doesn't mess up headers
    },

    // cleaning the UI (resets data)
    cleanUI() {
      this.cotacoes = [];
      this.balancoData = "";
      Object.keys(this.indicators).forEach((key) => {
        this.indicators[key].value = "";
        this.indicators[key].valueString = "";
      });
      Object.keys(this.itens).forEach((key) => {
        this.itens[key].value = "";
        this.itens[key].valueString = "";
      });
    },

    async buscarIndicadores() {
      try {
        const data = await Fintz.getFintzIndicadores(this.ticker);
        await this.processarIndicadores.call(this, data); // Use `.call` to ensure `this` context is preserved
      } catch (error) {
        console.error("Failed to fetch or process stock indicators:", error);
      }
    },

    async processarIndicadores(data) {
      try {
        // Assuming 'this.indicators' is available in the scope this function is called
        Object.keys(this.indicators).forEach((indicatorKey) => {
          const apiValue =
            data.find((item) => item.indicador === indicatorKey)?.valor || "-";
          this.indicators[indicatorKey].value = apiValue;
        });

        // After updating values, format them
        this.formatarStringIndicadores();
      } catch (error) {
        console.error("Error processing stock data:", error);
        // Handle error for each indicator
        Object.keys(this.indicators).forEach((indicatorKey) => {
          this.indicators[indicatorKey].valueString = "Error";
        });
        this.formatarStringIndicadores(); // Format even if there's an error to ensure consistent UI
      }
    },

    formatarStringIndicadores() {
      Object.keys(this.indicators).forEach((indicatorKey) => {
        let formattedValue = this.indicators[indicatorKey].value;
        if (
          !isNaN(formattedValue) &&
          formattedValue !== "-" &&
          formattedValue !== "Error"
        ) {
          const percentIndicators = {
            DividendYield: true,
            MargemBruta: true,
            MargemEBITDA: true,
            MargemEBIT: true,
            MargemLiquida: true,
            ROE: true,
            ROIC: true,
            ROA: true,
          };
          const currencyIndicators = {
            EV: true,
            ValorDeMercado: true,
          };
          if (
            !(indicatorKey in percentIndicators) &&
            !(indicatorKey in currencyIndicators)
          ) {
            const formatter = Intl.NumberFormat("pt-br", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            });
            formattedValue = formatter.format(formattedValue);
          }
          if (indicatorKey in percentIndicators) {
            const formatter = Intl.NumberFormat("pt-br", {
              style: "percent",
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            });
            formattedValue = formatter.format(formattedValue);
          }
          if (indicatorKey in currencyIndicators) {
            const formatter = Intl.NumberFormat("en-US", {
              notation: "compact",
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            });
            formattedValue = formatter.format(formattedValue);
          }
        }
        this.indicators[indicatorKey].valueString = formattedValue;
      });
    },

    async buscarCotacoes() {
      try {
        const data = await Fintz.getFintzCotacoes(this.ticker);
        this.processarCotacoes.call(this, data); // Ensure 'this' context is correct
      } catch (error) {
        console.error("Failed to fetch or set stock price history:", error);
      }
    },

    processarCotacoes(data) {
      this.cotacoes = data;
    },

    async buscarItensContabeis() {
      try {
        const data = await Fintz.getFintzItensContabeis(this.ticker, "12M");
        await this.processarItensContabeis.call(this, data); // Ensure 'this' context is correct
      } catch (error) {
        console.error("Failed to fetch or process stock items:", error);
      }
    },

    async processarItensContabeis(data) {
      try {
        // Assuming 'this.balancoData' and 'this.itens' are available in this scope
        this.balancoData = data[0]["ano"] + " T" + data[0]["trimestre"];

        Object.keys(this.itens).forEach((itemKey) => {
          const apiValue =
            data.find((item) => item.item === itemKey)?.valor || "-";
          this.itens[itemKey].value = apiValue;
        });

        // After updating values, format them
        this.formatarStringItens();
      } catch (error) {
        console.error("Error processing stock items:", error);
        // Handle error for each indicator
        Object.keys(this.itens).forEach((itemKey) => {
          this.itens[itemKey].valueString = "Error";
        });
        this.formatarStringItens(); // Format even if there's an error to ensure consistent UI
      }
    },

    formatarStringItens() {
      Object.keys(this.itens).forEach((itemKey) => {
        let formattedValue = this.itens[itemKey].value;
        const value = formattedValue;
        if (
          !isNaN(formattedValue) &&
          formattedValue !== "-" &&
          formattedValue !== "Error"
        ) {
          // const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
          // formattedValue = formatter.format(formattedValue)
          const formatter = new Intl.NumberFormat("en", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
            notation: "compact",
          });

          formattedValue = formatter.format(value);
        }
        this.itens[itemKey].valueString = formattedValue;
      });
    },

    async buscarItensContabeisTrimestral() {
      try {
        const data = await Fintz.getFintzItensContabeis(
          this.ticker,
          "TRIMESTRAL"
        );
        await this.processarItensContabeisTrimestral.call(this, data); // Ensure 'this' context is correct
      } catch (error) {
        console.error(
          "Failed to fetch or process stock items (trimestral):",
          error
        );
      }
    },

    async processarItensContabeisTrimestral(data) {
      try {
        Object.keys(this.itensTrimestral).forEach((itemKey) => {
          const apiValue =
            data.find((item) => item.item === itemKey)?.valor || "-";
          this.itensTrimestral[itemKey].value = apiValue;
        });

        // After updating values, format them
        this.formatarStringItensTrimestral();
      } catch (error) {
        console.error("Error processing stock items:", error);
        // Handle error for each indicator
        Object.keys(this.itensTrimestral).forEach((itemKey) => {
          this.itensTrimestral[itemKey].valueString = "Error";
        });
        this.formatarStringItensTrimestral(); // Format even if there's an error to ensure consistent UI
      }
    },

    formatarStringItensTrimestral() {
      Object.keys(this.itensTrimestral).forEach((itemKey) => {
        let formattedValue = this.itensTrimestral[itemKey].value;
        const value = formattedValue;
        if (
          !isNaN(formattedValue) &&
          formattedValue !== "-" &&
          formattedValue !== "Error"
        ) {
          // const formatter = Intl.NumberFormat('pt-br', { notation: 'compact', style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
          // formattedValue = formatter.format(formattedValue)
          const formatter = new Intl.NumberFormat("en", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
            notation: "compact",
          });

          formattedValue = formatter.format(value);
        }
        this.itensTrimestral[itemKey].valueString = formattedValue;
      });
    },

    showChart(indicatorKey) {
      if (this.ticker !== "") {
        this.chartData = {}; // resetting
        this.chartOptions = {}; // resetting
        this.currentIndicatorKey = indicatorKey;
        this.isChartVisible = true;
        if (this.currentIndicatorKey == "Preço") {
          this.chartTitle = this.ticker.toUpperCase() + " Cotação";
          this.loadChartDataPrice(indicatorKey);
        } else {
          this.chartTitle =
            this.ticker.toUpperCase() +
            " " +
            this.indicators[indicatorKey].indicadorNomeBonito;
          this.loadChartData(indicatorKey);
        }
      }
    },

    showChartItem(indicatorKey) {
      if (this.ticker !== "") {
        this.chartData = {}; // resetting
        this.chartOptions = {}; // resetting
        this.currentIndicatorKey = indicatorKey;
        this.isChartVisible = true;
        this.chartTitle =
          this.ticker.toUpperCase() +
          " " +
          this.itens[indicatorKey].indicadorNomeBonito;

        const not_12m = [
          "PatrimonioLiquido",
          "AtivoTotal",
          "PassivoTotal",
          "DividaBruta",
          "DividaLiquida",
          "CaixaEquivalentes",
          "Disponibilidades",
          "PassivoCirculante",
          "PassivoNaoCirculante",
          "AtivoCirculante",
          "AtivoNaoCirculante",
        ];
        if (!not_12m.includes(indicatorKey)) {
          this.chartTitle += " 12m";
        }

        this.loadChartDataItem(indicatorKey);
      }
    },

    showChartItemTrimestral(indicatorKey) {
      if (this.ticker !== "") {
        this.chartData = {}; // resetting
        this.chartOptions = {}; // resetting
        this.currentIndicatorKey = indicatorKey;
        this.isChartVisible = true;
        this.chartTitle =
          this.ticker.toUpperCase() +
          " " +
          this.itensTrimestral[indicatorKey].indicadorNomeBonito;

        const not_12m = [
          "PatrimonioLiquido",
          "AtivoTotal",
          "PassivoTotal",
          "DividaBruta",
          "DividaLiquida",
          "CaixaEquivalentes",
          "Disponibilidades",
          "PassivoCirculante",
          "PassivoNaoCirculante",
          "AtivoCirculante",
          "AtivoNaoCirculante",
        ];
        if (!not_12m.includes(indicatorKey)) {
          this.chartTitle += " Trimestral";
        }

        this.loadChartDataItem(indicatorKey, "TRIMESTRAL");
      }
    },

    loadChartDataItem(indicatorKey, tipoPeriodo = "12M") {
      this.fetchStockItemHistory(indicatorKey, tipoPeriodo)
        .then((historicalData) => {
          if (!historicalData) {
            console.error("No historical data available");
            return;
          }

          const data = historicalData.map((item) => item.valor);

          // Function to map 'ano' and 'trimestre' to a date string
          const mapToQuarterEndMonth = (year, quarter) => {
            const month_day =
              quarter === 1
                ? "03-31"
                : quarter === 2
                ? "06-30"
                : quarter === 3
                ? "09-30"
                : "12-31";
            return `${year}-${month_day}`;
          };

          // Generating labels using 'ano' and 'trimestre'
          const labels = historicalData.map((item) =>
            mapToQuarterEndMonth(item.ano, item.trimestre)
          );

          // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
          const chartData = {
            labels: labels, // Extracting dates
            datasets: [
              {
                label:
                  tipoPeriodo == "12M"
                    ? this.itens[indicatorKey].indicadorNomeBonito
                    : this.itensTrimestral[indicatorKey].indicadorNomeBonito, // You might want to customize this label
                data: data,
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Background color of the dataset (area under the line)
                fill: true,
                borderColor: "rgba(54, 162, 235, 1)", // Border color of the line
                borderWidth: 1,
                pointRadius: 3, // Smaller point radius for smaller dots
                pointBackgroundColor: "rgba(54, 162, 235, 1)", // Solid color for dots
                pointBorderColor: "rgba(54, 162, 235, 1)", // Ensuring the border color matches the fill for a solid appearance
              },
            ],
          };

          const options = {
            scales: {
              x: {
                type: "time", // Specify that this is a time series scale
                time: {
                  unit: "month", // Display ticks in month intervals
                  displayFormats: {
                    month: "yyyy-MM", // Format dates as 'Year-Month'
                  },
                },
                ticks: {
                  autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
                  maxTicksLimit: 60, // Maximum number of ticks displayed
                },
              },
              y: {
                ticks: {
                  callback: function (value) {
                    const formatter = Intl.NumberFormat("pt-br", {
                      notation: "compact",
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                    });
                    return formatter.format(value);
                  },
                },
              },
            },
          };

          // Assigning formatted chartData for chart rendering
          this.chartData = chartData;
          this.chartOptions = options;
        })
        .catch((error) => {
          console.error("Error loading chart ITEM data:", error);
        });
    },

    loadChartData(indicatorKey) {
      this.fetchStockIndicatorHistory(indicatorKey)
        .then((historicalData) => {
          if (!historicalData) {
            console.error("No historical data available");
            return;
          }

          // Check if the indicator is 'DividendYield' and multiply by 100 for percentage format
          const data = historicalData.map((item) => {
            return indicatorKey === "DividendYield"
              ? item.valor * 100
              : indicatorKey === "MargemBruta"
              ? item.valor * 100
              : indicatorKey === "MargemEBITDA"
              ? item.valor * 100
              : indicatorKey === "MargemEBIT"
              ? item.valor * 100
              : indicatorKey === "MargemLiquida"
              ? item.valor * 100
              : indicatorKey === "ROE"
              ? item.valor * 100
              : indicatorKey === "ROA"
              ? item.valor * 100
              : indicatorKey === "ROIC"
              ? item.valor * 100
              : item.valor;
          });

          // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
          const chartData = {
            labels: historicalData.map((item) => item.data), // Extracting dates
            datasets: [
              {
                label: indicatorKey, // You might want to customize this label
                data: data, // Extracting values
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Background color of the dataset (area under the line)
                fill: true,
                borderColor: "rgba(54, 162, 235, 1)", // Border color of the line
                borderWidth: 1,
                pointRadius: 2, // Smaller point radius for smaller dots
                pointBackgroundColor: "rgba(54, 162, 235, 1)", // Solid color for dots
                pointBorderColor: "rgba(54, 162, 235, 1)", // Ensuring the border color matches the fill for a solid appearance
              },
            ],
          };

          const percentIndicators = {
            DividendYield: true,
            MargemBruta: true,
            MargemEBITDA: true,
            MargemEBIT: true,
            MargemLiquida: true,
            ROE: true,
            ROIC: true,
            ROA: true,
          };

          const currencyIndicators = {
            EV: true,
            ValorDeMercado: true,
          };

          const options = {
            scales: {
              x: {
                type: "time", // Specify that this is a time series scale
                time: {
                  unit: "month", // Display ticks in month intervals
                  displayFormats: {
                    month: "yyyy-MM", // Format dates as 'Year-Month'
                  },
                },
                ticks: {
                  autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
                  maxTicksLimit: 60, // Maximum number of ticks displayed
                },
              },
              y: {
                ticks: {
                  // Format y-axis ticks based on the indicatorKey
                  callback: function (value) {
                    // Check if the indicatorKey requires percentage formatting
                    if (percentIndicators[indicatorKey]) {
                      return `${value}%`; // Format as percentage
                    } else if (currencyIndicators) {
                      const formatter = Intl.NumberFormat("pt-br", {
                        notation: "compact",
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                      });
                      return formatter.format(value);
                    } else {
                      return value.toFixed(2); // Format as a decimal with two places
                    }
                  },
                },
              },
            },
          };

          // Assigning formatted chartData for chart rendering
          this.chartData = chartData;
          this.chartOptions = options;
        })
        .catch((error) => {
          console.error("Error loading chart INDICATOR data:", error);
        });
    },

    loadChartDataPrice(indicatorKey) {
      // Assuming this.cotacoes contains your dataset and you want to extract precoFechamentoAjustado
      const totalPoints = this.cotacoes.length;
      const maxPoints = 200;

      // Calculate the interval for sampling. Use Math.ceil to ensure you're rounding up to avoid skipping too many points.
      const interval = Math.ceil(totalPoints / maxPoints);

      // Initialize an array to hold the sampled data points
      let sampledData = [];
      let sampledDate = [];

      // Ensure the most recent data point is always included
      sampledData.push(this.cotacoes[0].precoFechamentoAjustado);
      sampledDate.push(this.cotacoes[0].data);

      // Iterate over the dataset in reverse, starting from the end, to pick data points at the calculated interval
      for (let i = totalPoints - 1; i > 0; i -= interval) {
        // Add the data point from the calculated position to the sampledData array
        // Use totalPoints - i - 1 to access data in reverse order
        const index = totalPoints - i - 1;
        if (index !== 0) {
          // Avoid adding the most recent data point again
          sampledData.push(this.cotacoes[index].precoFechamentoAjustado);
          sampledDate.push(this.cotacoes[index].data);
        }
      }

      // Since we iterated in reverse, reverse the array to start with the most recent data point
      sampledData = sampledData.reverse();
      sampledDate = sampledDate.reverse();

      // Assuming chartData expects 'labels' for the x-axis (dates) and 'datasets' containing 'data' for the y-axis (values)
      const chartData = {
        labels: sampledDate, // Extracting dates
        datasets: [
          {
            label: indicatorKey, // You might want to customize this label
            data: sampledData, // Extracting values
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Background color of the dataset (area under the line)
            fill: true,
            borderColor: "rgba(54, 162, 235, 1)", // Border color of the line
            borderWidth: 1,
            pointRadius: 2, // Smaller point radius for smaller dots
            pointBackgroundColor: "rgba(54, 162, 235, 1)", // Solid color for dots
            pointBorderColor: "rgba(54, 162, 235, 1)", // Ensuring the border color matches the fill for a solid appearance
          },
        ],
      };

      const options = {
        scales: {
          x: {
            type: "time", // Specify that this is a time series scale
            time: {
              unit: "month", // Display ticks in month intervals
              displayFormats: {
                month: "yyyy-MM", // Format dates as 'Year-Month'
              },
            },
            ticks: {
              autoSkip: true, // Enable automatic skipping of ticks to prevent overlap
              maxTicksLimit: 60, // Maximum number of ticks displayed
            },
          },
          y: {
            ticks: {
              callback: function (value) {
                const formatter = Intl.NumberFormat("pt-br", {
                  notation: "compact",
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                });
                return formatter.format(value);
              },
            },
          },
        },
      };

      // Assigning formatted chartData for chart rendering
      this.chartData = chartData;
      this.chartOptions = options;
    },

    async fetchStockItemHistory(indicatorKey, tipoPeriodo = "12M") {
      const URL_BASE = "https://api.fintz.com.br";
      const HEADERS = { "X-API-Key": "chave-de-teste-api-fintz" };
      const not_12m = [
        "PatrimonioLiquido",
        "AtivoTotal",
        "PassivoTotal",
        "DividaBruta",
        "DividaLiquida",
        "CaixaEquivalentes",
        "Disponibilidades",
        "PassivoCirculante",
        "PassivoNaoCirculante",
        "AtivoCirculante",
        "AtivoNaoCirculante",
      ];

      if (not_12m.includes(indicatorKey)) {
        tipoPeriodo = "TRIMESTRAL";
      }

      const PARAMS = new URLSearchParams({
        item: indicatorKey,
        ticker: this.ticker.toUpperCase(),
        tipoPeriodo: tipoPeriodo,
      });

      const endpoint = `${URL_BASE}/bolsa/b3/avista/itens-contabeis/historico?${PARAMS.toString()}`;

      try {
        const response = await fetch(endpoint, { headers: HEADERS });
        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Failed to fetch stock ITEM history:", error);
      }
    },

    async fetchStockIndicatorHistory(indicatorKey) {
      const URL_BASE = "https://api.fintz.com.br";
      const HEADERS = { "X-API-Key": "chave-de-teste-api-fintz" };
      const PARAMS = new URLSearchParams({
        indicador: indicatorKey,
        ticker: this.ticker.toUpperCase(),
      });

      const endpoint = `${URL_BASE}/bolsa/b3/avista/indicadores/historico?${PARAMS.toString()}`;

      try {
        const response = await fetch(endpoint, { headers: HEADERS });
        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Failed to fetch stock INDICATOR history:", error);
      }
    },
  },

  computed: {
    isChartDataReady() {
      return true; // Or any other appropriate check
    },
  },
};
</script>

<style>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 1s linear infinite /* Safari */;
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
