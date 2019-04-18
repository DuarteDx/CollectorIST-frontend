<script>
import { mapActions, mapState } from 'vuex'
import ProfileAPI from '@/api/profile'
import ResearcherAPI from '@/api/researchers'

export default {
  data () {
    return {
      affiliationsPage: {},
      loading: false
    }
  },
  computed: {
    ...mapState({
      'profile': state => state.profile.current,
      'unitsPage': state => state.units.list
    })

  },
  async created () {
    await this.getAffiliations()
  },
  methods: {
    ...mapActions({
      'fetchProfile': 'profile/fetch',
      'fetchUnits': 'units/fetchMany'
    }),
    async getAffiliations () {
      try {
        this.loading = true
        const { affiliationsPage } = await ResearcherAPI.getAffiliations({ userId: this.profile.id, page: 1, perPage: 20 })
        this.affiliationsPage = affiliationsPage
      } catch (error) {
        // TODO
        console.log(error)
      } finally {
        this.loading = false
        await this.fetchUnits({ clean: true }) // Hack to clean this.unitsPage
      }
    },
    async searchUnits ({ query, limit }) {
      const affiliationsIds = this.affiliationsPage && this.affiliationsPage.items ? this.affiliationsPage.items.map(u => u.unit.id) : []
      await this.fetchUnits({ q: query, perPage: limit, page: 1, ignored: affiliationsIds })
    },
    async addAffiliation ({ unitID, start, end, currentlyAffiliated }) {
      if (currentlyAffiliated) {
        await ProfileAPI.addAffiliation({ unitID, start })
      } else {
        await ProfileAPI.addAffiliation({ unitID, start, end })
      }
      await this.getAffiliations()
    },
    async removeAffiliation ({ id }) {
      await ProfileAPI.removeAffiliation({ id })
      await this.getAffiliations()
    }
  },
  render () {
    return this.$scopedSlots.default({
      loading: this.loading,
      affiliationsPage: this.affiliationsPage,
      searchUnits: this.searchUnits,
      addAffiliation: this.addAffiliation,
      removeAffiliation: this.removeAffiliation,
      unitsPage: this.unitsPage
    })
  }
}
</script>
