
<template>
  <div class="define-unit-parent-step">
    <header class="layout-wizard__header">
      <h1>Extrutura Orgânica da Unidade</h1>
      <p>Lista de utilizadores que poderão gerir a unidade.</p>
    </header>
    <section>
      <div class="f-group">
        <div class="f-field f-field--allways-open">
          <input
            id="parentUnit"
            v-model="q"
            class="f-field__input"
            type="text"
            name="parentUnit"
          >
          <label
            for="parentUnit"
            class="f-field__label"
          >
            parentUnit
          </label>
        </div>
      </div>
      <!-- NEEDS DESIGN START-->
      <p>ESCOLHIDO {{ value }}</p>
      <p
        v-for="unit in units"
        :key="unit.id"
        @click="setParentUnit(unit)"
      >
        {{ unit.name }}
      </p>

      <!-- NEEDS DESIGN END-->
    </section>
  </div>
</template>
<script>
import UnitsAPI from '@/api/units'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      q: '',
      units: {}
    }
  },
  computed: {
  },
  watch: {
    async q (newValue, oldValue) {
      const { unitsPage } = await UnitsAPI.list({ q: newValue })
      this.units = unitsPage.items
    }
  },
  methods: {
    setParentUnit (unit) {
      this.$emit('input', unit.id)
    }
  }
}
</script>
