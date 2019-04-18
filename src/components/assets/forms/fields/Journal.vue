<template>
  <!-- TODO apply class f-field--danger, f-field--warning, f-field--success to f-field below for input validation type-->
  <div class="f-field">
    <input
      id="journal"
      v-model="value"
      :placeholder="$t('fields.journal.placeholder')"
      class="f-field__input"
      type="text"
      name="journal"
    >
    <label
      for="journal"
      class="f-field__label"
    >
      {{ $t('fields.journal.label') }}
      <!-- TODO tooltip -->

    </label>
    <!-- <div class="f-field__validation">
      <p>{{ validation.message }}</p>
    </div> -->
    <div class="tooltip">
      <i
        :aria-label="$t('tooltip.arialabel', {title: $t('fields.journal.label')})"
        class="tooltip__toggler"
      >?</i>
      <div class="tooltip__message">
        {{ $t('fields.journal.tooltip') }}
      </div>
    </div>
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
