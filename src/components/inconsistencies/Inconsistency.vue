<template>
  <article
    class="card report"
  >
    <div class="card-row">
      <div class="card-row__text">
        <p class="report__origin">
          {{ $t('by') }} <span
            v-if="inconsistency.origin !== 'form'"
            class="h5"
          >{{ $t(inconsistency.origin) }}</span><span
            v-else
            class="h5"
          >{{ inconsistency.author }}</span>
        </p>
        <p>{{ $t('in') }}: <strong>'{{ inconsistency.title }}'</strong></p>
        <p>{{ inconsistency.description }}... </p>
        <p>
          <router-link
            :to="{ name: 'ResearcherViewTaskPage', params: { taskId: inconsistency.id } }"
            class="card-row__link"
          >
            <span class="label label--sm u-text-literal">{{ inconsistency.id }}</span>
          </router-link>
        </p>
      </div>
      <div class="card-row__meta card-row__meta--align-start">
        <dropdown>
          <button
            slot="dropdown-trigger"
            class="i-ellipsis"
            aria-label="More options"
          />
          <template slot="dropdown-panel">
            <ul class="dropdown-menu dropdown--xs">
              <li class="dropdown-menu__item">
                <button
                  class="dropdown-menu__link u-text-success"
                  @click.prevent=""
                >
                  Marcar como resolvido
                </button>
              </li>
            </ul>
          </template>
        </dropdown>
      </div>
    </div>
  </article>
</template>

<script>
import Dropdown from '@/components/utils/Dropdown'
export default {
  components: {
    Dropdown
  },
  data: function () {
    return {
      inconsistency: {
        id: '2019-02-4f90d',
        origin: 'system',
        author: 'David Martinho',
        title: 'Isto é uma publicação xpto',
        description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum'
      }
    }
  }
}
</script>
