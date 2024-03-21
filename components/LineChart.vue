<template>
  <div>
    <Chart type="line" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
  components: {
    Chart,
  },

  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      required: true
    }
  }
};
</script>