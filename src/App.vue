<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" size="32">
          <v-icon dark> mdi-kitesurfing </v-icon></v-avatar
        >
        New Zealand Team Leaderboard
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer padless color="indigo darken-2" dark>
      <v-col class="text-center" cols="12">
        <v-btn href="https://github.com/guillaumepacquet/woo-world-nz" text>
          <v-icon class="mr-2">mdi-github</v-icon> source code
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
