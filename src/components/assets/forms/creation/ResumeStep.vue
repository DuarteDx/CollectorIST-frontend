<template>
  <div class="container">
    <header class="creation-form__header">
      <h1>Pré-visualização</h1>
      <p>Confirma que os dados cedidos para criação de uma nova publicação estão corretos?</p>
    </header>
    Resume of record!
    {{ newRecord }}
    <component
      :is="componentNameFor(newRecord.type)"
      :item="newRecord"
      @custom-subtitle-fields-ready="assignCustomSubtitleFields"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Painting from '@/components/assets/views/Painting'
import Sculpture from '@/components/assets/views/Sculpture'

export default {
  components: {
    'p-painting': Painting,
    'p-sculpture': Sculpture,
    HeaderPart,
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      customSubtitleFields: []
    }
  },
  computed: {
    ...mapGetters('record-creation', [
      'newRecord'
    ])
  },
  methods: {
    componentNameFor (template) {
      return 'p-' + template
    },
    assignCustomSubtitleFields (value) {
      this.customSubtitleFields = value
    }
  }
}

</script>
