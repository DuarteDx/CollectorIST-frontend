<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Tech report</h1>
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
            id="institution"
            v-model="institution"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="institution"
          >
          <label
            for="institution"
            class="f-field__label"
          >
            Institution
          </label>
        </div>

        <div class="f-field">
          <input
            id="typefield"
            v-model="typeField"
            class="f-field__input f-field__input--allways-open"
            type="text"
            name="typefield"
          >
          <label
            for="typefield"
            class="f-field__label"
          >
            Type
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
      address: '',
      institution: '',
      typeField: '',
      number: '',
      author: [],
      newAuthor: {},
      url: '',
      year: '',
      month: '',
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
      const keys = ['address', 'institution', 'typeField', 'number', 'author', 'url', 'year', 'month', 'keyword']
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
