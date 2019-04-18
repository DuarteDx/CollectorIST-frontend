<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Proceedings de uma conferencia</h1>
      <p>Que outros detalhes quer associar à sua publicação?</p>
    </header>
    <div class="creation-form__main container">
      <div class="f-group f-group--lg">
        <div class="f-field">
          <input
            id="address"
            v-model="address"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="address"
          >
          <label
            for="address"
            class="f-field__label"
          >
            Address
          </label>
        </div>
        <div class="f-field">
          <input
            id="organization"
            v-model="organization"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="organization"
          >
          <label
            for="organization"
            class="f-field__label"
          >
            Organization
          </label>
        </div>
        <div class="u-todo">
          Editors (R)
          <div
            v-for="a in editor"
            :key="a.name"
          >
            {{ a.name }} - {{ a.researcher }}
          </div>
          <input
            v-model="newEditor.name"
            type="text"
          >
          <input
            v-model="newEditor.researcher"
            type="text"
          >
          <button @click="addEditor">
            Add
          </button>
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

        <div class="f-inline-group">
          <div class="f-field">
            <input
              id="year"
              v-model="year"
              class="f-field__input f-field__input--allways-open"
              type="text"
              name="year"
            >
            <label
              for="year"
              class="f-field__label"
            >
              Year
            </label>
          </div>
          <div class="f-field">
            <select
              id="month"
              v-model="month"
              class="f-field__input f-field__input--select"
              name="month"
            >
              <option
                v-for="monthOption in 12"
                :key="`starting-${monthOption}`"
                :value="monthOption"
              >
                {{ $t(`months.${monthOption}`) }}
              </option>
            </select>
            <label
              class="f-field__label f-field__label--select"
              for="month"
            >{{ $t('month') }}</label>
          </div>
        </div>
        <div class="f-field">
          <input
            id="volume"
            v-model="volume"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="volume"
          >
          <label
            for="volume"
            class="f-field__label"
          >
            Volume
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
          </button>s
        </div>
        <div class="f-field">
          <input
            id="series"
            v-model="series"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="series"
          >
          <label
            for="series"
            class="f-field__label"
          >
            Series
          </label>
        </div>
        <div class="f-field">
          <input
            id="publisher"
            v-model="publisher"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="publisher"
          >
          <label
            for="publisher"
            class="f-field__label"
          >
            Publisher
          </label>
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
      address: '',
      organization: '',
      editor: [],
      newEditor: {},
      abstract: '',
      number: '',
      url: '',
      year: '',
      month: '',
      volume: '',
      keyword: [],
      newKeyword: '',
      series: '',
      publisher: ''
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
      const keys = ['address', 'organization', 'editor', 'abstract', 'number', 'url', 'year', 'month', 'volume', 'keyword', 'series', 'publisher']
      for (let key of keys) {
        newRecord[key] = this[key]
      }
      this.updateNewRecord({ newRecord })
      this.updateIteration()
      if (this.address.length > 3) {
        this.updateValidation({ validation: { step: true } })
      } else {
        this.updateValidation({ validation: { step: false } })
      }
    },
    addEditor () {
      this.editor.push(this.newEditor)
      this.newEditor = {}
    },
    addKeyword () {
      this.keyword.push(this.newKeyword)
      this.newKeyword = ''
    }
  }
}
</script>
