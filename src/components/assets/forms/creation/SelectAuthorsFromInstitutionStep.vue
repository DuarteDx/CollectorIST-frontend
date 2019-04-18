<template>
  <div>
    <header class="creation-form__header">
      <h1>Autores</h1>
      <p>Quem tem a autoria da sua publicação?</p>
      <p>Adicione os autores da publicação pela ordem correcta, separada por vírgulas.</p>
    </header>
    <div class="creation-form__main container">
      <h1 class="h4">
        Autor(es)
      </h1>
      <ul
        class="f-toggleable-tag-field"
      >
        <!-- the data-tag should be moved to the renderless component -->
        <li
          v-for="(author, index) in authors"
          :key="author.name"
          class="f-toggleable-tag-field__tag"
        >
          <input
            :id="'author'+index"
            v-model="author.inInstitution"
            :value="author.inInstitution"
            type="checkbox"
            class="sr-only f-toggleable-tag-field__checkbox"
          >
          <label
            :for="'author'+index"
            class="f-toggleable-tag-field__label"
          >
            {{ author.name }}
          </label>
        </li>
      </ul>
      <h1 class="h4">
        Editor(es)
      </h1>
      <ul
        class="f-toggleable-tag-field"
      >
        <!-- the data-tag should be moved to the renderless component -->
        <li
          v-for="(editor, index) in editors"
          :key="editor.name"
          class="f-toggleable-tag-field__tag"
        >
          <input
            :id="'editor'+index"
            v-model="editor.inInstitution"
            :value="editor.inInstitution"
            type="checkbox"
            class="sr-only f-toggleable-tag-field__checkbox"
          >
          <label
            :for="'editor'+index"
            class="f-toggleable-tag-field__label"
          >
            {{ editor.name }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      authors: [
        {
          name: 'João Marques',
          inInstitution: undefined
        },
        {
          name: 'David Martinho',
          inInstitution: undefined
        }
      ],
      editors: [
        {
          name: 'João Marques',
          inInstitution: undefined
        },
        {
          name: 'David Martinho',
          inInstitution: undefined
        }
      ]
    }
  }
}
</script>
