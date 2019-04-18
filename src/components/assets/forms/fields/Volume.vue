<template>
  <div class="f-field">
    <input
      id="volume"
      v-model="value"
      :placeholder="$t('fields.volume.placeholder')"
      class="f-field__input "
      type="text"
      name="volume"
    >
    <label
      for="volume"
      class="f-field__label"
    >
      {{ $t('fields.volume.label') }}
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
