import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/router'; // Import the router configuration
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primevue/resources/primevue.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import 'chartjs-adapter-date-fns';
import Tooltip from 'primevue/tooltip';
import Chart from 'primevue/chart';
import Dialog from 'primevue/dialog'; // Import Dialog

const app = createApp(App);

app.use(PrimeVue);
app.use(router);

// Register components globally
app.component('Chart', Chart);
app.component('Dialog', Dialog); // Register Dialog globally

// Register directives globally
app.directive('tooltip', Tooltip);

// Mount the Vue app
app.mount('#app');
