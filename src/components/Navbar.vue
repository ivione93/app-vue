<template>
  <v-card>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gestor Atletas</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary dark >
      <v-list >
        <v-list-item-group
          active-class="white--text text--accent-4" >

          <!-- <v-list-item link :to="{name: 'GestorAtletas'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item> -->

          <v-list-item link :to="{name: 'Atletas'}">
            <v-list-item-icon>
              <v-icon>mdi-run</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Atletas</v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{name: 'Ranking'}">
            <v-list-item-icon>
              <v-icon>mdi-trophy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ranking</v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{name: 'Competiciones'}">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Competiciones</v-list-item-title>
          </v-list-item>

          <v-list-item link :to="{name: 'CalendarioView'}">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Calendario</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>

export default {
    name: 'Navbar',
    data() {
        return {
            drawer: false
        }
    }
}
</script>
