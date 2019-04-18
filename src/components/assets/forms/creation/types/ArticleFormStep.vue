<template>
  <div @keyup="validate">
    <header class="creation-form__header">
      <h1>Detalhes do Artigo</h1>
      <p>Que título tem a sua publicação?</p>
    </header>
    <div class="creation-form__main container">
      <div class="f-group">
        <journal v-model="journal" />
        <doi v-model="doi" />
        <abstract v-model="abstract" />
        <!-- <div class="f-field">
          <input
            id="number"
            v-model="number"
            class="f-field__input"
            type="number"
            name="number">
          <label
            for="number"
            class="f-field__label">
            Number
          </label>
        </div>
        <fieldset class="f-fieldset">
          <h4 class="f-fieldset-title">ceans</h4>
          <div class="f-inline-group">
            <div class="f-field f-field--hidden-label">
              <input
                id="year"
                v-model="year"
                class="f-field__input "
                type="text"
                name="year">
              <label
                for="year"
                class="f-field__label">
                Year
              </label>
            </div>
            <div class="f-field f-field--hidden-label">
              <select
                id="month"
                v-model="month"
                class="f-field__input f-field__input--select"
                name="month">
                <option
                  v-for="month in 12"
                  :key="'starting-'+month"
                  :value="month">{{ $t('months.'+month) }}</option>
              </select>
              <label
                class="f-field__label f-field__label--select"
                for="month">{{ $t('month') }}</label>
            </div>
            <div class="f-field f-field--hidden-label">
              <input
                id="year"
                v-model="year"
                class="f-field__input "
                type="text"
                name="year">
              <label
                for="year"
                class="f-field__label">
                Year
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset class="f-fieldset">
          <h4 class="f-fieldset-title">ceans</h4>
          <div class="f-inline-group">
            <div class="f-field f-field--hidden-label">
              <input
                id="year"
                v-model="year"
                class="f-field__input "
                type="text"
                name="year">
              <label
                for="year"
                class="f-field__label">
                Year
              </label>
            </div>
            <div class="f-field f-field--hidden-label">
              <select
                id="month"
                v-model="month"
                class="f-field__input f-field__input--select"
                name="month">
                <option
                  v-for="month in 12"
                  :key="'starting-'+month"
                  :value="month">{{ $t('months.'+month) }}</option>
              </select>
              <label
                class="f-field__label f-field__label--select"
                for="month">{{ $t('month') }}</label>
            </div>
            <div class="f-field f-field--hidden-label">
              <input
                id="year"
                v-model="year"
                class="f-field__input "
                type="text"
                name="year">
              <label
                for="year"
                class="f-field__label">
                Year
              </label>
            </div>
          </div>
        </fieldset> -->
        <url v-model="url" />
        <volume v-model="volume" />
        <div class="f-inline-group">
          <year v-model="year" />
          <month v-model="month" />
        </div>
        <pages v-model="pages" />
        <keyword-tag-input v-model="keyword" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Journal from '@/components/records/forms/fields/Journal'
import Doi from '@/components/records/forms/fields/Doi'
import Abstract from '@/components/records/forms/fields/Abstract'
import Url from '@/components/records/forms/fields/Url'
import Volume from '@/components/records/forms/fields/Volume'
import Year from '@/components/records/forms/fields/Year'
import Month from '@/components/records/forms/fields/Month'
import Pages from '@/components/records/forms/fields/Pages'
import KeywordTagInput from '@/components/utils/KeywordTagsInput'
export default {
  components: {
    Journal,
    Doi,
    Abstract,
    Url,
    Volume,
    Year,
    Month,
    Pages,
    KeywordTagInput
  },
  data () {
    return {
      journal: '',
      doi: '',
      abstract: '',
      number: '',
      url: '',
      author: [],
      newAuthor: {},
      volume: '',
      year: '',
      month: '',
      pages: '',
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
      const keys = ['journal', 'doi', 'abstract', 'number', 'url', 'author', 'volume', 'month', 'year', 'pages', 'keyword']
      for (let key of keys) {
        newRecord[key] = this[key]
      }
      this.updateNewRecord({ newRecord })
      this.updateIteration()
      if (this.journal.length > 3) {
        this.updateValidation({ validation: { step: true } })
      } else {
        this.updateValidation({ validation: { step: false } })
      }
    }
  }
}
</script>
