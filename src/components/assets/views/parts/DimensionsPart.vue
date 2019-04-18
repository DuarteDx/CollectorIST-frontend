<template>
  <div
    v-if="dimensions.length"
    class="card__section"
  >
    <h2
      class="card__section__title h5--ssp"
      aria-label="Digital Object Identifier"
    >
      Dimensions:
    </h2>
    <p>
      {{ dimensions }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    dimensions: {
      type: String,
      default: () => ''
    }
  }
}
</script>
