<template>
  <v-card>
      <v-card-title>
        Competiciones
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ranking">
      </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
    name: 'GridRanking',
    data () {
      return {
        headers: [
          { text: 'Prueba', align: 'start', value: 'prueba' },
          { text: 'Competición', value: 'competicion' },
          { text: 'Atleta', value: 'atleta' },
          { text: 'Marca', value: 'marca' }
        ],
        ranking: [
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Iván García Gómez", marca: '55.95' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Marcus O'Brien", marca: '56.19' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Alberto Rodríguez Ruiz-Sotomayor", marca: '57.78' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Iván García Gómez", marca: '55.95' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Marcus O'Brien", marca: '56.19' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Alberto Rodríguez Ruiz-Sotomayor", marca: '57.78' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Iván García Gómez", marca: '55.95' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Marcus O'Brien", marca: '56.19' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Alberto Rodríguez Ruiz-Sotomayor", marca: '57.78' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Iván García Gómez", marca: '55.95' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Marcus O'Brien", marca: '56.19' },
            { prueba: '400 metros vallas', competicion: 'Reunión FAM', atleta: "Alberto Rodríguez Ruiz-Sotomayor", marca: '57.78' }
        ],
        loading: true,
        errored: false,
      }
    }
}
</script>