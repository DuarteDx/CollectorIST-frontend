<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Patent</h1>
      <p>Que outros detalhes quer associar à sua publicação?</p>
    </header>
    <div class="creation-form__main container">
      <div class="f-group f-group--lg">
        <div class="f-field">
          <input
            id="location"
            v-model="location"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="location"
          >
          <label
            for="location"
            class="f-field__label"
          >
            Location
          </label>
        </div>
        <div class="f-field">
          <input
            id="patentstatus "
            v-model="patentstatus"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="patentstatus "
          >
          <label
            for="patentstatus"
            class="f-field__label"
          >
            Patent Status
          </label>
        </div>
        <div class="f-field">
          <input
            id="patentstatus"
            v-model="patentstatus"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="patentstatus"
          >
          <label
            for="patentstatus"
            class="f-field__label"
          >
            Patent Status
          </label>
        </div>
        <div class="f-field">
          <input
            id="approvaldate"
            v-model="approvaldate"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="approvaldate"
          >
          <label
            for="approvaldate"
            class="f-field__label"
          >
            Approval date
          </label>
        </div>
        <div class="f-field">
          <input
            id="abstract"
            v-model="abstract"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="abstract"
          >
          <label
            for="abstract"
            class="f-field__label"
          >
            Abstract
          </label>
        </div>
        <br>
        <div class="f-field">
          <input
            id="number"
            v-model="number"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="number"
          >
          <label
            for="number"
            class="f-field__label"
          >
            Number
          </label>
        </div>
        <div class="f-field">
          <input
            id="url"
            v-model="url"
            class="f-field__input f-field__input--allways-open"
            type="url"
            placeholder="https://"
            name="url"
          >
          <label
            for="url"
            class="f-field__label"
          >
            Url
          </label>
        </div>
        <div class="u-todo">
          Authors (R)
          <div
            v-for="a in author"
            :key="a.name"
          >
            {{ a.name }} - {{ a.researcher }}
          </div>
          <input
            v-model="newAuthor.name"
            type="text"
          >
          <input
            v-model="newAuthor.researcher"
            type="text"
          >
          <button @click="addAuthor">
            Add
          </button>
        </div>
        <div class="f-field">
          <input
            id="registrationdate"
            v-model="registrationdate"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="registrationdate"
          >
          <label
            for="registrationdate"
            class="f-field__label"
          >
            Registration date
          </label>
        </div>
        <div class="u-todo">
          Keywords
          <div
            v-for="k in keyword"
            :key="k"
          >
            {{ k }}
          </div>
          <input
            v-model="newKeyword"
            type="text"
          >
          <button @click="addKeyword">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      location: '',
      patentstatus: '',
      approvaldate: '',
      howpublished: '',
      abstract: '',
      number: '',
      url: '',
      author: [],
      newAuthor: {},
      registrationdate: '',
      keyword: [],
      newKeyword: ''
    }
  },
  computed: {
    ...mapGetters('record-creation', [
      'stepNumber',
      'steps',
      'newRecord',
      'iteration'
    ])
  },
  mounted () {
    for (let key in this.newRecord) {
      this[key] = this.newRecord[key]
    }
    this.validate()
  },
  methods: {
    ...mapActions('record-creation', [
      'updateStepNumber',
      'updateSteps',
      'updateNewRecord',
      'updateValidation',
      'updateIteration'
    ]),
    validate () {
      const newRecord = {
        ...this.newRecord
      }
      const keys = ['location', 'patentstatus', 'approvaldate', 'abstract', 'number', 'url', 'author', 'registrationdate', 'keyword']
      for (let key of keys) {
        newRecord[key] = this[key]
      }
      this.updateNewRecord({ newRecord })
      this.updateIteration()
      if (this.location.length > 3) {
        this.updateValidation({ validation: { step: true } })
      } else {
        this.updateValidation({ validation: { step: false } })
      }
    },
    addAuthor () {
      this.author.push(this.newAuthor)
      this.newAuthor = {}
    },
    addKeyword () {
      this.keyword.push(this.newKeyword)
      this.newKeyword = ''
    }
  }
}
</script>
