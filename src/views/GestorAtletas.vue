<template>
  <v-container text-center>
    <h1>Bienvenido al gestor de atletas</h1>
    <v-row>
        <v-col cols="12" sm="6" md="3">
            <v-btn x-large class="mr-4" :to="{name: 'Atletas'}">
                <v-icon>mdi-run</v-icon> Atletas
            </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-btn x-large class="mr-4" :to="{name: 'Ranking'}">
                <v-icon>mdi-trophy</v-icon> Ranking
            </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-btn x-large class="mr-4" :to="{name: 'Competiciones'}">
                <v-icon>mdi-calendar</v-icon> Competiciones
            </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-btn x-large class="mr-4" :to="{name: 'CalendarioView'}">
                <v-icon>mdi-calendar</v-icon> Calendario
            </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>