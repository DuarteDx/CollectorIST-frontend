<template>
  <div>
    Possible match
    <div>
      <div style="float: left; background-color: gray; width: 3rem; height: 3rem;" />
      <div>
        <h3>É este o artigo o artigo que está quer introduzir?</h3>
        <button @click="isSameRecord(true)">
          Sim
        </button>
        <button @click="isSameRecord(false)">
          Não
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
  },
  computed: {
    ...mapGetters('record-creation', [
      'newRecord',
      'validation'
    ])
  },
  methods: {
    ...mapActions('record-creation', [
      'updateStepNumber',
      'updateSteps',
      'updateNewRecord',
      'updateValidation',
      'updateIteration'
    ]),
    isSameRecord (is) {
      const validation = { ...this.validation }
      validation.match.validated = true
      if (is) {
        validation.match.isSameRecord = true
      } else {
        validation.match.isSameRecord = false
      }
      this.updateValidation({ validation })
      this.updateIteration()
    }
  }
}
</script>
