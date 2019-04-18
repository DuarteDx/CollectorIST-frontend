<template>
  <div
    v-if="true"
    class="layout-search-results"
  >
    <div class="layout-search-results__search-section">
      <div class="container">
        <div class="f-search">
          <button
            class="f-search__submit"
            @click="performSearch()"
          >
            Search
          </button>
          <input
            ref="searchInput"
            v-model="searchQuery"
            :placeholder="$t('Search...')"
            type="text"
            class="f-search__input f-search__input--card"
            @keydown.enter="performSearch()"
          >
        </div>
      </div>
    </div>
    <div class="layout-search-results__main-content">
      <div class="container">
        <div class="layout-search-results__two-columns">
          <main class="layout-search-results__results-section">
            <template v-if="type === 'records'">
              <template v-if="records">
                <template v-if="records.items.length > 0">
                  <h2 class="results-section__title">
                    {{ $t('empty.state.search.results.for.records.on', { count: records.totalItems }, records.totalItems) }} &ldquo;{{ queryProp }}&rdquo;
                  </h2>
                  <list-records
                    :records="recordsList"
                  />
                  <pagination-bar
                    v-if="records"
                    :current-page="page"
                    :total-items="records.totalItems"
                    :items-per-page="perPage"
                    @paginate="changePage"
                  />
                </template>
                <div
                  v-else
                  class="empty-state"
                >
                  <div class="empty-state__illustration">
                    <svg
                      width="71"
                      height="84"
                      viewBox="0 0 71 84"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path d="M-885-522H555V760H-885z" />
                        <g
                          stroke-width="2.88"
                          stroke="#666"
                        >
                          <path d="M5.26 1.68h60.48c1.59058 0 2.88 1.28942 2.88 2.88v74.88c0 1.59058-1.28942 2.88-2.88 2.88H5.26c-1.59058 0-2.88-1.28942-2.88-2.88V4.56c0-1.59058 1.28942-2.88 2.88-2.88zM13.9 59.28h43.2M13.9 66.84h43.2M13.9 52.08h43.2M13.9 44.88h43.2M13.9 37.68h43.2M13.9 30.48h21.6" />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M48.46 1.68l20.16 20.16H48.46z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h1 class="h4 empty-state__title">
                    {{ $t('empty.state.search.results.for.records.on', { count: 0 }, 0) }} "{{ searchQuery }}"
                  </h1>
                  <p class="empty-state__description">
                    {{ $t('empty.state.search.results.for.records.on.description') }}
                  </p>
                </div>
              </template>
              <template v-else>
                <h2 class="results-section__title loading-text">
                  X records for “query”
                </h2>
                <list-records />
              </template>
            </template>
            <template v-else-if="type === 'researchers'">
              <template v-if="researchers">
                <template v-if="researchers.items.length > 0">
                  <h2 class="results-section__title">
                    {{ $t('empty.state.search.results.for.researchers.on', { count: researchers.totalItems }, researchers.totalItems) }} &ldquo;{{ queryProp }}&rdquo;
                  </h2>
                  <ul
                    class="card card-list"
                  >
                    <li
                      v-for="researcher in researchers.items"
                      :key="researcher.id"
                      class="card-row"
                    >
                      <avatar
                        :src="researcher.avatar+'?d=mp'"
                        :name="researcher.name"
                        class="card-row__figure list-users__avatar"
                      />
                      <div class="card-row__text">
                        <h1 class="card-row__title h5--ssp researcher-name">
                          <router-link
                            :to="{name: 'ResearcherPage', params: { userId: researcher.username }}"
                            class="card-row__link"
                          >
                            {{ researcher.name }}
                          </router-link>
                        </h1>
                      </div>
                    </li>
                  </ul>
                </template>
                <div
                  v-else
                  class="empty-state"
                >
                  <div class="empty-state__illustration">
                    <svg
                      width="102"
                      height="63"
                      viewBox="0 0 102 63"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        transform="translate(2.1 2.153125)"
                        stroke="#666"
                        stroke-width="3.2"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path d="M65.593228 39.268443c3.266294-4.473653 8.614056-7.389426 14.65705-7.389426 9.945283 0 18.007528 7.897392 18.007528 17.63932h-24.84845" />
                        <ellipse
                          cx="80.250278"
                          cy="17.799622"
                          rx="10.004182"
                          ry="9.799622"
                        />
                        <path d="M24.83926 49.518336H0c0-9.741927 8.062245-17.639319 18.007528-17.639319 6.040925 0 11.387095 2.913777 14.653695 7.384832" />
                        <ellipse
                          cx="18.007528"
                          cy="17.799622"
                          rx="10.004182"
                          ry="9.799622"
                        />
                        <path d="M75.317076 59.082042c0-14.071673-11.726902-25.479017-26.192768-25.479017-14.465867 0-26.192769 11.407344-26.192769 25.479017h52.385537z" />
                        <ellipse
                          cx="49.124308"
                          cy="14.155009"
                          rx="14.551538"
                          ry="14.155009"
                        />
                      </g>
                    </svg>
                  </div>
                  <h1 class="h4 empty-state__title">
                    {{ $t('empty.state.search.results.for.researchers.on', { count: 0 }, 0) }} "{{ searchQuery }}"
                  </h1>
                  <p class="empty-state__description">
                    {{ $t('empty.state.search.results.for.researchers.on.description') }}
                  </p>
                </div>
              </template>
              <template v-else>
                <h2 class="results-section__title loading-text">
                  X researchers for “query”
                </h2>
                <ul class="card card-list">
                  <li
                    v-for="x in 6"
                    :key="x"
                    class="card-row"
                  >
                    <avatar
                      :name="''"
                      class="card-row__figure list-users__avatar"
                    />
                    <div class="card-row__text">
                      <h1 class="card-row__title h5--ssp researcher-name">
                        <span
                          class="loading-text card-row__link"
                        >
                          Loading name</span>
                      </h1>
                    </div>
                  </li>
                </ul>
              </template>
            </template>
            <template v-else-if="type === 'units'">
              <template v-if="units">
                <template v-if="units.items.length > 0">
                  <h2 class="results-section__title">
                    {{ $t('empty.state.search.results.for.units.on', { count: units.totalItems }, units.totalItems) }} &ldquo;{{ queryProp }}&rdquo;
                  </h2>
                  <ul class="card card-list">
                    <li
                      v-for="unit in units.items"
                      :key="unit.id"
                      class="card-row"
                    >
                      <avatar
                        :name="unit.name"
                        class="card-row__figure"
                      />
                      <div class="card-row__text">
                        <h1 class="card-row__title h5--ssp unit-name">
                          <router-link
                            :to="{name: 'UnitPage', params: {unitID:unit.id}}"
                            class="card-row__link"
                          >
                            {{ unit.name }}
                          </router-link>
                        </h1>
                        <p>{{ $t('num.researchers', { count: unit.stats.researcherCount }, unit.stats.researcherCount) }}</p>
                      </div>
                    </li>
                  </ul>
                </template>
                <div
                  v-else
                  class="empty-state"
                >
                  <div class="empty-state__illustration">
                    <svg
                      width="117"
                      height="76"
                      viewBox="0 0 117 76"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="#666"
                        stroke-width="2"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <path
                          d="M1.5 74.179688h113.568"
                          stroke-linecap="round"
                        />
                        <path d="M90.38 31.667688h19.632v41.264H90.38zM6.556 31.667688h19.632v41.264H6.556zM3.852 24.659688h25.04v6.112H3.852zM87.676 24.659688h25.04v6.112h-25.04zM25.484 17.651688h65.6v6.112h-65.6z" />
                        <path
                          stroke-linecap="round"
                          d="M52.876 1.531688h13.52l-3.38 4.056 3.38 4.056h-13.52z"
                        />
                        <path d="M52.876 17.755688v-17.576M55.932 34.827688h4.704v14.168h-4.704zM45.116 34.827688h4.704v14.168h-4.704zM34.3 34.827688h4.704v14.168H34.3zM66.748 34.827688h4.704v14.168h-4.704zM77.564 34.827688h4.704v14.168h-4.704zM97.844 37.531688h4.704v14.168h-4.704zM97.844 59.163688h4.704v11.464h-4.704zM14.02 37.531688h4.704v14.168H14.02zM14.02 59.163688h4.704v11.464H14.02zM55.932 56.459688h4.704v14.168h-4.704zM45.116 56.459688h4.704v14.168h-4.704zM34.3 56.459688h4.704v14.168H34.3zM66.748 56.459688h4.704v14.168h-4.704zM77.564 56.459688h4.704v14.168h-4.704z" />
                      </g>
                    </svg>
                  </div>
                  <h1 class="h4 empty-state__title">
                    {{ $t('empty.state.search.results.for.units.on', { count: 0 }, 0) }} "{{ searchQuery }}"
                  </h1>
                  <p class="empty-state__description">
                    {{ $t('empty.state.search.results.for.units.on.description') }}
                  </p>
                </div>
              </template>
              <template v-else>
                <h2 class="results-section__title loading-text">
                  X units for “query”
                </h2>
                <ul class="card card-list">
                  <li
                    v-for="x in 6"
                    :key="x"
                    class="card-row"
                  >
                    <avatar
                      :name="''"
                      class="card-row__figure"
                    />
                    <div class="card-row__text">
                      <h1 class="card-row__title h5--ssp unit-name">
                        <span class="card-row__link loading-text">
                          Loading name
                        </span>
                      </h1>
                      <p class="loading-text">
                        X {{ $t('researchers') }}
                      </p>
                    </div>
                  </li>
                </ul>
              </template>
            </template>
          </main>
          <aside class="layout-search-results__filters-section">
            <section class="vertical-tab-navigation">
              <ul class="vertical-tab-navigation__list">
                <li
                  :class="{'vertical-tab-navigation__item--selected': type === 'records'}"
                  class="vertical-tab-navigation__item"
                  @click.prevent="changeType('records')"
                >
                  <a
                    href
                    class="vertical-tab-navigation__link"
                  >{{ $t('Records') }}</a>
                </li>
                <li
                  :class="{'vertical-tab-navigation__item--selected': type === 'researchers'}"
                  class="vertical-tab-navigation__item"
                  @click.prevent="changeType('researchers')"
                >
                  <a
                    href
                    class="vertical-tab-navigation__link"
                  >{{ $t('researchers') }}</a>
                </li>
                <li
                  :class="{'vertical-tab-navigation__item--selected': type === 'units'}"
                  class="vertical-tab-navigation__item"
                  @click.prevent="changeType('units')"
                >
                  <a
                    href
                    class="vertical-tab-navigation__link"
                  >{{ $t('Units') }}</a>
                </li>
              </ul>
            </section>
            <section
              v-if="type === 'records'"
              :class="{'filter-section--is-open': filterRecordTypesIsOpen}"
              class="filter-section"
            >
              <h1 class="filter-section__title">
                Tipologias
                <a
                  href
                  class="filter-section__toggle-trigger"
                  @click.prevent="toggleFilterRecordTypes()"
                />
              </h1>
              <ul
                v-if="recordTemplateFilters"
                class="filter-section__list"
              >
                <li
                  v-for="(filter, template) in recordTemplateFilters"
                  :key="template"
                  class="filter-section__item f-field f-field--checkbox"
                >
                  <input
                    :id="filter.label"
                    :checked="filter.value"
                    type="checkbox"
                    class="f-field__checkbox"
                    @input="toggleRecordTemplateFilter(template)"
                  >
                  <label
                    :for="filter.label"
                    class="f-field__label f-field__label--checkbox"
                  >{{ filter.label }}</label>
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationBar from '@/components/utils/PaginationBar'
import ListRecords from '@/components/records/ListRecords'
import Avatar from '@/components/utils/Avatar'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    ListRecords,
    PaginationBar,
    Avatar
  },
  props: {
    type: {
      type: String,
      default: 'researchers'
    },
    query: {
      type: String,
      required: true
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    templates: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      perPage: 10,
      searchTimeoutID: undefined,
      searchQuery: undefined,
      currentPage: undefined,
      filterRecordTypesIsOpen: false,
      queryProp: this.query, // Because you can't mutate props
      recordTemplateFilters: {
        'article': {
          label: 'Article',
          value: false
        },
        'mastersthesis': {
          label: 'MasterThesis',
          value: false
        },
        'phdthesis': {
          label: 'PhDThesis',
          value: false
        },
        'inproceedings': {
          label: 'InProceedings',
          value: false
        },
        'incollection': {
          label: 'Incollection',
          value: false
        },
        'techreport': {
          label: 'Techreport',
          value: false
        },
        'misc': {
          label: 'Misc',
          value: false
        },
        'inbook': {
          label: 'Inbook',
          value: false
        },
        'prize': {
          label: 'Prize',
          value: false
        },
        'book': {
          label: 'Book',
          value: false
        },
        'proceedings': {
          label: 'Proceedings',
          value: false
        },
        'manual': {
          label: 'Manual',
          value: false
        },
        'patent': {
          label: 'Patent',
          value: false
        },
        'unpublished': {
          label: 'Unpublished',
          value: false
        },
        'booklet': {
          label: 'Booklet',
          value: false
        }
      }
    }
  },
  computed: {
    ...mapState({
      'researchers': state => state.researchers.list,
      'records': state => state.records.list,
      'units': state => state.units.list
    }),
    researchersList () {
      return this.researchers ? this.researchers.items : undefined
    },
    recordsList () {
      return this.records ? this.records.items : undefined
    },
    unitsList () {
      return this.units ? this.units.items : undefined
    },
    searchChange () {
      return [this.page, this.queryProp, this.type, this.templates].join()
    },
    recordsActiveTemplates () {
      return Object.keys(this.recordTemplateFilters).filter(key => {
        if (this.recordTemplateFilters[key].value) {
          return key
        }
      })
    }
  },
  watch: {
    searchChange: {
      immediate: true,
      async handler () {
        this.ajaxSearch()
      }
    },
    searchQuery (newValue) {
      clearTimeout(this.searchTimeoutID)
      this.searchTimeoutID = setTimeout(() => {
        this.queryProp = newValue
      }, 1000)
    }
  },
  beforeDestroy () {
    clearTimeout(this.searchTimeoutID)
  },
  async created () {
    this.searchQuery = this.queryProp
    Object.keys(this.recordTemplateFilters).forEach(key => {
      if (this.templates.includes(key)) {
        this.recordTemplateFilters[key].value = true
      }
    })
    this.ajaxSearch()
  },
  methods: {
    ...mapActions({
      'fetchResearchers': 'researchers/fetchMany',
      'fetchRecords': 'records/fetchMany',
      'fetchUnits': 'units/fetchMany'
    }),
    toggleFilterRecordTypes () {
      this.filterRecordTypesIsOpen = !this.filterRecordTypesIsOpen
    },
    changePage (page) {
      this.performSearch({ query: this.queryProp, type: this.type, page, templates: this.recordsActiveTemplates })
    },
    changeType (type) {
      this.performSearch({ query: this.queryProp, type: type, templates: this.recordsActiveTemplates })
    },
    toggleRecordTemplateFilter (template) {
      this.recordTemplateFilters[template].value = !this.recordTemplateFilters[template].value
      clearTimeout(this.searchTimeoutID)
      this.searchTimeoutID = setTimeout(() => {
        this.performSearch({ query: this.queryProp, type: this.type, templates: this.recordsActiveTemplates })
      }, 1000)
    },
    performSearch ({ query, type, page, templates }) {
      this.$router.replace({
        name: 'SearchResultsPage',
        query: { query, type, page, templates }
      })
    },
    async ajaxSearch () {
      try {
        switch (this.type) {
          case 'records':
            await this.fetchRecords({
              q: this.queryProp,
              sort: undefined,
              page: this.page,
              perPage: this.perPage,
              templates: this.templates
            })
            break
          case 'researchers':
            await this.fetchResearchers({
              q: this.queryProp,
              sort: undefined,
              page: this.page,
              perPage: this.perPage
            })
            break
          case 'units':
            await this.fetchUnits({
              q: this.queryProp,
              sort: undefined,
              page: this.page,
              perPage: this.perPage
            })
            break
        }
      } catch (err) {
        if (err.response.data.key) {
          alert(`TODO, handle ${err.response.data.key}`)
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variables.scss';
.filter-section{
  height: 2.375rem;
  overflow: hidden;
  @media screen and (min-width: 60rem){
    height: unset;
    overflow: initial;
    margin-bottom: 2rem;
  }
}
.filter-section--is-open{
  height: unset;
  overflow: initial;
}
.results-section__title{
  font-size: 1.125rem;
  @media screen and (min-width: 60rem){
    //extend from h2
    font-size: 1.6875rem;
  }
}
.filter-section__title{
  font-size: 1.125rem;
  font-weight: 600;
  font-family: $primary-font;
  color: $dark;
  position: relative;
  padding: .5rem .5rem .5rem 0;
  border-bottom: 0.0625rem solid $light-blue;
  @media screen and (min-width: 47.5rem){
    border-bottom: none;
  }
}
.filter-section__toggle-trigger{
  width: 100%;
  height: 1.1875rem;
  position: absolute;
  right: 0;
  top: .75rem;
  background-image: url("data:image/svg+xml;utf8,%3Csvg width='12' height='7' viewBox='0 0 12 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M-372-379h1440v1577H-372z'/%3E%3Cpath d='M6.036562 4.222324L9.553622.705263c.384802-.384802 1.021846-.38868 1.41237.001844.393247.393247.39135 1.022864.001844 1.41237L6.921954 6.165359c-.042268.071475-.09423.138974-.155913.200658-.200636.200636-.46634.29717-.72948.291428-.263137.005741-.528842-.090792-.729479-.291428-.061683-.061684-.113644-.129183-.155913-.200658L1.105287 2.119477C.715781 1.72997.713884 1.100354 1.107131.707107 1.497655.316582 2.1347.32046 2.519501.705263l3.51706 3.51706z' fill='%2345555F'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: .875rem .875rem;
  background-position: calc(100% - .875rem) 0;
  @media screen and (min-width: 60rem){
    visibility: hidden;
    pointer-events: none;
  }
}
.filter-section--is-open .filter-section__toggle-trigger{
  background-image: url("data:image/svg+xml;utf8,%0A%3Csvg width='12px' height='7px' viewBox='0 0 12 7' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Home' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Publicações' transform='translate(-372.000000, -378.000000)'%3E%3Crect x='0' y='0' width='1440' height='1577'%3E%3C/rect%3E%3Cg id='Icons/Icon-Arrow/Slate' transform='translate(378.000000, 382.000000) rotate(-180.000000) translate(-378.000000, -382.000000) translate(366.000000, 370.000000)'%3E%3Cg id='Icons/Arrows/Icon-Arrow-Down/Slate'%3E%3Crect id='bounds' opacity='0' x='0' y='0' width='24' height='24'%3E%3C/rect%3E%3Cg id='Paths' transform='translate(6.000000, 9.000000)' fill='%2345555F'%3E%3Cpath d='M6.03656185,4.22232387 L9.55362273,0.705262995 C9.93842425,0.32046147 10.5754682,0.316582489 10.9659925,0.707106781 C11.3592395,1.10035374 11.3573423,1.72997056 10.9678363,2.11947656 L6.92195428,6.16535857 C6.87968605,6.23683441 6.82772476,6.30433349 6.76604133,6.36601692 C6.56540518,6.56665307 6.29970008,6.66318633 6.03656185,6.65744479 C5.77342362,6.66318633 5.50771852,6.56665307 5.30708237,6.36601692 C5.24539894,6.30433349 5.19343765,6.23683441 5.15116942,6.16535857 L1.10528741,2.11947656 C0.715781412,1.72997056 0.71388424,1.10035374 1.1071312,0.707106781 C1.49765549,0.316582489 2.13469945,0.32046147 2.51950097,0.705262995 L6.03656185,4.22232387 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.filter-section__item{
  margin: 1rem 0;
}
.vertical-tab-navigation{
  border-bottom: 0.0625rem solid $light-blue;
  @media screen and (min-width: 60rem){
    margin-bottom: 3.5rem;
    border-bottom: none;
  }
}
.vertical-tab-navigation__list {
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  @media screen and (min-width: 60rem){
    flex-flow: column nowrap;

  }
}
.vertical-tab-navigation__item {

}
.vertical-tab-navigation__item:last-child{
  margin-bottom: 0;
}
.vertical-tab-navigation__item--selected .vertical-tab-navigation__link {
  color: $blue;
  &:after{
      background-color:rgba($blue, 1);
      transform: scale(1);
  }
  @media screen and (min-width: 60rem){
    color: $dark;
    background-color: $light-blue;
    &:after{
      display: none;
    }
  }
}
.vertical-tab-navigation__link {
  padding: 1rem .5rem;
  width: 100%;
  display: block;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: $dark;
   //from tab item
  position: relative;
  font-weight: 600;
  font-size: 0.875rem;
  color: $gray;
  text-transform: uppercase;
  transition: color .3s ease;
  cursor: pointer;
  &:focus{
      outline: none;
  }
  &:after{
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.125rem;
    background-color:rgba($blue, 0);
    transform-origin: 50%;
    transform: scale(.8);
    transition: background-color    .3s     ease,
                transform           .3s     ease;
    }
}
</style>
