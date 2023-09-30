<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-tabs v-model="tab" centered>
          <v-tab v-for="item in items" :key="item">
            <template v-if="$vuetify.breakpoint.xsOnly">
              <img v-if="item === items[0]" src="../../assets/max-height.svg" />
              <img
                v-if="item === items[1]"
                src="../../assets/total-height.svg"
              />
              <img
                v-if="item === items[2]"
                src="../../assets/total-distance.svg"
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
                    :href="getTeamLink(team.name)"
                    target="_blank"
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
</template>

<script>
import repository from "@/core/SupabaseSQL";
import { Client } from "@/core/SupabaseClient.js";

export default {
  name: "LeaderBoard",
  data() {
    return {
      tab: null,
      items: ["Max height", "Total height", "Total distance"],
      data: [],
      loading: false,
    };
  },
  async mounted() {
    this.updateTeam();
    this.loading = true;
    this.data = await repository.selectAll();
    this.loading = false;
  },
  computed: {
    teams() {
      let data = this.data.map((team) => {
        return { name: team.name, total: team.total_height };
      });

      if (this.tab === 2) {
        data = this.data.map((team) => {
          return { name: team.name, total: team.total_distance };
        });
      }

      if (this.tab === 0) {
        data = this.data.map((team) => {
          return { name: team.name, total: team.max_height };
        });
      }

      return data.sort((a, b) => b.total - a.total);
    },
  },
  methods: {
    async updateTeam() {
      await Client.functions.invoke("update-team", {
        body: { name: "Functions" },
      });

      this.data = await repository.selectAll();
    },
    getTeamLink(teamName) {
      let url =
        "https://leaderboards.wooworlds.com/ww23/teamtotheight?team=tc_ww23_";

      if (this.tab === 2) {
        url =
          "https://leaderboards.wooworlds.com/ww23/teamtotdistance?team=tc_ww23_";
      }

      if (this.tab === 0) {
        url =
          "https://leaderboards.wooworlds.com/ww23/teammaxheight?team=tc_ww23_";
      }

      return url + teamName;
    },
  },
};
</script>
