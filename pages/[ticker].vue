<script setup lang="ts">
const route = useRoute()

</script>

<template>
    <Indicadores :ticker="route.params.ticker" />
</template>
