<template>
  <div class="f-field">
    <input
      id="url"
      v-model="value"
      :placeholder="$t('fields.url.placeholder')"
      class="f-field__input"
      type="url"
      name="url"
    >
    <label
      for="url"
      class="f-field__label"
    >
      {{ $t('fields.url.label') }}
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
