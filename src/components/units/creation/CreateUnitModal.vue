<template>
  <!-- Create Unit Modal -->
  <modal
    :value="value"
    withfooter
    class="modal--lg modal--align-top"
    @input="input"
  >
    <template
      slot="modal-panel"
      class="modal__pannel__content"
    >
      <define-unit-general-info-step
        v-if="stepIs(1)"
        v-model="generalData"
      />
      <define-unit-parent-step
        v-if="stepIs(2)"
        v-model="parentID"
      />
      <define-unit-managers-step
        v-if="stepIs(3)"
        v-model="managers"
      />
    </template>
    <template slot="modal-footer">
      <div class="container">
        <div class="btn--group">
          <button
            v-if="createUnitStep > 1"
            class="btn btn--light"
            @click="createUnitStep = createUnitStep - 1"
          >
            Anterior
          </button>
          <button
            v-if="createUnitStep < 3"
            class="btn btn--primary"
            @click="createUnitStep = createUnitStep + 1"
          >
            Seguinte
          </button>
          <button
            v-if="createUnitStep === 3"
            class="btn btn--primary"
            @click.prevent="submitNewUnit"
          >
            Criar Unidade
          </button>
        </div>
      </div>
    </template>
  </modal>
</template>
<script>
import { mapActions } from 'vuex'
import Modal from '@/components/utils/Modal'
import DefineUnitGeneralInfoStep from '@/components/units/creation/DefineUnitGeneralInfoStep'
import DefineUnitParentStep from '@/components/units/creation/DefineUnitParentStep'
import DefineUnitManagersStep from '@/components/units/creation/DefineUnitManagersStep'
export default {
  components: {
    Modal,
    DefineUnitGeneralInfoStep,
    DefineUnitParentStep,
    DefineUnitManagersStep
  },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      generalData: {
        acronym: undefined,
        name: undefined,
        type: undefined,
        website: undefined,
        email: undefined,
        bio: undefined
      },
      parentID: '',
      modalIsOpen: false,
      managers: [],
      createUnitStep: 1
    }
  },
  watch: {
    createUnitModal: function (val) {
      if (!val) {
        this.createUnitStep = 1
      }
    },
    value: function (val) {
      if (!val) {
        this.generalData = {
          acronym: undefined,
          name: undefined,
          type: undefined,
          website: undefined,
          email: undefined,
          bio: undefined
        }
        this.managers = []
      }
    }
  },
  methods: {
    ...mapActions({
      'create': 'units/create'
    }),
    stepIs (stepNumber) {
      return this.createUnitStep === stepNumber
    },
    async submitNewUnit () {
      await this.create({ payload: { ...this.generalData, parentID: this.parentID, managers: this.managers.map(u => u.username) } })
      this.$emit('close')
    },
    input (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
