<template>
  <v-container>
    <h3>Filtros de búsqueda</h3>
    <v-form>
        <v-row>
          <v-col cols="12" sm="6" md="2">
              <v-text-field label="Nombre" color="info" v-model="nombre"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Apellidos" color="info" v-model="apellidos"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field type="date" label="Fecha nacimiento" color="info" v-model="fechaNac"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Ciudad" color="info" v-model="ciudad"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-select 
              v-model="categoria" :items="categorias"
              item-text="nombre" item-value="nombre"
              label="Categoría" color="info"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="2">
              <v-select v-model="sexo" :items="sexos" 
              item-text="nombre" item-value="nombre"
              label="Sexo" color="info"></v-select>
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
import {db} from '../../main';

export default {
    name: 'BuscadorAtletas',
    data() {
        return {
            sexos: [],
            categorias: [],
            categoria: "",
            sexo: "",
            nombre: "",
            apellidos: "",
            fechaNac: "",
            ciudad: "",
            loading: true,
            errored: false
        }
    },
    mounted() {
      this.cargarCombos();
    },
    /*mounted () {
      axios
        .get('http://localhost:8081/gestorAtletas/categorias')
        .then(response => {
          this.categorias = response
          console.log(this.categorias.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      axios
        .get('http://localhost:8081/gestorAtletas/sexos')
        .then(response => {
          this.sexos = response
          console.log(this.sexos.data)
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },*/
    methods: {
      async cargarCombos() {
        try {
           const snapshotCategorias = await db.collection('categoria').get();
           const snapshotSexos = await db.collection('sexo').get();
           const categorias = [];
           const sexos = [];

           snapshotCategorias.forEach(docC => {
              console.log(docC.data())
              let categoriaData = docC.data();
              categoriaData.id = docC.id;
              categorias.push(categoriaData);
            })
            snapshotSexos.forEach(docS => {
              console.log(docS.data())
              let sexoData = docS.data();
              sexoData.id = docS.id;
              sexos.push(sexoData);
            })
            this.categorias = categorias;
            this.sexos = sexos;
        } catch (error) {
          console.log(error);
        }
      },
      buscar() {
          alert("Buscar: " + this.nombre + " " + this.apellidos + " " + this.fechaNac + " " + this.ciudad + " " + this.categoria + " " + this.sexo);
      },
      limpiar() {
          this.nombre = "";
          this.apellidos = "";
          this.fechaNac = "";
          this.ciudad = "";
          this.categoria = null;
          this.sexo = null;
      }
    }
}
</script>