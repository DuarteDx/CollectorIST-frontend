<template>
  <div class="container">
    <div class="publication publication-article">
      <div class="publication-header">
        <header-part
          :item="record"
          :custom-subtitle-fields="customSubtitleFields"
        />
      </div>
      <div class="publication-main">
        <div class="publication-main__left">
          <div class="card">
            <component
              :is="componentNameFor(record.template)"
              :item="record"
              @custom-subtitle-fields-ready="assignCustomSubtitleFields"
            />
          </div>
        </div>
        <div class="publication-main__right">
          <files-part
            v-if="record.files"
            :files="record.files"
          />
          <report-part :record-id="record.metadata.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Painting from '@/components/records/views/Painting'
import Sculpture from '@/components/records/views/Sculpture'

export default {
  components: {
    'p-painting': Painting,
    'p-sculpture': Sculpture,
    HeaderPart
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
    ...mapState({
      'record': state => state.records.current
    })
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

<style lang="scss">
  @import '@/assets/scss/_variables.scss';

  .publication {
    padding: 1.5rem 0;
  }

  .publication .card + .card {
    margin-top: 1rem;
  }

  .publication .card-row {
    padding: 1.5rem;
  }

  .publication-main {
    margin-top: 1rem;
  }

  .publication-main__left {
    margin-bottom: 1rem;
  }

  .publication-title {
    margin: 1rem 0 0.5rem;
  }

  .download-item {
    display: flex;
    flex-flow: row nowrap;
    position: relative;
  }

  .download-item + .download-item {
    margin-top: 1rem;
  }

  .download-icon {
    margin-right: 1rem;
  }

  .download-item__text {
      word-break: break-all;
  }

  .download-item__link {

    &:after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .download-item--locked {
    display: block;
    position: relative;
  }

  .download-item--locked__image {
    pointer-events: none;
  }

  .download-item--locked__message {
    position: absolute;
    top: 50%;
    left: 1rem;
    width: 100%;
    transform: translate(0, -50%);
  }

  @media (min-width: 75rem) {
    .publication {
      padding: 3.5rem 0;
    }

    .publication-main {
      display: flex;
      flex-flow: row nowrap;
      justify-content: stretch;
      flex-grow: 1;
      margin-top: 1rem;
    }

    .publication-main__left {
      flex-basis: 47.75rem;
      width: 47.75rem;
      margin: 0 1rem 0 0;
    }
    .publication-main__right {
      flex-basis: 22.5rem;
      min-width: 22.5rem;
      flex-grow: 1;
    }
  }
</style>
