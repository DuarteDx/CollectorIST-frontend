<template>
  <div class="define-unit-general-info-step">
    <header class="layout-wizard__header">
      <svg
        width="86"
        height="51"
        viewBox="0 0 86 51"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke="#0092E0"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M1 50h84"
            stroke-linecap="round"
          />
          <path d="M67 20h14v30H67zM5 20h14v30H5zM3 16h18v4H3zM65 16h18v4H65zM19 12h48v4H19z" />
          <path
            stroke-linecap="round"
            d="M39 1h10l-2.5 3L49 7H39z"
          />
          <path d="M39 13V0M41 23h4v11h-4zM33 23h4v11h-4zM25 23h4v11h-4zM49 23h4v11h-4zM57 23h4v11h-4zM72 25h4v11h-4zM72 41h4v9h-4zM10 25h4v11h-4zM10 41h4v9h-4zM41 39h4v11h-4zM33 39h4v11h-4zM25 39h4v11h-4zM49 39h4v11h-4zM57 39h4v11h-4z" />
        </g>
      </svg>
      <h1>Criar Unidade</h1>
      <p>Para criar unidade terá de preencher algumas informações.</p>
    </header>
    <section>
      <!-- Nome -->
      <div class="f-group">
        <div class="f-field f-field--allways-open">
          <input
            id="name"
            v-model="value.name"
            name="name"
            type="text"
            class="f-field__input"
            required=""
            autofocus
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Unit Name"
          >
          <label
            for="name"
            class="f-field__label"
          >Nome</label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Já existe uma unidade com este nome.
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            />
          </transition>
        </div>

        <!-- Acronym -->
        <div class="f-field f-field--allways-open">
          <input
            id="name"
            v-model="value.acronym"
            name="name"
            type="text"
            class="f-field__input"
            required=""
            autofocus
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Unit Name"
          >
          <label
            for="name"
            class="f-field__label"
          >Acronym (ADICIONADO DEPOIS)</label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Já existe uma unidade com este acronym.
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            />
          </transition>
        </div>
        <!-- type -->
        <div
          v-if="unitTypes"
          class="f-field f-field--allways-open"
        >
          <select
            id="unitTypes"
            v-model="value.type"
            class="f-field__input f-field__input--select"
            name="unitType"
          >
            <option
              v-for="unitType in unitTypes"
              :key="'type'+unitType"
              :value="unitType"
            >
              {{ $t('unitTypes.'+unitType) }}
            </option>
          </select>
          <label
            class="f-field__label f-field__label--select"
            for="unitTypes"
          >{{ $t('unit.type') }}</label>
        </div>
        <!-- Email -->
        <div
          class="f-field f-field--allways-open"
        >
          <input
            id="name"
            v-model="value.email"
            name="email"
            type="email"
            class="f-field__input"
            required=""
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Unit Email"
          >
          <label
            for="name"
            class="f-field__label"
          >Email</label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              [...]
            </p>
            <!-- f-field--danger -->
          </transition>
        </div>
        <!-- Website -->
        <div
          class="f-field f-field--allways-open"
        >
          <input
            id="website"
            v-model="value.website"
            name="website"
            type="url"
            class="f-field__input"
            autocomplete="url"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="https://"
          >
          <label
            for="website"
            class="f-field__label"
          >Website</label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              The email provided is invalid.
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Email required.
            </p>
          </transition>
        </div>
        <!-- Pequena Descrição -->
        <div
          class="f-field f-field--allways-open"
        >
          <textarea
            id="shortdescription"
            v-model="value.bio"
            name="shortdescription"
            class="f-field__textarea"
            rows="5"
            autocomplete=""
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Short bio..."
          />
          <label
            for="shortdescription"
            class="f-field__label"
          >Short <span arial-label="Biography">Bio</span></label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              [...]
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              [...]
            </p>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: undefined
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      'unitTypes': state => state.units.listTypes
    })
  },
  async created () {
    await this.fetchTypes()
    this.$set(this.value, 'type', this.unitTypes[0])
  },
  methods: {
    ...mapActions({
      'fetchTypes': 'units/fetchTypes'
    })
  }
}
</script>
