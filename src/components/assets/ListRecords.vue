<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <section
      v-if="recordsPage"
      ref="recordslist"
      key="listrecords"
      class="list-records"
    >
      <template v-if="recordsPage.items.length >= 1">
        <div class="card">
          <record
            v-for="record in recordsPage.items"
            :key="record.id"
            :editable="editable"
            :record="record"
          />
        </div>
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
              <path
                fill="#EEF2F5"
                d="M-885-522H555V760H-885z"
              />
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
          {{ $t('empty.state.no.publications') }}
        </h1>
        <p class="empty-state__description">
          {{ $t('empty.state.no.publications.description') }}
        </p>
      </div>
      <pagination-bar
        :current-page="pagination.page"
        :total-items="recordsPage.totalItems"
        :items-per-page="pagination.perPage"
        @paginate="changePage"
      />
    </section>
    <section v-else>
      <div class="card">
        <article
          v-for="x in 4"
          :key="x"
          class="list-records__item card-row"
        >
          <div class="card-row__text">
            <p class="small list-records__item-type loading-text">
              Publication
            </p>
            <h1 class="h4 list-records__item-title">
              <span
                class="list-records__item-title__link loading-text"
              >
                Loading the publication title
              </span>
            </h1>
            <div class="list-records__item-publishing-data">
              <p class="list-records__item-academic-journal loading-text">
                Loading template jornal
              </p>
              <p>
                <span class="list-records__item-publication-date loading-text">year</span>
                <span class="list-records__item-authors">
                  <template>
                    <span class="list-records__item-author loading-text">
                      Author's Name
                      ,</span>
                    <span class="loading-text">
                      et al.
                    </span>
                  </template>
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import Record from '@/components/records/Record'
import PaginationBar from '@/components/utils/PaginationBar'
export default {
  components: {
    Record,
    PaginationBar
  },
  props: {
    pagination: {
      type: Object,
      required: true
    },
    editable: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState({
      'recordsPage': state => state.records.list
    })
  },
  methods: {
    changePage (page) {
      this.$router.replace({
        query: { ...page !== 1 && { page } }
      })
      this.pagination.page = page
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.list-records{
}
.list-records__item{
  // padding: .5rem 0;
  // border-bottom: 0.0625rem solid $light-gray;
}
.list-records__item-type{
  text-transform: capitalize;
}
.list-records__item-title{
  margin-top: .5rem;
  margin-bottom: 0;
  position: relative;
}
.list-records__item-title__link{
  cursor: pointer;
  color: $dark;
  &:before{
    content: '';
    position: absolute;
    cursor: pointer;
    padding-top: 2rem;
    top: -2rem;
    bottom: 0;
    left: 0;
    right: 0;
    //background-color: rgba($blue, .4);
  }
}
.list-records__item-academic-journal{
  color: $gray;
  line-height: 1.2;
}
.list-records__item-author{
    color: $slate;
}
.list-records__item-publishing-data{
  p{
    margin: .25rem 0;
  }
}
.list-records__actions-list{
  display: flex;
  flex-flow: row nowrap;
}
.list-records__actions-list__item{
  margin-right: 1rem;
  &:last-child{
    margin-right: 0;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
