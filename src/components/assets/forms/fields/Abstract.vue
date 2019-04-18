<template>
  <div class="f-field">
    <textarea
      id="abstract"
      v-model="value"
      :placeholder="$t('fields.abstract.placeholder')"
      name="abstract"
      class="f-field__textarea "
      rows="5"
      autocomplete=""
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <label
      for="abstract"
      class="f-field__label"
    >{{ $t('fields.abstract.label') }}</label>
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
      // TODO Clear line Breaks on paste because of pdf copy/paste line breaks
      this.$emit('input', newValue)
    }
  }
}
</script>
