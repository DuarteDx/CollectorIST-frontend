export default {
  data () {
    return {
      advancedOptionsIsVisible: false
    }
  },
  methods: {
    toggleAdvancedOptions () {
      let advancedOptionsSection = this.$refs.advancedOptionsSection
      let advancedOptionsTabNavigation = this.$refs.advancedOptionsTabNavigation
      advancedOptionsTabNavigation.classList.toggle('tab-navigation--is-visible')
      if (advancedOptionsTabNavigation.style.marginBottom) {
        advancedOptionsTabNavigation.style.marginBottom = null
        advancedOptionsSection.style.maxHeight = null
      } else {
        // manualy added tab-navigation original margin-bottom: 2rem (24px)
        advancedOptionsTabNavigation.style.marginBottom = (advancedOptionsSection.scrollHeight + 24) + 'px'
        advancedOptionsSection.style.maxHeight = advancedOptionsSection.scrollHeight + 'px'
      }
    }
  }
}
