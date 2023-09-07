<template>
  <div class="text-center">
    <slot />
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: "SponsorCard",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
