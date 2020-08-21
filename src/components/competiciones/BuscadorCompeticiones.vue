<template>
  <v-container>
    <h3>Filtros de búsqueda</h3>
    <v-form>
        <v-row>
            <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="nombre" label="Nombre" color="info"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        label="Fecha"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        color="info"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="info" @click="menu = false">Cancelar</v-btn>
                    <v-btn text color="info" @click="$refs.menu.save(date)">Aceptar</v-btn>
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="lugar" label="Lugar" color="info"></v-text-field>
            </v-col>
        </v-row>
       <v-row>
            <v-col cols="12">
                <v-btn class="mr-4" @click="buscar">Buscar</v-btn>
                <v-btn class="mr-4" @click="limpiar">Limpiar</v-btn>
            </v-col>
        </v-row>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
    name: 'BuscadorCompeticiones',
    competiciones: [],
    data() {
        return {
            nombre: "",
            lugar: "",
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            competiciones: []
        }
    },
    methods: {
        buscar() {
            let nombre = this.nombre;
            let lugar = this.lugar;
            axios
                .get(`http://localhost:8081/gestorAtletas/competiciones/nombre/${nombre}/lugar/${lugar}`)
                .then(response => {
                    this.competiciones = response
                    console.log(this.competiciones.data)
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        limpiar() {
            this.date = new Date().toISOString().substr(0, 10)
            this.nombre = ""
            this.lugar = ""
        }
    }
}
</script>