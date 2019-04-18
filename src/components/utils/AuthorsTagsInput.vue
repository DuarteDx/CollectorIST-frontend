<template>
  <renderless-tags-input
    :value="value"
    :tags-limit="200"
    :allow-duplicates="false"
    :add-tag-keys="['13']"
    @input="(tags) => { $emit('input', tags) }"
  >
    <div
      slot-scope="{ tags, tagsLimit, removeSpecificTag, inputAttrs, inputEvents, tagEvents }"
      class="f-tag-field"
    >
      <!-- the data-tag should be moved to the renderless component -->
      <div
        v-for="tag in tags"
        :key="tag"
        :data-tag="tag"
        draggable="true"
        class="f-tag-field__tag"
        v-on="tagEvents"
      >
        <span>
          {{ tag }}
        </span>
        <button
          type="button"
          class="f-tag-field__tag-remove"
          aria-label="Remove"
          @click="removeSpecificTag(tag)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            class="icon icon-close"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke-width="1.16667"
              transform="translate(.33333 .33333)"
            >
              <circle
                cx="6.66667"
                cy="6.66667"
                r="6.08333"
                class="circle--stroke"
                stroke="#C9CDD4"
                fill="transparent"
              />
              <path
                class="cross--stroke"
                stroke="#8F95A1"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.70588 4.70588l3.88216 3.88216m0-3.88216L4.70588 8.58804"
              />
            </g>
          </svg>
        </button>
      </div>
      <input
        id="authors"
        ref="autors"
        :disabled="!(tagsLimit && tags.length < tagsLimit)"
        v-bind="inputAttrs"
        :placeholder="$t('fields.authors.label')"
        autofocus="true"
        type="text"
        class="f-tag-field__input"
        v-on="inputEvents"
      >
      <label
        for="authors"
        class="sr-only f-tag-field__label"
      >{{ $t('fields.authors.label') }}</label>
      <transition name="validation-fade">
        <p
          v-if="tagsLimit && tags.length === tagsLimit"
          class="f-field__validation u-text-danger"
        >
          You reached the author limit.
        </p>
      </transition>
    </div>
  </renderless-tags-input>
</template>

<script>
import RenderlessTagsInput from '@/components/utils/RenderlessTagsInput'

export default {
  components: {
    RenderlessTagsInput
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
