<script>
import { mapActions, mapState } from 'vuex'
import ProfileAPI from '@/api/profile'

export default {
  data () {
    return {
      loading: true,
      providers: [
        {
          id: 'orcid',
          text: 'Orcid'
        }, {
          id: 'scopus',
          text: 'Scopus'
        }, {
          id: 'dblp',
          text: 'DBLP'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      'externalProfiles': state => state.profile.externalProfiles
    })

  },
  async created () {
    try {
      this.loading = true
      await this.fetchExternalProfiles()
    } catch (error) {
      // TODO
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions({
      'fetchExternalProfiles': 'profile/fetchExternalProfiles',
      'syncExternalProfile': 'profile/syncExternalProfile'
    }),
    hasExternalProfile (provider) {
      return this.externalProfiles && this.externalProfiles[provider] && this.externalProfiles[provider].id
    },
    getExternalProfileId (provider) {
      return this.externalProfiles[provider].id
    },
    hasExternalProfileSyncStatus (provider) {
      return this.hasExternalProfile(provider) && this.externalProfiles[provider].lastSync
    },
    getExternalProfileLastSync (provider) {
      return this.externalProfiles[provider].lastSync
    },
    async removeExternalProfile (provider) {
      try {
        this.loading = true
        await ProfileAPI.removeExternalProfile({ provider })
        await this.fetchExternalProfiles()
      } catch (error) {
        // TODO
      } finally {
        this.loading = false
      }
    },
    negotiateOAuthWith (provider) {
      const childWindow = window.open(`/negotiate-oauth/${provider}`, 'Negotiate OAuth', 'height=800,width=600')
      const checkChild = async () => {
        if (childWindow.closed) {
          clearInterval(timer)
          await this.fetchExternalProfiles()
          if (this.externalProfiles[provider].id) {
            this.$emit('received-external-profile', { provider })
          }
        }
      }
      var timer = setInterval(checkChild, 500)
    },
    async checkExternalProfileKeyAndSave (provider, key) {
      try {
        await ProfileAPI.checkExternalProfileKeyAndSave({ provider, key })
        await this.fetchExternalProfiles()
        if (this.externalProfiles[provider].id) {
          this.$emit('received-external-profile', { provider })
        }
      } catch (err) {
        this.$emit('on-external-profile-link-error', { provider, err })
      }
    },
    triggerSyncFor (provider) {
      this.syncExternalProfile({ provider })
      setTimeout(async () => {
        await this.fetchExternalProfiles()
      }, 10000) // Update in 10s, just one time
    }
  },
  render () {
    return this.$scopedSlots.default({
      loading: this.loading,
      providers: this.providers,
      hasExternalProfile: this.hasExternalProfile,
      getExternalProfileId: this.getExternalProfileId,
      hasExternalProfileSyncStatus: this.hasExternalProfileSyncStatus,
      getExternalProfileLastSync: this.getExternalProfileLastSync,
      externalProfiles: this.externalProfiles,
      negotiateOAuthWith: this.negotiateOAuthWith,
      triggerSyncFor: this.triggerSyncFor,
      removeExternalProfile: this.removeExternalProfile,
      fetchExternalProfiles: this.fetchExternalProfiles,
      checkExternalProfileKeyAndSave: this.checkExternalProfileKeyAndSave
    })
  }
}
</script>
