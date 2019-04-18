<template>
  <main class="search-page layout-centered">
    <header>
      <h1 class="search-page__title">
        {{ $t('scientific.repository') }}
      </h1>
    </header>
    <div class="f-search">
      <button
        class="f-search__submit"
        @click="performSearch(searchQuery, 'records')"
      >
        {{ $t('search') }}
      </button>
      <input
        ref="searchInput"
        v-model="searchQuery"
        :placeholder="$t('search...')"
        type="text"
        class="f-search__input f-search__input--card"
        @keydown.down="focusOn($refs.searchRecords)"
        @keydown.enter="performSearch(searchQuery, 'records')"
      >

      <transition
        name="f-search-fade-down"
        mode="in-out"
      >
        <ul
          v-if="searchQuery && searchQuery.length > 0"
          class="f-search__dropdown card"
        >
          <li
            class="card-row"
          >
            <button
              ref="searchRecords"
              class=" f-search__dropdown__link card-row__link"
              @keydown.up="focusOn($refs.searchInput)"
              @keydown.down="focusOn($refs.searchUnits)"
              @click="performSearch(searchQuery, 'records')"
            >
              {{ $t('search') }} &ldquo;<span class="f-search__dropdown__query">{{ searchQuery }}</span>&rdquo; {{ $t('in.publications') }}
            </button>
          </li>
          <li
            class="card-row"
          >
            <button
              ref="searchUnits"
              class=" f-search__dropdown__link card-row__link"
              @keydown.up="focusOn($refs.searchRecords)"
              @keydown.down="focusOn($refs.searchResearchers)"
              @click="performSearch(searchQuery, 'units')"
            >
              {{ $t('search') }} &ldquo;<span class="f-search__dropdown__query">{{ searchQuery }}</span>&rdquo; {{ $t('in.units.or.departments') }}
            </button>
          </li>
          <li
            class="card-row"
          >
            <button
              ref="searchResearchers"
              class=" f-search__dropdown__link card-row__link"
              @keydown.up="focusOn($refs.searchUnits)"
              @click="performSearch(searchQuery, 'researchers')"
            >
              {{ $t('search') }} &ldquo;<span class="f-search__dropdown__query">{{ searchQuery }}</span>&rdquo; {{ $t('in.researchers') }}
            </button>
          </li>
        </ul>
      </transition>
    </div>
    <p class="search-page__other-option">
      <router-link
        :to="{ name: 'ListUnitsPage', params: { unitID: '0O7FlG3YkcMNBTtz6k4lo' }}"
        class="btn--arrow-right btn--fake-link"
      >
        {{ $t('explore.units') }}
      </router-link>
    </p>
  </main>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    focusOn (ref) {
      ref.focus()
    },
    performSearch (query, type) {
      this.$router.push({ name: 'SearchResultsPage', query: { query, type } })
    }
  }
}
</script>
<style lang="scss">
.search-page.layout-centered{
  position: absolute;
  left: 50%;
  top: 6rem;
  transform: translate(-50%, 0);
  text-align: center;
  width: 100%;
  max-width: 46rem;
  padding: 1rem;
  @media screen and (min-width: 47.5rem){
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.search-page__title{
  font-size: 1.2rem;
  @media screen and (min-width: 47.5rem){
    font-size: 2rem;
  }
}
.search-page__other-option{
  margin-top: 2rem;
}
</style>
