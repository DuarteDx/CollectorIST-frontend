<template>
  <main class="creation-form">
    <component
      :is="steps[stepNumber]"
      ref="step"
    />
    <footer class="creation-form__footer">
      <!-- stepNumber: {{ stepNumber }} <br >
      steps: {{ steps }} <br >
      newRecord: {{ newRecord }} <br >
      validation: {{ validation }} <br >
      iteration: {{ iteration }} <br > -->
      <div class="container">
        <div class="btn--group step-navigation">
          <button
            v-show="stepNumber > 0"
            class="btn btn--light"
            @click="goToPreviousStep()"
          >
            {{ $t('previous') }}
          </button>
          <button
            v-show="stepNumber < steps.length - 1"
            :class="{'btn--disabled':!nextValid}"
            class="btn btn--primary"
            @click="goToNextStep()"
          >
            {{ $t('next') }}
          </button>
          <button v-if="canCreateRecord">
            CREATE RECORD
          </button>
        </div>
      </div>
    </footer>
  </main>
</template>

<script>
// import parsers from '@/utils/parsers/index'
import UploadRecordFileStep from '@/components/records/forms/creation/UploadRecordFileStep'
import SelectRecordTypeStep from '@/components/records/forms/creation/SelectRecordTypeStep'
import TitleRecordStep from '@/components/records/forms/creation/TitleRecordStep'
import MatchRecordStep from '@/components/records/forms/creation/MatchRecordStep'
import FillAuthorsRecordStep from '@/components/records/forms/creation/FillAuthorsRecordStep'
import SelectAuthorsFromInstitutionStep from '@/components/records/forms/creation/SelectAuthorsFromInstitutionStep'
import ResumeStep from '@/components/records/forms/creation/ResumeStep'

