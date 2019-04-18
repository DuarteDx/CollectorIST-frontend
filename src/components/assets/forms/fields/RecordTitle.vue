<template>
  <div class="f-field">
    <input
      id="recordTitle"
      v-model="title"
      :placeholder="$t('fields.title.placeholder')"
      class="f-field__input"
      type="text"
      name="recordTitle"
    >
    <label
      for="recordTitle"
      class="f-field__label"
    >
      {{ $t('fields.title.label') }}
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
      validation: undefined,
      title: ''
    }
  },
  watch: {
    title (newValue, oldValue) {
      // TODO input rule system
      this.$emit('input', newValue)
    }
  },
  created () {
    this.title = this.value
  }
}
</script>
