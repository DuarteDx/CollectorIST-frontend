<template>
  <institution-users-helper :record="item">
    <div
      slot-scope="{ authors }"
      class="card"
    >
      <authors-part :authors="item.author" />
      <institution-users-part
        :users="authors"
        :section-title="$t('record.authors.institution')"
      />
      <abstract-part :abstract="item.abstract" />
      <journal-part :journal="item.journal" />
      <volume-part :volume="item.volume" />
      <number-part :number="item.number" />
      <pages-part :pages="item.pages" />
      <doi-part :doi="item.doi" />
      <url-part :url="item.url" />
      <keywords-part :keywords="item.keywords" />
    </div>
  </institution-users-helper>
</template>

<script>
import InstitutionUsersHelper from '@/components/records/views/helpers/InstitutionUsersHelper'
import AuthorsPart from '@/components/records/views/parts/AuthorsPart'
import InstitutionUsersPart from '@/components/records/views/parts/InstitutionUsersPart'
import AbstractPart from '@/components/records/views/parts/AbstractPart'
import JournalPart from '@/components/records/views/parts/JournalPart'
import VolumePart from '@/components/records/views/parts/VolumePart'
import NumberPart from '@/components/records/views/parts/NumberPart'
import PagesPart from '@/components/records/views/parts/PagesPart'
import DoiPart from '@/components/records/views/parts/DoiPart'
import UrlPart from '@/components/records/views/parts/UrlPart'
import KeywordsPart from '@/components/records/views/parts/KeywordsPart'

export default {
  components: {
    InstitutionUsersHelper,
    AuthorsPart,
    InstitutionUsersPart,
    AbstractPart,
    JournalPart,
    VolumePart,
    NumberPart,
    PagesPart,
    DoiPart,
    UrlPart,
    KeywordsPart
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  created () {
    this.$emit('custom-subtitle-fields-ready', ['-journal'])
  }
}
</script>
