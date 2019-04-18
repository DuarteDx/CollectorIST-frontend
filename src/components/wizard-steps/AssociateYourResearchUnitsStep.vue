<template>
  <renderless-researcher-affiliations>
    <div
      slot-scope="{ affiliationsPage, searchUnits, addAffiliation, removeAffiliation, unitsPage }"
      class="associate-your-research-units-step layout-wizard__inner-container layout-wizard__inner-container--lg"
    >
      <header class="layout-wizard__header">
        <svg
          width="144px"
          height="94px"
          viewBox="0 0 144 94"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Tour"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Tour---04---Unidades"
              transform="translate(-728.000000, -227.000000)"
              stroke="#0092E0"
              stroke-width="2"
            >
              <g
                id="icons/iconlib/campus"
                transform="translate(729.000000, 227.000000)"
              >
                <g id="campus">
                  <path
                    id="Path-35"
                    d="M0,92.5 L141.96,92.5"
                    stroke-linecap="round"
                  />
                  <rect
                    id="Rectangle-19"
                    x="110.85"
                    y="39.11"
                    width="25.04"
                    height="52.08"
                  />
                  <rect
                    id="Rectangle-19"
                    x="6.07"
                    y="39.11"
                    width="25.04"
                    height="52.08"
                  />
                  <rect
                    id="Rectangle-44"
                    x="2.69"
                    y="30.35"
                    width="31.8"
                    height="8.14"
                  />
                  <rect
                    id="Rectangle-44"
                    x="107.47"
                    y="30.35"
                    width="31.8"
                    height="8.14"
                  />
                  <rect
                    id="Rectangle-44"
                    x="29.73"
                    y="21.59"
                    width="82.5"
                    height="8.14"
                  />
                  <polygon
                    id="Rectangle-53"
                    stroke-linecap="round"
                    points="64.22 1.69 81.12 1.69 76.895 6.76 81.12 11.83 64.22 11.83"
                  />
                  <path
                    id="Path-40"
                    d="M64.22,21.97 L64.22,0"
                  />
                  <rect
                    id="Rectangle-20"
                    x="68.29"
                    y="43.56"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="54.77"
                    y="43.56"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="41.25"
                    y="43.56"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="81.81"
                    y="43.56"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="95.33"
                    y="43.56"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="120.68"
                    y="46.94"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="120.68"
                    y="73.98"
                    width="5.38"
                    height="13.83"
                  />
                  <rect
                    id="Rectangle-20"
                    x="15.9"
                    y="46.94"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="15.9"
                    y="73.98"
                    width="5.38"
                    height="13.83"
                  />
                  <rect
                    id="Rectangle-20"
                    x="68.29"
                    y="70.6"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="54.77"
                    y="70.6"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="41.25"
                    y="70.6"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="81.81"
                    y="70.6"
                    width="5.38"
                    height="17.21"
                  />
                  <rect
                    id="Rectangle-20"
                    x="95.33"
                    y="70.6"
                    width="5.38"
                    height="17.21"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <h1>{{ $t('affiliations') }}</h1>
        <p>{{ $t('wizard.affiliations.description') }}</p>
      </header>
      <div class="f-search">
        <button class="f-search__submit">
          {{ $t('Search') }}
        </button>
        <input
          v-model="searchQuery"
          v-click-outside="closeSearchSuggestions"
          :placeholder="$t('search.unit')"
          type="search"
          class="f-search__input f-search__input--card"
          @focus="openSearchSuggestions()"
          @input="searchUnits({ query: searchQuery, limit: 5 })"
        >
        <transition
          name="f-search-fade-down"
          mode="in-out"
        >
          <ul
            v-if="searchIsOpen"
            class="f-search__dropdown f-search__dropdown--scrollable card"
          >
            <template
              v-if="unitsPage && unitsPage.items.length > 0"
            >
              <li
                v-for="searchSuggestion in unitsPage.items"
                :key="searchSuggestion.id"
                class="f-search__dropdown__item card-row"
                @click.prevent="openDatePickingModal({ unit: searchSuggestion })"
              >
                <div class="card-row__text">
                  <span class="unit-breadcrumb small u-text-secondary">{{ searchSuggestion.path.map(e => e.acronym).join(" &gt; ") }} &gt; {{ searchSuggestion.acronym }}</span>
                  <h1 class="card-row__title h5--ssp unit-name">
                    <button class="card-row__link">
                      {{ searchSuggestion.name }}
                    </button>
                  </h1>
                </div>
              </li>
            </template>
            <template v-else>
              <li
                class="f-search__dropdown__item card-row"
              >
                <div class="card-row__text">
                  <h1 class="card-row__title h5--ssp unit-name">
                    <p class="card-row__link">
                      No Suggestions
                    </p>
                  </h1>
                </div>
              </li>
            </template>
          </ul>
        </transition>
      </div>
      <ul
        v-if="affiliationsPage.totalItems > 0"
        class="card card-list list-affiliations"
      >
        <li
          v-for="affiliation in affiliationsPage.items"
          :key="affiliation.id"
          class="card-row"
        >
          <avatar
            :name="affiliation.unit.name"
            class="card-row__figure"
          />
          <div class="card-row__text">
            <h1 class="card-row__title h5--ssp unit-name">
              {{ affiliation.unit.name }}
            </h1>
            <p>{{ $t('months.'+affiliation.start.month) }} {{ affiliation.start.year }} &ndash; <span v-if="affiliation.end && affiliation.end.month != null || undefined">{{ $t('months.'+affiliation.end.month) }} {{ affiliation.end.year }}</span><span v-else>{{ $t('currently') }}</span></p>
          </div>
          <dropdown>
            <button
              slot="dropdown-trigger"
              class="i-ellipsis"
              aria-label="More options"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <template slot="dropdown-panel">
              <ul class="dropdown-menu dropdown--xs">
                <li
                  v-if="!PRODREADY"
                  class="dropdown-menu__item"
                >
                  <a
                    href
                    class="dropdown-menu__link"
                    @click.prevent="editAffiliation(affiliation)"
                  >
                    {{ $t('edit') }}
                  </a>
                </li>
                <li class="dropdown-menu__item">
                  <a
                    href
                    class="dropdown-menu__link u-text-danger"
                    @click.prevent="removeAffiliation({ id: affiliation.id })"
                  >
                    {{ $t('remove') }}
                  </a>
                </li>
              </ul>
            </template>
          </dropdown>
        </li>
      </ul>
      <modal v-model="AffiliationDetailsModal">
        <div
          v-if="currentlySelectedUnit"
          slot="modal-panel"
        >
          <h1>{{ currentlySelectedUnit.name }}</h1>
          <form @submit.prevent="submitAffilitation">
            <section class="f-inline-group">
              <div class="f-field">
                <select
                  id="startingMonth"
                  v-model="startingMonth"
                  class="f-field__input f-field__input--select"
                  name="startingMonth"
                >
                  <option
                    v-for="month in 12"
                    :key="'starting-'+month"
                    :value="month"
                  >
                    {{ $t('months.'+month) }}
                  </option>
                </select>
                <label
                  class="f-field__label f-field__label--select"
                  for="startingMonth"
                >{{ $t('month.start') }}</label>
              </div>
              <div class="f-field">
                <input
                  id="startingYear"
                  ref="startingYear"
                  v-model="startingYear"
                  :class="{'f-field__input--is-filled': startingYear}"
                  class="f-field__input f-field__input--allways-open"
                  type="number"
                  placeholder="ex: 1998"
                  name="startingYear"
                  min="1900"
                >
                <label
                  for="startingYear"
                  class="f-field__label"
                >{{ $t('year.start') }}</label>
              </div>
            </section>
            <section class="f-inline-group">
              <div
                :class="{'f-field--disabled': currentlyAffiliated}"
                class="f-field"
              >
                <select
                  id="endingMonth"
                  v-model="endingMonth"
                  :disabled="currentlyAffiliated"
                  class="f-field__input f-field__input--select"
                  name="endingMonth"
                >
                  <option
                    v-for="month in 12"
                    :key="'ending-'+month"
                    :value="month"
                  >
                    {{ $t('months.'+month) }}
                  </option>
                </select>
                <label
                  for="endingMonth"
                  class="f-field__label f-field__label--select"
                >
                  {{ $t('month.end') }}
                </label>
              </div>
              <div
                :class="{'f-field--disabled': currentlyAffiliated}"
                class="f-field"
              >
                <input
                  id="endingYear"
                  ref="endingYear"
                  v-model="endingYear"
                  :disabled="currentlyAffiliated"
                  :class="{'f-field__input--is-filled': endingYear}"
                  :min="startingYear ? startingYear : 1930 "
                  class="f-field__input f-field__input--allways-open"
                  placeholder="ex: 2018"
                  type="number"
                  name="endingYear"
                >
                <label
                  for="startingYear"
                  class="f-field__label"
                >{{ $t('year.end') }}</label>
              </div>
            </section>
            <section class="f-group">
              <div class="f-field f-field--checkbox">
                <input
                  id="currentlyAffiliated"
                  v-model="currentlyAffiliated"
                  type="checkbox"
                  class="f-field__checkbox"
                >
                <label
                  class="f-field__label f-field__label--checkbox"
                  for="currentlyAffiliated"
                >{{ $t('currently.affiliated') }}</label>
              </div>
            </section>
            <section class="btn--group">
              <div
                class="btn btn--outline"
                @click="closeDatePickingModal()"
              >
                {{ $t('cancel') }}
              </div>
              <button
                id="submitAffilitation"
                ref="endingYear"
                class="btn btn--primary"
                type="submit"
                name="submitAffilitation"
                @click="addAffiliation({ unitID: currentlySelectedUnit.id, start: { year: parseInt(startingYear), month: startingMonth }, currentlyAffiliated, end: { year: parseInt(endingYear), month: endingMonth }})"
              >
                {{ $t('create.affiliation') }}
              </button>
            </section>
          </form>
        </div>
      </modal>
    </div>
  </renderless-researcher-affiliations>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import { mapState } from 'vuex'
