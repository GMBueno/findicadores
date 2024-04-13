<template>
    <Indicadores :ticker="route.params.ticker" />
</template>

<script setup lang="ts">
const route = useRoute()
</script>