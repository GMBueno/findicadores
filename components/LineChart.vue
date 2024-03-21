<template>
  <div>
    <ClientOnly>
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import "chartjs-adapter-date-fns";
import Chart from "primevue/chart";

interface Props {
  chartData: Object;
  chartOptions: Object;
}

defineProps<Props>();
</script>
