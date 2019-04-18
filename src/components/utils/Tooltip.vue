<template>
  <div class="tooltip">
    <slot name="hoverTrigger" />
    <div class="tooltip__panel">
      <slot name="hoverPanel" />
    </div>
    <!-- <span
      v-if="record.authors"
      class="list-records__item-authors">
      <template v-if="record.authors.length > 2">
        <span>{{ record.authors[0].name }}</span>,
        <tooltip>
          <span slot="hoverTrigger">et al.</span>
          <ul slot="hoverPanel">
            <li
              v-for="author in record.authors"
              :key="author.name">
              <router-link
                :to="{ name: 'ResearcherPage', params: { userId: author.id } }">
                {{ author.name }}
              </router-link>
            </li>
          </ul>
        </tooltip>
      </template>
      <template v-else>
        <template
          v-for="(author , index) in record.authors">
          <span :key="author.name">
            <router-link
              :to="{ name: 'ResearcherPage', params: { username: author.id } }">
              {{ author.name }}
            </router-link>
            <span v-if="index < (record.authors.length - 1)">, </span>
          </span>
        </template>
      </template>
    </span> -->
  </div>
</template>

<script>
export default {
  name: 'Tooltip'
}
</script>
<style lang="scss">
@import '@/assets/scss/_variables.scss';
.tooltip{
  position: relative;
  cursor: pointer;
  display: inline;
}
.tooltip__panel{
  position: absolute;
  background-color: $dark;
  color: white;
  max-width: 10rem;
  padding: .25rem .75rem;
  border-radius: .25rem;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease;
  transform: translateY(1.2em);
  left: 0;
  top: 0;
  white-space:nowrap;
}
.tooltip:hover .tooltip__panel{
  visibility: visible;
  opacity: 1;
  pointer-events: all;
}
</style>
