<template>
  <div mt-15>
    <BuscadorRanking />
    <ListaRanking />
  </div>
</template>

<script>
  import BuscadorRanking from '@/components/ranking/BuscadorRanking.vue'
  import ListaRanking from '@/components/ranking/ListaRanking.vue'

  export default {
    name: 'Ranking',
    components: {
      BuscadorRanking,
      ListaRanking
    }
  }
</script>
