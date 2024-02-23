<template>
  <nav class="flex items-center py-3 justify-between mb-7 px-10 bg-white text-slate-600">
    <div class="flex items-center">
      <img src="/src/assets/icone-positivo.png" alt="Logo" class="h-8 mr-2">
      <h2 class="text-2xl font-semibold">findicadores.com.br</h2>
    </div>
    <div class="flex items-center">
      <InputText v-model="ticker" placeholder="Digite o código (ex: BBAS3)" @keypress.enter="updateUrl" class="mt-0 w-60 px-2 py-1 placeholder:normal-case uppercase bg-slate-200 border border-slate-400 text-zinc-700 placeholder-zinc-500 mr-4" />
      <Button label="Buscar" @click="updateUrl" class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 px-5 text-center py-1" />
    </div>
  </nav>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',

  components: {
    InputText,
    Button,
  },

  data() {
    return {
      ticker: '', // Local state for the ticker input
    };
  },

  methods: {
    updateUrl() {
      if (this.ticker) {
        this.$router.push({ path: `/${this.ticker.toUpperCase()}` }).catch(err => {
          if (err.name != "NavigationDuplicated" && !err.message.includes('Avoided redundant navigation to current location')) {
            // Handle any errors that aren't navigation duplication errors
            console.error(err);
          }
        })
      }
    },
  },
};
</script>
