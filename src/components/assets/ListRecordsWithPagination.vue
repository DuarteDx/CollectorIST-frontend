<template>
  <div>
    <list-records
      :records="recordsList"
      :editable="editable"
    />
    <pagination-bar
      v-if="records"
      :current-page="page"
      :total-items="records.totalItems"
      :items-per-page="perPage"
      @paginate="changePage"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListRecords from '@/components/records/ListRecords'
import PaginationBar from '@/components/utils/PaginationBar'

export default {
  components: {
    ListRecords,
    PaginationBar
  },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      perPage: 15,
      searchQuery: ''
    }
  },
  computed: {
    ...mapState({
      'records': state => state.researchers.records
    }),
    recordsList () {
      return this.records ? this.records.items : undefined
    }
  }
}
</script>
