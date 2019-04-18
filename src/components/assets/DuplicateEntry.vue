<template>
  <article
    class="card"
  >
    <div class="card-row card-row--sm">
      <div class="card-row__text">
        <p>{{ $t('num.of.duplicates', {count: duplicate.count }) }}</p>
      </div>
      <div class="card-row__meta card-row__meta--align-start">
        <button class="btn btn--sm">
          Rever
        </button>
      </div>
    </div>
    <record :record="duplicate.record" />
  </article>
</template>

<script>
import Record from '@/components/records/Record'

export default {
  components: {
    Record
  },
  props: {
    duplicate: {
      type: Object,
      required: true
    }
  }
}
</script>
