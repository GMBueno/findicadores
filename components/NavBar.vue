<template>
  <nav
    class="flex items-center py-3 justify-between px-10 bg-white text-slate-600"
  >
    <div class="flex items-center">
      <img src="@/assets/icone-positivo.png" alt="Logo" class="h-8 mr-2" />
      <h2 class="text-2xl font-semibold cursor-default">findicadores.com.br</h2>
    </div>
    <div class="flex items-center gap-3">
      <Button
        label="Login"
        @click="() => signIn('auth0')"
        class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 text-center py-1 px-5"
        v-if="status === 'unauthenticated'"
      />
      <Button
        label="Logout"
        @click="() => signOut()"
        class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 text-center py-1 px-5"
        v-if="status === 'authenticated'"
      />
      <InputText
        v-model="ticker"
        placeholder="Digite o código (ex: BBAS3)"
        @keypress.enter="goToTicker"
        class="mt-0 w-60 px-2 py-1 placeholder:normal-case uppercase bg-slate-200 border border-slate-400 text-zinc-700 placeholder-zinc-500"
      />
      <Button
        label="Buscar"
        @click="goToTicker"
        class="bg-slate-200 hover:bg-slate-300 border border-slate-400 text-zinc-700 px-5 text-center py-1"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
const {signIn, signOut, status} = useAuth()

const router = useRouter();

const ticker = ref<string | null>(null);

const goToTicker = () => {
  if (!ticker.value) return;
  router.push(`/${ticker.value}`);
};
</script>
