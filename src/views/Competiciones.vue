<template>
  <div>
    <BuscadorCompeticiones />
    <GridCompeticiones />
  </div>
</template>

<script>
import axios from "axios";

import Calendario from '@/components/competiciones/Calendario.vue'
import BuscadorCompeticiones from '@/components/competiciones/BuscadorCompeticiones.vue'
import GridCompeticiones from '@/components/competiciones/GridCompeticiones.vue'

export default {
  name: 'Competiciones',
  components: {
    Calendario,
    BuscadorCompeticiones,
    GridCompeticiones
  }
}
</script>