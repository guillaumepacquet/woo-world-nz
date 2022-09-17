<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-alert dense text type="warning" border="left">
          This is the leaderboard for teams register in Woo world that are
          <strong>based in New Zealand</strong><br />
          You can find the world wide leaderboard on the woo website.
          <v-btn
            icon
            small
            plain
            color="blue"
            href="https://leaderboards.wooworlds.com/ww22/teamtotheight"
            target="_blank"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
          <br />
          To appear in the list below you <strong>must</strong> register your
          team in woo world
          <v-btn
            icon
            small
            plain
            color="blue"
            href="https://teams.wooworlds.com/"
            target="_blank"
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-tabs v-model="tab" centered>
            <v-tab v-for="item in items" :key="item">
              <template v-if="$vuetify.breakpoint.xsOnly">
                <img v-if="item === items[0]" src="../assets/max-height.svg" />
                <img
                  v-if="item === items[1]"
                  src="../assets/total-height.svg"
                />
                <img
                  v-if="item === items[2]"
                  src="../assets/total-distance.svg"
                />
              </template>
              <template v-else>
                {{ item }}
              </template>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item">
              <v-card flat>
                <v-card-text>
                  <v-skeleton-loader
                    v-if="loading"
                    max-width="300"
                    type="list-item-avatar@4"
                  ></v-skeleton-loader>
                  <v-list dense>
                    <v-list-item
                      v-for="(team, index) in teams"
                      :key="team.name"
                    >
                      <v-list-item-avatar> {{ index + 1 }} </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ team.name | teamName }}
                          <span class="float-right"
                            >{{ team.total | float }} M</span
                          >
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      tab: null,
      items: ["Max height", "Total height", "Total distance"],
      totalHeight: [],
      totalDistance: [],
      maxHeight: [],
      loading: false,
    };
  },
  async mounted() {
    this.$http.get("/woo/update/max-height");
    this.$http.get("/woo/update/total-height");
    this.$http.get("/woo/update/total-distance");
    this.loading = true;
    await Promise.all([
      this.loadMaxHeiht(),
      this.loadTotalHeiht(),
      this.loadTotalDistance(),
    ]);
    this.loading = false;
  },
  computed: {
    teams() {
      if (this.tab === 2) {
        return this.totalDistance.map((team) => {
          return { ...team, total: team.teamtotdistance };
        });
      }

      if (this.tab === 0) {
        return this.maxHeight.map((team) => {
          return { ...team, total: team.teammaxheight };
        });
      }

      return this.totalHeight.map((team) => {
        return { ...team, total: team.teamtotheight };
      });
    },
  },
  methods: {
    async loadMaxHeiht() {
      const response = await this.$http.get("/woo/max-height");

      this.maxHeight = response.data;
    },
    async loadTotalHeiht() {
      const response = await this.$http.get("/woo/total-height");
      this.totalHeight = response.data;
    },
    async loadTotalDistance() {
      const response = await this.$http.get("/woo/total-distance");
      this.totalDistance = response.data;
    },
  },
};
</script>
