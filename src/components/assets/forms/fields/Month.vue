<template>
  <div class="f-field">
    <select
      id="month"
      v-model="value"
      class="f-field__input f-field__input--select"
      name="month"
    >
      <option
        v-for="month in 12"
        :key="'starting-'+month"
        :value="month"
      >
        {{ $t('months.'+month) }}
      </option>
    </select>
    <label
      :class="{'f-field--is-filled': value}"
      class="f-field__label f-field__label--select"
      for="month"
    >
      {{ $t('month') }}
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
