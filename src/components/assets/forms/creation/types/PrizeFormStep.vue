<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Premio</h1>
      <p>Que outros detalhes quer associar à sua publicação?</p>
    </header>
    <div class="creation-form__main container">
      <div class="f-group f-group--lg">
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
            id="date"
            v-model="date"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="date"
          >
          <label
            for="date"
            class="f-field__label"
          >
            Date
          </label>
        </div>
        <div class="f-field">
          <input
            id="reference"
            v-model="reference"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="reference"
          >
          <label
            for="reference"
            class="f-field__label"
          >
            Reference
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
      abstract: '',
      url: '',
      author: [],
      newAuthor: {},
      date: '',
      reference: '',
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
      const keys = ['abstract', 'url', 'author', 'date', 'reference', 'keyword']
      for (let key of keys) {
        newRecord[key] = this[key]
      }
      this.updateNewRecord({ newRecord })
      this.updateIteration()
      if (this.abstract.length > 3) {
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
