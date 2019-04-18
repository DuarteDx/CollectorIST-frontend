<template>
  <div>
    <div
      v-if="isInitialLoading"
      class="initial-load-animation"
    >
      <!-- <img
        src="https://us.123rf.com/450wm/annaleni/annaleni1507/annaleni150700209/42852634-flat-education-graduate-hat-circle-icon-with-long-shadow-school-and-university-graduation-vector-ill.jpg?ver=6"
        alt=""> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="225"
        height="225"
      >
        <defs>
          <circle
            id="a"
            cx="113"
            cy="113"
            r="103"
          />
        </defs>
        <g
          fill="none"
          fill-rule="evenodd"
        >
          <mask
            id="b"
            fill="#fff"
          >
            <use xlink:href="#a" />
          </mask>
          <use
            fill="#0076DC"
            xlink:href="#a"
          />
          <g
            fill="#04080D"
            mask="url(#b)"
            opacity=".16"
          >
            <path d="M214.504672 130.5857928c-7.085416 41.1874254-38.629414 74.0109132-79.141212 82.9796822L66 142h18.5230769L38 94h147l29.504672 36.5857928z" />
          </g>
          <g mask="url(#b)">
            <path
              fill="#004B9E"
              d="M66 84h89v58c-11.845703 7.7480469-26.6790365 11.6220703-44.5 11.6220703S77.8457031 149.7480469 66 142V84z"
            />
            <path
              fill="#00428E"
              d="M111 69l74 24.5-74 28.5-74-28.5L111 69z"
            />
            <path
              fill="#008DE0"
              d="M111 69v49L37 93.5z"
            />
            <path
              fill="#0056B6"
              d="M111 69v49l74-24.5z"
            />
            <path
              fill="#DDE4E9"
              d="M148.492476 153.4612221h-.173862V99.89727L111 89.8977775V87l39.807268 10.4612221h.511346v.1343802l.060802.0159785-.060802.2269153v55.622726h-.21109L158.3 167h-17l7.192476-13.5387779z"
            />
          </g>
        </g>
      </svg>

      <div class="loading-bar">
        <div class="blue-bar" />
      </div>
    </div>
    <router-view
      v-else-if="!errorGlobalState"
      id="app"
    />
    <PageNotFoundPage v-else />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/_resets.scss";
@import "@/assets/scss/_fonts.scss";
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_typography.scss";
@import "@/assets/scss/_lists.scss";
@import "@/assets/scss/_cards.scss";
@import "@/assets/scss/_buttons.scss";
@import "@/assets/scss/_labels.scss";
@import "@/assets/scss/_utilities.scss";
@import "@/assets/scss/_helpers.scss";
@import "@/assets/scss/_loading.scss";
@import "@/assets/scss/_icons.scss";
@import "@/assets/scss/_avatars.scss";
@import "@/assets/scss/_empty-states.scss";
//global component styles
@import "@/assets/scss/_tabs.scss";
@import "@/assets/scss/_forms.scss";
//global layout styles
@import "@/assets/scss/_grid.scss";
@import "@/assets/scss/layouts/_layout-sidebar.scss";
@import "@/assets/scss/layouts/_layout-search-results.scss";
@import "@/assets/scss/layouts/_layout-wizard.scss";
</style>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import PageNotFoundPage from '@/pages/PageNotFoundPage'

export default {
  components: {
    PageNotFoundPage
  },
  data () {
    return {
      errorGlobalState: false
    }
  },
  computed: {
    ...mapState([
      'isInitialLoading'
    ]),
    ...mapGetters([
      'isLoading'
    ])
  },
  created () {
    if (process.env.MOCK) {
      this.$auth.isLogged = () => {
        return true
      }
    }
  },
  async mounted () {
    if (process.env.MOCK) {
      await this.fetchProfile()
    }
    await this.finishInitialLoading()
  },
  methods: {
    ...mapActions([
      'finishInitialLoading'
    ]),
    ...mapActions({
      'fetchProfile': 'profile/fetch'
    })
  }
}
</script>

<style lang="scss">
.scroll-lock {
  overflow: hidden;
}
div.initial-load-animation {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: -7.5rem;
    width: 15rem;
    height: 15rem;
  }
}
</style>
