<template>
  <div class="f-field">
    <input
      id="pages"
      v-model="value"
      :placeholder="$t('fields.pages.placeholder')"
      class="f-field__input "
      type="text"
      name="pages"
    >
    <label
      for="pages"
      class="f-field__label"
    >
      {{ $t('fields.pages.label') }}
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
