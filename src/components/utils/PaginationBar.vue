<template>
  <nav
    v-if="totalPages > 1"
    class="page-nav"
  >
    <ul
      role="navigation"
      class="page-nav__list"
    >
      <li v-if="currentPage > 1">
        <a
          href=""
          class="page-nav__item page-nav__item--previous"
          aria-label="Previous"
          @click.prevent="changePage(currentPage - 1)"
        >
          <span aria-hidden="true">{{ $t('previous') }}</span>
        </a>
      </li>
      <li v-if="pagesToShow.length > 0 && !pagesToShow.includes(1)">
        <a
          href=""
          class="page-nav__item"
          @click.prevent="changePage(1)"
        >1</a>
      </li>
      <li
        v-if="pagesToShow[0] > 2"
        class="page-nav__ellipsis"
      >
        <span>...</span>
      </li>
      <li
        v-for="page in pagesToShow"
        :key="page"
      >
        <a
          :class="{ 'page-nav__item--current-page': page == currentPage }"
          href=""
          class="page-nav__item"
          @click.prevent="changePage(page)"
        >{{ page }}</a>
      </li>
      <li
        v-if="pagesToShow[pagesToShow.length - 1] < totalPages - 1"
        class="page-nav__ellipsis"
      >
        <span>...</span>
      </li>
      <li v-if="pagesToShow.length > 0 && !pagesToShow.includes(totalPages)">
        <a
          href=""
          class="page-nav__item"
          @click.prevent="changePage(totalPages)"
        >{{ totalPages }}</a>
      </li>
      <li v-if="currentPage < totalPages">
        <a
          href=""
          class="page-nav__item page-nav__item--next"
          aria-label="Next"
          @click.prevent="changePage(currentPage + 1)"
        >
          <span aria-hidden="true">{{ $t('next') }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: false,
      default: 1
    },
    totalItems: {
      type: Number,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    pagesToShow () {
      var from = this.currentPage - this.offset
      if (from < 1) {
        from = 1
      }
      var to = from + (this.offset * 2)
      if (to >= this.totalPages) {
        to = this.totalPages
      }
      var pagesArray = []
      for (let page = from; page <= to; page++) {
        pagesArray.push(page)
      }
      return pagesArray
    }
  },
  methods: {
    changePage (page) {
      this.$emit('paginate', page)
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variables.scss';
.page-nav{
  width: 100%;
  margin-top: 3.5rem;
}
.page-nav__list{
  display: flex;
  justify-content: flex-start;
  margin: 0 -0.25rem;
}
.page-nav__item,
.page-nav__ellipsis{
  display: inline-block;
  outline: none;
  appearance: none;
  line-height: 1.2;
  font-weight: 400;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  font-size: 0.875rem;
}
.page-nav__item{
  border-width: 0.0625rem;
  border-style: solid;
  border-radius: 0.125rem;
  transition: all .3s ease;

  background-color: transparent;
  border-color: $light-gray;
  color: $dark-400;

  &:hover, &:focus{
    background-color: $blue-600;
    border-color: $blue-600;
    color: white;
  }
}
.page-nav__item--previous:before{
  content: '\00ab ';
}
.page-nav__item--next:after{
  content: ' \00bb';
}
.page-nav__item--current-page{
  background-color: $blue;
  border-color: $blue;
  color: white;
}

</style>
