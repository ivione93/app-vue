<template>
  <div mt-15>
    <BuscadorAtletas />
    <GridAtletas />
  </div>
</template>

<script>
  import GridAtletas from '@/components/atletas/GridAtletas.vue'
  import BuscadorAtletas from '@/components/atletas/BuscadorAtletas.vue'

  export default {
    name: 'Atletas',
    components: {
      GridAtletas,
      BuscadorAtletas
    }
  }
</script>
