<template>
    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo0nRO-QKCcuV3EeeSy94SUWrjj75NodfN2A&usqp=CAU">
                        <v-avatar class="profile" color="grey" size="140" tile>
                                <v-img src="data:image/jpeg;base64,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"></v-img>
                            </v-avatar>
                        <v-card-title>1. Iván García Gómez</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pb-0">400 metros vallas</v-card-subtitle>
                    <v-card-text class="text--primary">
                    <div>55.95</div>
                    <div>Tres Cantos</div>
                    </v-card-text>
                    <!--<v-card-actions>
                        <v-btn color="orange" text> Share</v-btn>
                        <v-btn color="orange" text>Explore</v-btn>
                    </v-card-actions>-->
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo0nRO-QKCcuV3EeeSy94SUWrjj75NodfN2A&usqp=CAU">
                        <v-avatar class="profile" color="grey" size="140" tile>
                                <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                            </v-avatar>
                        <v-card-title>2. Marcus O'Brien</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pb-0">400 metros vallas</v-card-subtitle>
                    <v-card-text class="text--primary">
                    <div>56.19</div>
                    <div>Vallehermoso</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo0nRO-QKCcuV3EeeSy94SUWrjj75NodfN2A&usqp=CAU">
                        <v-avatar class="profile" color="grey" size="140" tile>
                                <v-img src="https://www.rfea.es/sirfea/ficheros/personas/imagenes/210335.jpg"></v-img>
                            </v-avatar>
                        <v-card-title>3. Alberto Rodríguez Ruiz-Sotomayor</v-card-title>
                    </v-img>
                    <v-card-subtitle class="pb-0">400 metros vallas</v-card-subtitle>
                    <v-card-text class="text--primary">
                    <div>57.78</div>
                    <div>Arganda del Rey</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="info" dark v-bind="attrs" v-on="on">Ranking completo</v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="info">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Ranking</v-toolbar-title>
                    </v-toolbar>
                    <GridRanking />
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import GridRanking from '@/components/ranking/GridRanking.vue'

export default {
    name: 'ListaRanking',
    data() {
        return {
            dialog: false
        }
    },
    components: {
        GridRanking 
    }
}
</script>