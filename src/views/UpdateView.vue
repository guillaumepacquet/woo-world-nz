<template>
  <div>
    <div>Data: {{ JSON.stringify(result) }}</div>
    <div>Error: {{ JSON.stringify(error) }}</div>
  </div>
</template>

<script>
import { localClient } from "@/core/SupabaseClient.js";

export default {
  data() {
    return {
      result: null,
      error: null,
    };
  },
  async mounted() {
    console.log("onMount");
    const { data, error } = await localClient.functions.invoke("update-team", {
      body: { name: "Functions" },
    });
    console.log(data);
    console.log(error);
    this.result = data;
    this.error = error;
  },
};
</script>
