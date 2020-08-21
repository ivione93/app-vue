<template>
<v-container>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
            <v-btn color="info" dark class="mr-4" @click="dialog = true">
                Añadir competición
            </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="info"
          :events="competiciones"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>

        <v-dialog v-model="dialog"> 
            <v-card>
                <v-container>
                    <v-form @submit.prevent="addCompeticion">
                        <v-text-field type="text" label="Nombre competición" v-model="name"></v-text-field>
                        <v-text-field type="text" label="Lugar competición" v-model="lugar"></v-text-field>
                        <v-text-field type="date" label="Fecha inicio" v-model="start"></v-text-field>
                        <v-text-field type="date" label="Fecha fin" v-model="end"></v-text-field>
                        <v-text-field type="color" label="Color" v-model="color"></v-text-field>
                        <v-btn type="submit" color="info" class="mr-4" @click.stop="dialog = false">Guardar</v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon @click="deleteCompeticion(selectedEvent)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form v-if="currentlyEditing !== selectedEvent.id">
                  {{ selectedEvent.name }} ({{ selectedEvent.lugar }})
              </v-form>
              <v-form v-else>
                  <v-text-field type="text" v-model="selectedEvent.name" label="Nombre"></v-text-field>
                  <v-text-field type="text" v-model="selectedEvent.lugar" label="Lugar"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancelar
              </v-btn>
              <v-btn text v-if="currentlyEditing !== selectedEvent.id"
                @click.prevent="editCompeticion(selectedEvent.id)">Editar
              </v-btn>
              <v-btn text v-else @click.prevent="updateCompeticion(selectedEvent)">Guardar cambios</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
  import {db} from '../../main'

  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Mes',
        week: 'Semana',
        day: 'día',
        '4day': '4 días',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      competiciones: [],
      name: null,
      lugar: null,
      start: null,
      end: null,
      color: '#1976D2',
      dialog: false,
      currentlyEditing: null
    }),
    mounted () {
      this.$refs.calendar.checkChange();
    },
    created() {
      this.getCompeticiones();
    },
    methods: {
      async updateCompeticion(ev) {
          try {
              await db.collection('competiciones').doc(ev.id).update({
                  name: ev.name,
                  lugar: ev.lugar
              });

              this.selectedOpen = false;
              this.currentlyEditing = null;
          } catch (error) {
              console.log(error);
          }
      },
      editCompeticion(id) {
          this.currentlyEditing = id;
      },
      async deleteCompeticion(ev) {
          try {
              await db.collection('competiciones').doc(ev.id).delete();
              
              this.selectedOpen = false;
              this.getCompeticiones();
          } catch (error) {
              console.log(error);
          }
      },
      async addCompeticion() {
        try {
            if(this.name && this.start && this.end) {
                await db.collection('competiciones').add({
                    name: this.name,
                    lugar: this.lugar,
                    start: this.start,
                    end: this.end,
                    color: this.color
                })

                this.getCompeticiones();

                this.name = null;
                this.lugar = null;
                this.start = null;
                this.end = null;
                this.color = '#1976D2';
            } else {
                console.log('Faltan campos obligatorios');
            }
        } catch (error) {
            console.log(error);
        }
      },
      async getCompeticiones() {
        try {
            const snapshot = await db.collection('competiciones').get();
            const competiciones = [];

            snapshot.forEach(doc => {
                let eventoData = doc.data();
                eventoData.id = doc.id;
                competiciones.push(eventoData);
            })

            this.competiciones = competiciones;
        } catch (error) {
            console.log(error);
        }
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
        this.start = start
        this.end = end
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
    },
  }
</script>