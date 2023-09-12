<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-alert dense text type="warning" border="left">
          This is the leaderboard for teams register in Woo world that are
          <strong>based in New Zealand</strong><br />
          You can find the world wide leaderboard on the Woo website.
          <v-btn
            icon
            small
            plain
            color="blue"
            href="https://leaderboards.wooworlds.com/ww23/teamtotheight"
            target="_blank"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <!--          <br />-->
          <!--          Team registration for Woo world are <strong>closed</strong>.-->
        </v-alert>
      </v-col>
    </v-row>

    <leader-board />
    <v-row> <v-col cols="12">Sponsored by:</v-col></v-row>
    <sponsor-tab />
  </div>
</template>

<script>
import LeaderBoard from "@/views/components/LeaderBoard.vue";
import SponsorTab from "@/views/components/SponsorTab.vue";

export default {
  name: "HomeView",
  components: { SponsorTab, LeaderBoard },
};
</script>
