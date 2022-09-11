<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        New Zealand Team Leaderboard
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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
