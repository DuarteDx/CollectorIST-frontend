<template>
  <div
    class="link-external-repositories-step layout-wizard__inner-container layout-wizard__inner-container--md"
  >
    <header class="layout-wizard__header">
      <svg
        width="90"
        height="86"
        viewBox="0 0 90 86"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          transform="translate(1.33 1.29)"
          stroke-width="2"
          stroke="#0092E0"
          fill="none"
          fill-rule="evenodd"
        >
          <path d="M41.97 82.53a62.44 62.44 0 0 0 15-40.67 62.44 62.44 0 0 0-15-40.67 62.44 62.44 0 0 0-14.99 40.67 62.44 62.44 0 0 0 15 40.67z" /><path d="M10.71 13.98a62.8 62.8 0 0 0 31.57 8.45c11.34 0 22-3 31.19-8.24M83.2 41.86H.74M53.5 62.29a63.5 63.5 0 0 0-11.22-1 62.8 62.8 0 0 0-31.68 8.52" /><path d="M83.54 47.69A41.92 41.92 0 0 0 41.97 0 41.92 41.92 0 0 0 0 41.86a41.92 41.92 0 0 0 41.97 41.86c4 0 7.88-.56 11.55-1.6M86.94 82.11c0-5-5.77-11.7-12.88-11.7-7.11 0-12.88 6.7-12.88 11.7h25.76z" /><ellipse
            cx="74.06"
            cy="57.23"
            rx="7.16"
            ry="7.32"
          />
        </g>
      </svg>
      <h1>{{ $t('external.repositories') }}</h1>
      <p>{{ $t('external.repositories.description') }}</p>
    </header>
    <renderless-external-repositories-management
      @received-external-profile="receivedExternalProfile"
      @on-external-profile-link-error="showError"
    >
      <div
        slot-scope="{
          loading,
          providers,
          hasExternalProfile,
          getExternalProfileId,
          hasExternalProfileSyncStatus,
          getExternalProfileLastSync,
          externalProfiles,
          removeExternalProfile,
          checkExternalProfileKeyAndSave,
          negotiateOAuthWith }"
        class="card"
      >
        <section
          v-for="provider in providers"
          :key="provider.id"
          class="card-row"
        >
          <div class="card-row__text">
            <h1 class="card-row__title h5--ssp">
              {{ provider.text.toUpperCase() }}
            </h1>
            <template v-if="hasExternalProfile(provider.id)">
              <p>{{ getExternalProfileId(provider.id) }}</p>
            </template>
          </div>
          <div v-if="externalProfiles">
            <button
              v-if="!hasExternalProfile(provider.id) || !getExternalProfileId(provider.id)"
              class="btn btn--md btn--primary"
              @click.prevent="openModal(provider.id)"
            >
              {{ $t('link.account') }}
            </button>
            <dropdown v-else>
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
                    @click.prevent="removeExternalProfile(provider.id)"
                  >
                    {{ $t('remove.association') }}
                  </a>
                </li>
              </ul>
            </dropdown>
          </div>
        </section>
        <modal
          v-model="modals.orcid"
          class="modal--lg"
        >
          <div
            slot="modal-panel"
            class="sync-repo-modal"
          >
            <h1>{{ $t('link.orcid') }}</h1>
            <p>{{ $t('link.orcid.modal.description') }}</p>
            <div class="data-details">
              <h2 class="data-details__title h5--ssp">
                {{ $t('imported.information') }}:
              </h2>
              <ul class="data-details__list l-list l-list--bulleted">
                <li class="l-list__item">
                  {{ $t('all.public.publications') }}
                </li>
                <li class="l-list__item">
                  {{ $t('all.public.fundings') }}
                </li>
              </ul>
            </div>
            <button
              class="btn btn--primary"
              @click="negotiateOAuthWith('orcid')"
            >
              {{ $t('sync.with.orcid') }}
            </button>
          <!-- <transition name="validation-fade">
            <p>
              <small>Não detectámos nenhuma conta. Por favor tente sincronizar-se de novo.</small>
            </p>
          </transition> -->
          </div>
        </modal>
        <modal
          v-model="modals.dblp"
          class="modal--lg"
        >
          <div
            slot="modal-panel"
            class="sync-repo-modal"
          >
            <h1>DBLP</h1>
            <p>{{ $t('link.dblp.modal.description') }}</p>
            <div class="data-details">
              <h2 class="data-details__title h5--ssp">
                {{ $t('imported.information') }}:
              </h2>
              <ul class="data-details__list l-list l-list--bulleted">
                <li class="l-list__item">
                  {{ $t('all.public.publications') }}
                </li>
              </ul>
              <img
                src="/static/dblp-key-tutorial.gif"
                alt="DBLP Key Copy Tutorial"
              >
              <div
                class="f-field f-field--underline"
              >
                <input
                  id="dblpKey"
                  v-model="dblpKey"
                  :class="{'f-field__input--is-filled': dblpKey}"
                  name="dblpKey"
                  type="text"
                  class="f-field__input"
                  required=""
                  autocomplete="dblpKey"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                >
                <label
                  for="name"
                  class="f-field__label"
                >{{ $t('dblp.key') }}</label>
                <transition name="validation-fade">
                  <!-- f-field--danger -->
                  <p
                    v-if="errors.dblp"
                    class="f-field__validation"
                  >
                    {{ errors.dblp }}
                  </p>
                  <!-- f-field--danger -->
                  <p
                    v-if="false"
                    class="f-field__validation"
                  >
                    DBLP Key Required.
                  </p>
                </transition>
              </div>
              <button
                class="btn btn--primary"
                @click="checkExternalProfileKeyAndSave('dblp', dblpKey)"
              >
                {{ $t('sync.with.dblp') }}
              </button>
              <!-- <transition name="validation-fade">
            <p>
              <small>Não detectámos nenhuma conta. Por favor tente sincronizar-se de novo.</small>
            </p>
          </transition> -->
            </div>
          </div>
        </modal>
      </div>
    </renderless-external-repositories-management>
  </div>
</template>

<script>
import Dropdown from '@/components/utils/Dropdown'
import Modal from '@/components/utils/Modal'
import RenderlessExternalRepositoriesManagement from '@/components/profile/RenderlessExternalRepositoriesManagement'

export default {
  components: {
    Dropdown,
    Modal,
    RenderlessExternalRepositoriesManagement
  },
  data () {
    return {
      modals: {
        orcid: false,
        dblp: false
      },
      dblpKey: '',
      errors: {
        dblp: undefined
      }
    }
  },
  methods: {
    openModal (ref) {
      this.modals[ref] = true
    },
    receivedExternalProfile ({ provider }) {
      this.modals[provider] = false
    },
    showError ({ provider, err }) {
      this.errors[provider] = err.response.data.key
    }
  }
}
</script>

<style lang="scss">
  .sync-repo-modal{
    .data-details{
      margin: 2rem 0;
    }
  }
</style>
