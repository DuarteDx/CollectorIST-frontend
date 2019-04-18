<template>
  <div class="f-field">
    <input
      id="doi"
      v-model="value"
      :placeholder="$t('fields.doi.placeholder')"
      class="f-field__input"
      type="text"
      name="doi"
    >
    <label
      for="doi"
      class="f-field__label"
    >
      {{ $t('fields.doi.label') }}
    </label>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      validation: undefined
    }
  },
  watch: {
    value (newValue, oldValue) {
      // TODO input rule system
      this.$emit('input', newValue)
    }
  }
}
</script>
