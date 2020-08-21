<template>
    <v-container>
        <v-card>
            <v-card-title>
                Competiciones
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="competiciones">
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
  import axios from "axios";
  import {db} from '../../main';

  export default {
    name: 'GridCompeticiones',
    data () {
      return {
        headers: [
          { text: 'Competición', align: 'start', value: 'name' },
          { text: 'Fecha', value: 'start' },
          { text: 'Lugar', value: 'lugar' }
        ],
        competiciones: [],
        loading: true,
        errored: false,
      }
    },
    created() {
      this.getCompeticiones();
    },
    methods: {
      async getCompeticiones() {
        try {
            const snapshot = await db.collection('competiciones').get();
            const competiciones = [];

            snapshot.forEach(doc => {
              console.log(doc.data())
                let competicionData = doc.data();
                competicionData.id = doc.id;
                competiciones.push(competicionData);
            })

            this.competiciones = competiciones;
        } catch (error) {
            console.log(error);
        }
      },
    }
  }
</script>