<template>
  <article
    class="card-row record"
  >
    <div class="card-row__text">
      <p class="small record__item-type">
        {{ record.template }}
      </p>
      <h1 class="h4 record__item-title">
        <router-link
          :to="{ name: 'RecordPage', params: { id: record.metadata.id } }"
          class="record__item-title__link"
        >
          {{ record.title }}
        </router-link>
      </h1>
      <div class="record__item-publishing-data">
        <p class="record__item-academic-journal">
          {{ record.journal }}
        </p>
        <p>
          <span class="record__item-publication-date">{{ record.year }}</span>
          <span
            v-if="record.authors"
            class="record__item-authors"
          >
            <template v-if="record.authors.length <= 2">
              <template v-for="(author , index) in record.authors">
                <span :key="author.id || author.name">
                  <router-link
                    v-if="author.id"
                    :to="{ name: 'ResearcherPage', params: { userId: author.id } }"
                    class="record__item-author"
                  >{{ author.name }}
                  </router-link>
                  <template v-else>{{ author.name }}</template>
                  <template v-if="index < (record.authors.length - 1)">, </template>
                </span>
              </template>
            </template>
            <template v-else>
              <router-link
                :to="{ name: 'ResearcherPage', params: { userId: record.authors[0].id } }"
                class="record__item-author"
              >
                {{ record.authors[0].name }}
              </router-link>,
              <router-link
                :to="{ name: 'RecordPage', params: { id: record.id } }"
                class="record__item-author"
              >
                et al.
              </router-link>
            </template>
          </span>
        </p>
      </div>
      <!-- <ul class="list-records__actions-list">
                <li class="list-records__actions-list__item">
                  <a
                    :href="record.downloadSrc"
                    class="link small"
                    target="_blank">Download</a>
                </li>
                <li class="list-records__actions-list__item">
                  <button class="small link list-records__actions-list__item">
                    Cite
                  </button>
                </li>
              </ul> -->
    </div>
    <div
      v-if="editable"
      class="card-row__meta card-row__meta--align-start"
    >
      <dropdown>
        <button
          slot="dropdown-trigger"
          class="i-ellipsis"
          aria-label="More options"
          aria-haspopup="true"
          aria-expanded="false"
          @click.prevent=""
        />
        <template slot="dropdown-panel">
          <ul class="dropdown-menu dropdown--xs">
            <li class="dropdown-menu__item">
              <button
                class="dropdown-menu__link"
                @click.prevent=""
              >
                Editar
              </button>
            </li>
            <li class="dropdown-menu__item">
              <button
                class="dropdown-menu__link u-text-danger"
                @click="'/'"
              >
                Remover
              </button>
            </li>
          </ul>
        </template>
      </dropdown>
    </div>
  </article>
</template>

<script>
import Dropdown from '@/components/utils/Dropdown'

export default {
  components: {
    Dropdown
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";
.record__item-type{
  text-transform: capitalize;
}
.record__item-title{
  margin-top: .5rem;
  margin-bottom: 0;
  position: relative;
}
.record__item-title__link{
  cursor: pointer;
  color: $dark;
  &:before{
    content: '';
    position: absolute;
    cursor: pointer;
    padding-top: 2rem;
    top: -2rem;
    bottom: 0;
    left: 0;
    right: 0;
    //background-color: rgba($blue, .4);
  }
}
.record__item-academic-journal{
  color: $gray;
  line-height: 1.2;
}
.record__item-author{
    color: $slate;
}
.record__item-publishing-data{
  p{
    margin: .25rem 0;
  }
}
</style>
