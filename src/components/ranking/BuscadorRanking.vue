<template>
  <v-container>
    <h3>Filtros de búsqueda</h3>
    <v-form>
        <v-row>
            <v-col cols="12" sm="6" md="2">
                <v-select :items="sexos" v-model="sexo" label="Sexo" color="info"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="2">
                <v-select :items="categorias" v-model="categoria" label="Categoría" color="info"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-select :items="ambitos" v-model="ambito" label="Ámbito" color="info"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-select :items="sectores" v-model="sector" label="Sector" color="info"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="2">
                <v-select :items="especialidades" v-model="especialidad" label="Especialidad" color="info"></v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn class="mr-4" @click="buscar">Buscar</v-btn>
                <v-btn class="mr-4"  @click="limpiar">Limpiar</v-btn>
            </v-col>
        </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
    name: 'BuscadorRanking',
    data() {
        return {
            sexo: null,
            categoria: null,
            ambito: null,
            sector: null,
            especialidad: null,
            sexos: ['Masculino', 'Femenino'],
            categorias: ['Senior', 'Sub10', 'Sub12', 'Sub14'],
            ambitos: ['Pista Cubierta', 'Aire Libre'],
            sectores: ['Velocidad', 'Medio fondo', 'Fondo'],
            especialidades: ['100ml', '200ml', '400ml']
        }
    },
    methods: {
        buscar() {
            alert("Buscar: " + this.sexo + " " + this.categoria + " " + this.ambito + " " + this.sector + " " + this.especialidad);
        },
        limpiar() {
            this.sexo = null
            this.categoria = null
            this.ambito = null
            this.sector = null
            this.especialidad = null
        }
    }
}
</script>