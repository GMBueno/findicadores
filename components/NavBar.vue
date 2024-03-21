<template>
  <nav
    class="flex items-center py-3 justify-between mb-7 px-10 bg-white text-slate-600"
  >
    <div class="flex items-center">
      <img src="@/assets/icone-positivo.png" alt="Logo" class="h-8 mr-2" />
      <h2 class="text-2xl font-semibold">findicadores.com.br</h2>
    </div>
    <div class="flex items-center">
      <InputText
        v-model="ticker"
        placeholder="Digite o código (ex: BBAS3)"
        @keypress.enter="goTo"
        class="mt-0 w-60 px-2 py-1 placeholder:normal-case uppercase bg-slate-200 border border-slate-400 text-zinc-700 placeholder-zinc-500 mr-4"
      />
      <Button
        label="Buscar"
        @click="goTo"
        class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 px-5 text-center py-1"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter();

const ticker = ref<string | null>(null);

const goTo = () => {
  if (!ticker.value) return;
  router.push(`/${ticker.value}`);
};
</script>
