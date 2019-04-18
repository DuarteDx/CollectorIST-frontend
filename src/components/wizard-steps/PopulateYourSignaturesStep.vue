<template>
  <div class="associate-your-researcher-units-step layout-wizard__inner-container layout-wizard__inner-container--lg">
    <header class="layout-wizard__header">
      <svg
        width="71"
        height="86"
        viewBox="0 0 71 86"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke-width="2"
          stroke="#0092E0"
          fill="none"
          fill-rule="evenodd"
        >
          <path d="M4.13 1.26H66.3a2.96 2.96 0 0 1 2.96 2.96v76.96a2.96 2.96 0 0 1-2.96 2.96H4.13a2.96 2.96 0 0 1-2.96-2.96V4.22a2.96 2.96 0 0 1 2.96-2.96zM13.01 50.1h44.4M13.01 42.7h44.4M13.01 35.3h44.4M13.01 27.9h44.4M13.01 20.5h22.2" /><path
            d="M15.23 72.3c5.43-6.42 8.39-9.62 8.88-9.62.74 0 1.48 1.48.74 3.7s-1.48 3.7 0 3.7 3.7-1.85 4.44-2.22c.74-.37 1.48.74.74 1.48s-.74.74 0 .74 2.96-2.22 4.44-2.96c1.48-.74 2.22 0 2.96.74.74.74 2.22 1.48 4.44 1.48 1.48 0 3.21-.25 5.18-.74"
            stroke-linecap="round"
          />
        </g>
      </svg>
      <h1>{{ $t('aliases') }}</h1>
      <p>{{ $t('wizard.aliases.description') }}</p>
    </header>
    <div class="card">
      <section
        v-for="signature in importedSignatures"
        :key="signature.value"
        class="card-row"
      >
        <div class="card-row__text">
          <h1 class="card-row__title h5--ssp">
            {{ signature.value }}
          </h1>
        </div>
        <p><small>Imported from  {{ signature.origin }}</small></p>
      </section>
      <section
        v-for="signature in signatures"
        :key="signature.value"
        class="card-row"
      >
        <div class="card-row__text">
          <h1 class="card-row__title h5--ssp">
            {{ signature.value }}
          </h1>
        </div>
        <dropdown>
          <i
            slot="dropdown-trigger"
            class="i-ellipsis"
            aria-label="More options"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <ul
            slot="dropdown-panel"
            class="dropdown-menu"
          >
            <li class="dropdown-menu__item">
              <a
                href
                class="dropdown-menu__link"
                @click.prevent="removeSignature(signature)"
              >
                Remover
              </a>
            </li>
          </ul>
        </dropdown>
      </section>
      <section
        class="card-row new-signature"
      >
        <label
          class="new-signature__label"
          for="newSignature"
          title="New Signature"
        >
          +
        </label>
        <form
          class="new-signature__input"
          @submit.prevent="addSignature"
        >
          <div class="f-field f-field--borderless">
            <input
              id="newSignature"
              v-model="newSignature"
              :placeholder="$t('add...')"
              class="f-field__input"
              name="name"
              autocomplete="name"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              type="text"
            >
          </div>
          <div>
            <input
              :value="$t('add.alias')"
              type="submit"
              class="btn btn--primary"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
            >
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/utils/Dropdown'

export default {
  components: {
    Dropdown
  },
  data () {
    return {
      signatures: [],
      newSignature: ''
    }
  },
  computed: {
    ...mapGetters({
      'importedSignatures': 'profile/importedSignatures',
      'manualSignatures': 'profile/manualSignatures'
    })
  },
  beforeDestroy () {
    this.updateAliases({ aliases: this.signatures })
  },
  async created () {
    await this.fetchAliases()
    this.signatures = this.manualSignatures
  },
  methods: {
    ...mapActions({
      'updateAliases': 'setupAccount/updateAliases',
      'fetchAliases': 'profile/fetchAliases'
    }),
    removeSignature (signature) {
      this.signatures.splice(this.signatures.indexOf(signature), 1)
    },
    addSignature () {
      if (this.newSignature.trim().length !== 0) {
        const anyDuplicate = this.signatures.concat(this.importedSignatures).filter((signature) => {
          return signature.value.replace(/\s/g, '').toLowerCase() === this.newSignature.replace(/\s/g, '').toLowerCase()
        }).length > 0
        if (!anyDuplicate) {
          this.signatures.push({ value: this.newSignature.trim(), origin: 'manual' })
        }
        this.newSignature = ''
      }
    }
  }
}
</script>
<style lang="scss">
.new-signature{
  .new-signature__label{
    flex-grow: 0;
    width: 1rem;
    font-size: 1.4rem;
  }
  .new-signature__input{
    //width: 100%;
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
  }
}
</style>
