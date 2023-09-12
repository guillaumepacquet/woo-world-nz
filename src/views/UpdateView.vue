<template>
  <div>
    <div>Data: {{ JSON.stringify(result) }}</div>
    <div>Error: {{ JSON.stringify(error) }}</div>
  </div>
</template>

<script>
import { Client } from "@/core/SupabaseClient.js";

export default {
  data() {
    return {
      result: null,
      error: null,
    };
  },
  async mounted() {
    const { data, error } = await Client.functions.invoke("update-team", {
      body: { name: "Functions" },
    });
    this.result = data;
    this.error = error;
  },
};
</script>
