<template>
  <div class="container">
    <header class="creation-form__header">
      <h1>Nova publicação</h1>
      <p>
        Que tipo de publicação quer criar? <br>
        ou <a href>Importar ficheiro BibTex</a>
      </p>
    </header>
    <div>
      <ul class="grid-list">
        <li class="grid-list__item">
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'article'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('article')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('article') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'manual'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('manual')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('manual') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'tech-report'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('tech-report')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('tech-report') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'book'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('book')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('book') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'inbook'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('inbook')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('inbook') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'incollection'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('incollection')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('incollection') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'patent'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('patent')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('patent') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'mastersthesis'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('mastersthesis')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('mastersthesis') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'phdthesis'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('phdthesis')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('phdthesis') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'booklet'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('booklet')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('booklet') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'inproceedings'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('inproceedings')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('inproceedings') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'prize'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('prize')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('prize') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'unpublished'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('unpublished')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('unpublished') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'proceedings'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('proceedings')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('proceedings') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
        <li
          class="grid-list__item"
        >
          <a
            :class="{'grid-list__link--selected': newRecord.type === 'misc'}"
            href
            class="grid-list__link"
            @click.prevent="selectType('misc')"
          >
            <h4 class="new-publication__type-title h4--ssp">
              {{ $t('misc') }}
            </h4>
            <p class="new-publication__type-description">description</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters('record-creation', [
      'stepNumber',
      'steps',
      'newRecord',
      'iteration'
    ])
  },
  methods: {
    ...mapActions('record-creation', [
      'updateStepNumber',
      'updateSteps',
      'updateNewRecord',
      'updateNextValid',
      'updateIteration'
    ]),
    validate () {
    },
    selectType (type) {
      this.updateNewRecord({ newRecord: { type } })
      this.updateNextValid({ valid: true })
      this.updateIteration()
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variables.scss';
.grid-list{
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
}
.grid-list__item{
  min-width: 100%;
  flex-basis: 100%;
  justify-self: stretch;
  padding: 1rem;
  @media screen and (min-width: 560px){
    min-width: 280px;
    flex-basis: 50%;
  }
  @media screen and (min-width: 840px){
    min-width: 17.5rem;
    flex-basis: 33%;
  }
  @media screen and (min-width: 1170px){
    min-width: 25%;
    flex-basis: 25%;
  }

}
.grid-list__link{
  display: block;
  height: 7.5rem;
  padding: 1rem;
  border: 0.0625rem solid #D8D8D8;
  border-radius: 0.1875rem;
  cursor: pointer;
  transition: border-color .3s ease, background-color .3s ease;
}
.new-publication__type-title,
.new-publication__type-description{
  transition: color .3s ease;
}
.grid-list__link--selected{
  border-color: $blue;
  background-color: $blue;
}

.grid-list__link--selected .new-publication__type-title,
.grid-list__link--selected .new-publication__type-description{
  color: white;
}
</style>
