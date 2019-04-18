<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    addTagKeys: {
      type: Array,
      default: () => ['13']
    },
    removeTagKeys: {
      type: Array,
      default: () => ['8']
    },
    tagsLimit: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      newTag: ''
    }
  },
  methods: {
    addTag () {
      const newTagTrimmed = this.newTag.trim()
      if (newTagTrimmed.length === 0) {
        return
      }
      let tokensToAdd = []
      const tokens = this.newTag.split(', ')
      if (!this.allowDuplicates) {
        for (let token of tokens) {
          if (!this.value.includes(token)) {
            tokensToAdd.push(token)
          }
        }
      } else {
        tokensToAdd = tokens
      }
      this.$emit('input', [...this.value, ...tokensToAdd])
      this.newTag = ''
    },
    removeSpecificTag (tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    },
    removeLastTag () {
      if (this.newTag.length === 0) {
        this.$emit('input', this.value.slice(0, -1))
      }
    },
    cropPastedTags () {
      const newTagTrimmed = this.newTag.trim()

      if (newTagTrimmed.length === 0) {
        return
      }
      let tokensToAdd = []
      const tokens = this.newTag.split(', ')
      if (!this.allowDuplicates) {
        for (let token of tokens) {
          if (!this.value.includes(token)) {
            tokensToAdd.push(token)
          }
        }
      } else {
        tokensToAdd = tokens
      }
      this.$emit('input', [...this.value, ...tokensToAdd])
      this.newTag = ''
    },
    arrayMove (arr, oldIndex, newIndex) {
      arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    }
  },
  render () {
    return this.$scopedSlots.default({
      tags: this.value,
      addTag: this.addTag,
      removeSpecificTag: this.removeSpecificTag,
      tagsLimit: this.tagsLimit,
      hoveringItem: undefined,
      draggingItem: undefined,
      inputAttrs: {
        value: this.newTag,
        isFocused: this.isFocused
      },
      tagAttrs: {

      },
      // this drag events don't work on firefox yet -.-
      tagEvents: {
        dragstart: (e) => {
          this.draggingItem = e.target.dataset.tag
        },
        dragend: (e) => {
          this.value = this.arrayMove(this.value, this.value.indexOf(this.draggingItem), this.value.indexOf(this.hoveringItem))
        },
        dragenter: (e) => {
          if (e.target.dataset.tag !== undefined) {
            this.hoveringItem = e.target.dataset.tag
          }
        }
      },
      inputEvents: {
        input: (e) => { this.newTag = e.target.value },
        keydown: (e) => {
          if (this.addTagKeys.includes(e.keyCode.toString())) {
            e.preventDefault()
            this.addTag()
          } else if (this.removeTagKeys.includes(e.keyCode.toString())) {
            this.removeLastTag()
          }
        },
        paste: (e) => {
          this.$nextTick(function () {
            this.cropPastedTags()
          })
        }
      }
    })
  }
}
</script>
