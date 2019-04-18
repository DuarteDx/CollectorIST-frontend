<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Título da publicação</h1>
      <p>Que título tem a sua publicação?</p>
    </header>
    <section class="form-creation__main container">
      <record-title v-model="publicationTitle" />
    </section>
  </div>
</template>

<script>
import RecordTitle from '@/components/records/forms/fields/RecordTitle'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    RecordTitle
  },
  data () {
    return {
      publicationTitle: ''
    }
  },
  computed: {
    ...mapGetters('record-creation', [
      'newRecord'
    ])
  },
  mounted () {
    if (this.newRecord.title) {
      this.publicationTitle = this.newRecord.title
    }
    this.validate()
  },
  methods: {
    ...mapActions('record-creation', [
      'updateNewRecord',
      'updateValidation',
      'updateIteration'
    ]),
    validate () {
      const newRecord = {
        ...this.newRecord
      }
      newRecord.title = this.publicationTitle
      this.updateIteration()
      if (this.publicationTitle.length > 3) {
        this.updateNewRecord({ newRecord })
        this.updateValidation({ validation: { step: true } })
      } else {
        this.updateValidation({ validation: { step: false } })
      }
    }
  }
}
</script>
