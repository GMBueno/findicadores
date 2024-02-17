<template>
  <nav class="flex items-center py-3 justify-between mb-12 px-10 bg-white text-slate-600">
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
</template>

<script>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  name: 'Navbar',

  components: {
    InputText,
    Button
  },

  data() {
    return {
      ticker: '', // Assuming ticker is a local data property
    };
  },
  methods: {
    fetchData() {
      this.$emit('update:ticker', this.ticker)
      this.$emit('fetchData', this.ticker);
    }
  }
}
</script>