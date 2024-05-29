<template>
  <nav
    class="flex items-center py-3 justify-between px-10 bg-white text-slate-600"
  >
    <div class="flex items-center">
      <img src="@/assets/icone-positivo.png" alt="Logo" class="h-8 mr-2" />
      <h2 class="text-xl font-semibold cursor-default">findicadores.com.br</h2>
    </div>
    <div class="flex items-center gap-4">
      <div class="p-inputgroup border border-slate-200 rounded-md overflow-hidden focus:border-blue-400">
        <InputText
          v-model="ticker"
          placeholder="Digite o ticker (ex: BBAS3)"
          @keypress.enter="goToTicker"
          class="placeholder:normal-case w-52 uppercase py-1 pl-3 text-blue-400 focus:font-semibold placeholder:font-normal placeholder-zinc-400 rounded-none focus:outline-none focus:ring-0"
        />
        <span class="p-inputgroup-addon cursor-pointer bg-white rounded-none" @click="goToTicker">
          <i class="pi pi-search text-blue-400"></i>
        </span>
      </div>
      <Button
        label="Login"
        @click="() => signIn('auth0')"
        class="bg-white flex items-center justify-center hover:bg-blue-200 border border-slate-200 text-zinc-400 text-center py-1 px-5"
        v-if="status === 'unauthenticated'"
      />
      <Button
        label="Logout"
        @click="() => signOut()"
        class="bg-white flex items-center justify-center hover:bg-blue-200 border border-slate-200 text-zinc-400 text-center py-1 px-5"
        v-if="status === 'authenticated'"
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
