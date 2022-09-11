<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-alert dense text type="warning">
          This is the leaderboard for teams register in Woo world that are
          <strong>based in New Zealand</strong>
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
                  <v-list dense>
                    <v-list-item
                      v-for="(team, index) in teams"
                      :key="team.name"
                    >
                      <v-list-item-avatar> {{ index + 1 }} </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ team.name | teamName }}
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
    };
  },
  mounted() {
    this.$http.get("/woo/update/max-height");
    this.$http.get("/woo/update/total-height");
    this.$http.get("/woo/update/total-distance");
    this.loadMaxHeiht();
    this.loadTotalHeiht();
    this.loadTotalDistance();
  },
  computed: {
    teams() {
      if (this.tab === this.items[2]) return this.totalDistance;
      if (this.tab === this.items[0]) return this.maxHeight;

      return this.totalHeight;
    },
  },
  methods: {
    loadMaxHeiht() {
      this.$http.get("/woo/max-height").then((response) => {
        this.maxHeight = response.data;
      });
    },
    loadTotalHeiht() {
      this.$http.get("/woo/total-height").then((response) => {
        this.totalHeight = response.data;
      });
    },
    loadTotalDistance() {
      this.$http.get("/woo/total-distance").then((response) => {
        this.totalDistance = response.data;
      });
    },
  },
};
</script>
