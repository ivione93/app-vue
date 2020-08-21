<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="atletas"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Atletas</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="550px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="info"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >Nuevo atleta</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field color="info" v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field color="info" v-model="editedItem.apellidos" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="date" color="info" v-model="editedItem.fechaNac" label="Fecha nacimiento"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field color="info" v-model="editedItem.ciudad" label="Ciudad"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select 
                      v-model="editedItem.categoria" :items="categorias"
                      item-text="nombre" item-value="nombre"
                      label="Categoría" color="info">
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="editedItem.sexo" :items="sexos" 
                      item-text="nombre" item-value="nombre"
                      label="Sexo" color="info">
                    </v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</v-container>
</template>

<script>
  import {db} from '../../main'

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Nombre', align: 'start', value: 'nombre' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: 'Fecha nacimiento', value: 'fechaNac' },
        { text: 'Ciudad', value: 'ciudad' },
        { text: 'Categoría', value: 'categoria' },
        { text: 'Sexo', value: 'sexo' },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      atletas: [],
      categorias: [],
      sexos: [],
      nombre: '',
      apellidos: '',
      fechaNac: '',
      ciudad: '',
      categoria: '',
      sexo: '',
      editedIndex: -1,
      editedItem: {
        nombre: '',
        apellidos: '',
        fechaNac: '',
        ciudad: '',
        categoria: '',
        sexo: ''
      },
      defaultItem: {
        nombre: '',
        apellidos: '',
        fechaNac: '',
        ciudad: '',
        categoria: '',
        sexo: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo atleta' : 'Editar atleta'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize();
      this.cargarCombos();
    },

    methods: {
      initialize () {
        this.atletas = []
        this.getAtletas()
      },

      editItem (item) {
        this.editedIndex = this.atletas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        try {
          const index = this.atletas.indexOf(item);
          confirm('Are you sure you want to delete this athlete?') && this.atletas.splice(index, 1);
          await db.collection('atletas').doc(item.id).delete();
          this.getAtletas();
        } catch (error) {
          console.log(error);
        }
        
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        try {
          if (this.editedIndex > -1) {
            Object.assign(this.atletas[this.editedIndex], this.editedItem);
            await db.collection('atletas').doc(this.editedItem.id).update({
                nombre: this.editedItem.nombre,
                apellidos: this.editedItem.apellidos,
                fechaNac: this.editedItem.fechaNac,
                ciudad: this.editedItem.ciudad,
                categoria: this.editedItem.categoria,
                sexo: this.editedItem.sexo
              });
          } else {
            this.atletas.push(this.editedItem);
            await db.collection('atletas').add({
                nombre: this.editedItem.nombre,
                apellidos: this.editedItem.apellidos,
                fechaNac: this.editedItem.fechaNac,
                ciudad: this.editedItem.ciudad,
                categoria: this.editedItem.categoria,
                sexo: this.editedItem.sexo
            })
            this.getAtletas();
          }
          this.close()
        } catch (error) {
          console.log(error);
        }
      },
      async getAtletas() {
        try {
            const snapshot = await db.collection('atletas').get();
            const atletas = [];

            snapshot.forEach(doc => {
                let atletaData = doc.data();
                atletaData.id = doc.id;
                atletas.push(atletaData);
            })

            this.atletas = atletas;
        } catch (error) {
            console.log(error);
        }
      },
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
    }
  }
</script>