import Modal from '@/components/utils/Modal'
import Avatar from '@/components/utils/Avatar'
import Dropdown from '@/components/utils/Dropdown'
import RenderlessResearcherAffiliations from '@/components/profile/RenderlessResearcherAffiliations'
export default {
  components: {
    Modal,
    Avatar,
    Dropdown,
    RenderlessResearcherAffiliations
  },
  directives: {
    ClickOutside
  },
  data () {
    return {
      searchIsOpen: false,
      startingMonth: undefined,
      startingYear: undefined,
      endingMonth: undefined,
      endingYear: undefined,
      currentlyAffiliated: false,
      currentlySelectedUnit: undefined,
      searchQuery: undefined,
      AffiliationDetailsModal: false
    }
  },
  computed: {
    ...mapState({
      'profile': state => state.profile.current
    })
  },
  watch: {
    AffiliationDetailsModal: function (val) {
      if (!val) {
        this.startingYear = undefined
        this.startingMunth = undefined
        this.endingYear = undefined
        this.endingMunth = undefined
        this.currentlyAffiliated = undefined
      }
    }
  },
  methods: {
    async openSearchSuggestions () {
      this.searchIsOpen = true
    },
    closeSearchSuggestions () {
      this.searchIsOpen = false
    },
    openDatePickingModal ({ unit }) {
      this.currentlySelectedUnit = unit
      this.AffiliationDetailsModal = true
      this.$refs.startingDate.focus()
    },
    closeDatePickingModal () {
      this.currentlySelectedUnit = undefined
      this.AffiliationDetailsModal = false
    },
    submitAffilitation () {
      this.searchQuery = undefined
      this.AffiliationDetailsModal = false
    }
  }
}
</script>
