<template>
  <div>
    <header class="creation-form__header">
      <h1>Autores</h1>
      <p>Quem tem a autoria da sua publicação?</p>
      <p>Adicione os autores da publicação pela ordem correcta, separada por vírgulas.</p>
    </header>
    <div class="creation-form__main container">
      <authors-tags-input
        v-model="authors"
      />
    </div>
  </div>
</template>
<script>
import AuthorsTagsInput from '@/components/utils/AuthorsTagsInput'
export default {
  components: {
    AuthorsTagsInput
  },
  data () {
    return {
      authors: []
    }
  }
}
</script>
