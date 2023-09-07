<template>
  <v-row justify="space-around">
    <v-col cols="12" md="3">
      <sponsor-card name="North NZ">
        <img src="../../assets/north-trans.png" style="max-width: 160px" />
      </sponsor-card>
    </v-col>
    <!--    <v-col cols="12" md="3">-->
    <!--      <sponsor-card name="NZ Boardstore"> </sponsor-card> </v-col-->
    <!--    ><v-col cols="12" md="3">-->
    <!--      <sponsor-card name="White Cloud Kiteboarding"> </sponsor-card> </v-col-->
    <!--    ><v-col cols="12" md="3">-->
    <!--      <sponsor-card name="The Broken Lantern"> </sponsor-card>-->
    <!--    </v-col>-->
  </v-row>
</template>

<script>
import SponsorCard from "@/views/components/SponsorCard.vue";

export default {
  name: "SponsorTab",
  components: { SponsorCard },
};
</script>