import ArticleFormStep from '@/components/records/forms/creation/types/ArticleFormStep'
import BookFormStep from '@/components/records/forms/creation/types/BookFormStep'
import BookletFormStep from '@/components/records/forms/creation/types/BookletFormStep'
import InbookFormStep from '@/components/records/forms/creation/types/InbookFormStep'
import IncollectionFormStep from '@/components/records/forms/creation/types/IncollectionFormStep'
import InproceedingsFormStep from '@/components/records/forms/creation/types/InproceedingsFormStep'
import ManualFormStep from '@/components/records/forms/creation/types/ManualFormStep'
import MastersthesisFormStep from '@/components/records/forms/creation/types/MastersthesisFormStep'
import MiscFormStep from '@/components/records/forms/creation/types/MiscFormStep'
import PatentFormStep from '@/components/records/forms/creation/types/PatentFormStep'
import PhdthesisFormStep from '@/components/records/forms/creation/types/PhdthesisFormStep'
import PrizeFormStep from '@/components/records/forms/creation/types/PrizeFormStep'
import ProceedingsFormStep from '@/components/records/forms/creation/types/ProceedingsFormStep'
import TechReportFormStep from '@/components/records/forms/creation/types/TechReportFormStep'
import UnpublishedFormStep from '@/components/records/forms/creation/types/UnpublishedFormStep'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    SelectRecordTypeStep,
    UploadRecordFileStep,
    TitleRecordStep,
    FillAuthorsRecordStep,
    SelectAuthorsFromInstitutionStep,
    MatchRecordStep,
    ResumeStep,
    ArticleFormStep,
    BookFormStep,
    BookletFormStep,
    InbookFormStep,
    IncollectionFormStep,
    InproceedingsFormStep,
    ManualFormStep,
    MastersthesisFormStep,
    MiscFormStep,
    PatentFormStep,
    PhdthesisFormStep,
    PrizeFormStep,
    ProceedingsFormStep,
    TechReportFormStep,
    UnpublishedFormStep
  },
  data () {
    return {
      nextValid: false,
      processRecordType: 'null'
    }
  },
  computed: {
    ...mapGetters('record-creation', [
      'stepNumber',
      'steps',
      'newRecord',
      'validation',
      'iteration'
    ]),
    canCreateRecord () {
      // if (this.newRecord.type) {
      //   return parsers[this.newRecord.type].validate(this.newRecord)
      // } else {
      return false
      // }
    },
    cleanedRecord () {
      // if (this.newRecord.type) {
      //   return parsers[this.newRecord.type].clean(this.newRecord)
      // } else {
      return false
      // }
    }
  },
  watch: {
    iteration (value) {
      this.processRecordType = 'iteration'
      this.processRecord()
    }
  },
  destroyed () {
    this.updateStepNumber({ stepNumber: 0 })
  },
  methods: {
    ...mapActions('record-creation', [
      'updateStepNumber',
      'updateSteps',
      'updateNewRecord',
      'updateValidation'
    ]),
    goToNextStep () {
      this.updateStepNumber({ stepNumber: this.stepNumber + 1 })
      this.processRecordType = 'next'
      this.processRecord()
    },
    goToPreviousStep () {
      this.updateStepNumber({ stepNumber: this.stepNumber - 1 })
      this.processRecordType = 'previous'
      this.processRecord()
    },
    setStep (stepComponentName) {
      this.updateStepNumber({ stepNumber: this.steps.indexOf(stepComponentName) })
    },
    processRecord () {
      switch (this.newRecord.type) {
        case 'article': this.processArticle()
          break
        case 'manual': this.processManual()
          break
        case 'tech-report': this.processTechReport()
          break
        case 'book': this.processBook()
          break
        case 'inbook': this.processInbook()
          break
        case 'incollection': this.processIncollection()
          break
        case 'patent': this.processPatent()
          break
        case 'mastersthesis': this.processMastersthesis()
          break
        case 'phdthesis': this.processPhdthesis()
          break
        case 'booklet': this.processBooklet()
          break
        case 'inproceedings': this.processInproceedings()
          break
        case 'prize': this.processPrize()
          break
        case 'unpublished': this.processUnpublished()
          break
        case 'proceedings': this.processProceedings()
          break
        case 'misc': this.processMisc()
          break
        default: throw new Error('Type doesn\'t exists!')
      }
      this.processGeneral()
    },
    processGeneral () {
      if (this.validation.match && this.validation.match.validated) {
        this.steps.pop()
        // check and process match
        if (this.validation.match.isSameRecord) {
          alert('Jump to Record!!!???')
        } else {
          this.updateStepNumber({ stepNumber: this.validation.match.stepNumber })
        }
        const validation = { ...this.validation }
        delete validation.match
        this.updateValidation({ validation })
      } else if (this.newRecord.title === 'match' && this.processRecordType === 'next') { // some match condition
        this.steps.push('MatchRecordStep')
        this.updateValidation({ validation: {
          match: {
            stepNumber: this.stepNumber,
            validated: false
          }
        } })
        this.setStep('MatchRecordStep')
      }

      if (this.steps[this.stepNumber] === 'SelectRecordTypeStep') {
        this.nextValid = true
      }
      if (this.steps[this.stepNumber] === 'UploadRecordFileStep') {
        this.nextValid = true
      }
      if (this.steps[this.stepNumber] === 'TitleRecordStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processArticle () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'ArticleFormStep',
        'FillAuthorsRecordStep',
        'SelectAuthorsFromInstitutionStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'ArticleFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processManual () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'ManualFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'ManualFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processTechReport () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'TechReportFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'TechReportFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processBook () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'BookFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'BookFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processInbook () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'InbookFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'InbookFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processIncollection () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'IncollectionFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'IncollectionFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processPatent () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'PatentFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'PatentFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processMastersthesis () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'MastersthesisFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'MastersthesisFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processPhdthesis () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'PhdthesisFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'PhdthesisFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processBooklet () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'BookletFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'BookletFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processInproceedings () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'InproceedingsFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'InproceedingsFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processPrize () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'PrizeFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'PrizeFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processUnpublished () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'UnpublishedFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'UnpublishedFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processProceedings () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'ProceedingsFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'ProceedingsFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    },
    processMisc () {
      this.updateSteps({ steps: [
        'SelectRecordTypeStep',
        'UploadRecordFileStep',
        'TitleRecordStep',
        'MiscFormStep',
        'FillAuthorsRecordStep',
        'ResumeStep'
      ] })
      if (this.steps[this.stepNumber] === 'MiscFormStep') {
        if (this.validation.step) {
          this.nextValid = true
        } else {
          this.nextValid = false
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";
.creation-form{
  padding: 4rem 0 8rem;
}
.creation-form__header{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  text-align: center;
  padding: 1rem .5rem;
  margin-bottom: 2rem;
}
.form-creation__main{
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
}
.creation-form__footer{
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem 0;
  background-color: white;
  border-top: 1px solid $light-blue;
}
</style>
