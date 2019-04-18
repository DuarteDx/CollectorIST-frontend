<template>
  <div class="f-field">
    <input
      id="year"
      v-model="value"
      :placeholder="$t('fields.year.placeholder')"
      class="f-field__input "
      type="number"
      name="year"
    >
    <label
      for="year"
      class="f-field__label"
    >
      {{ $t('fields.year.label') }}
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
