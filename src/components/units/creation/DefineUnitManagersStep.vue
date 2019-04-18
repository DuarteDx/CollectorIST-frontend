<template>
  <div class="define-unit-managers-step">
    <header class="layout-wizard__header">
      <h1>Gestores de Unidade</h1>
      <p>Lista de utilizadores que poderão gerir a unidade. Os gestores têm a capacidade de aceitar e recusar pedidos de afiliação.</p>
    </header>
    <section>
      <div>
        <div
          v-for="manager in value"
          :key="manager.id"
        >
          <avatar
            :src="manager.avatar+'?d=mp'"
            :name="manager.name"
            class="card-row__figure list-users__avatar"
          />
          <div class="card-row__text">
            <h1 class="card-row__title h5--ssp manager-name">
              <router-link
                :to="{name: 'AdministrateUserPage', params: { userId: manager.id }}"
                class="card-row__link"
              >
                {{ manager.name }}
              </router-link>
            </h1>
            <p>{{ manager.username }}</p>
          </div>
          <div class="card-row__meta">
            <dropdown>
              <i
                slot="dropdown-trigger"
                class="i-ellipsis"
                aria-label="More options"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <ul
                slot="dropdown-panel"
                class="dropdown-menu"
              >
                <li class="dropdown-menu__item">
                  <a
                    href
                    class="dropdown-menu__link u-text-danger"
                    @click.prevent="removeManager(manager)"
                  >
                    Remover
                  </a>
                </li>
              </ul>
            </dropdown>
          </div>
        </div>
        <div>
          <div class="card-row__text">
            <div class="f-search">
              <button class="f-search__submit">
                {{ $t('Search') }}
              </button>
              <input
                ref="searchuser"
                v-model="searchUsersQuery"
                placeholder="Procurar Unidade"
                type="search"
                autofocus="true"
                class="f-search__input f-search__input--card"
                @focus="openSearchSuggestions"
                @keydown.down="focusOn(0)"
              >
              <transition
                name="f-search-fade-down"
                mode="in-out"
              >
                <ul
                  v-if="searchUsersIsOpen"
                  class="f-search__dropdown f-search__dropdown--scrollable card"
                >
                  <template
                    v-if="searchUsersSuggestions && searchUsersSuggestions.length > 0"
                  >
                    <li
                      v-for="(user, index) in searchUsersSuggestions"
                      :key="user.id"
                      class="f-search__dropdown__item card-row"
                    >
                      <avatar
                        :name="user.name"
                        :src="user.avatar+'?d=mp'"
                        class="card-row__figure"
                      />
                      <div class="card-row__text">
                        <h1 class="card-row__title h5--ssp unit-name">
                          <a
                            :ref="'userSearchIndex' + index"
                            href
                            class="card-row__link"
                            @click.prevent="addManager(user)"
                            @keydown.enter="addManager(user)"
                            @keydown.down="focusOn(index + 1)"
                            @keydown.up="focusOn(index - 1)"
                          >
                            {{ user.name }}
                          </a>
                        </h1>
                        <p>{{ user.username }}</p>
                      </div>
                    </li>
                  </template>
                  <template v-else>
                    <li
                      class="f-search__dropdown__item card-row"
                    >
                      <div class="card-row__text">
                        <h1 class="card-row__title h5--ssp unit-name">
                          <p class="card-row__link">
                            No Suggestions
                          </p>
                        </h1>
                      </div>
                    </li>
                  </template>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Avatar from '@/components/utils/Avatar'
import UsersAPI from '@/api/users'

export default {
  components: {
    Avatar
  },
  props: {
    value: {
      type: Array,
      required: true,
      default: undefined
    }
  },
  data () {
    return {
      searchUsersIsOpen: false,
      searchUsersQuery: undefined,
      searchUsersSuggestions: [],
      searchCurrentUserRef: undefined
    }
  },
  watch: {
    async searchUsersQuery (newValue, oldValue) {
      if (newValue.length >= 3) {
        const { usersPage } = await UsersAPI.list({ q: this.searchUsersQuery, page: 1, perPage: 5 })
        this.searchUsersSuggestions = usersPage.items
      }
    }
  },
  mounted () {
    this.$refs['searchuser'].focus()
  },
  methods: {
    openSearchSuggestions () {
      this.searchUsersIsOpen = true
    },
    closeSearchSuggestions () {
      this.searchUsersIsOpen = false
    },
    addManager (manager) {
      if (this.value.filter(u => u.id === manager.id).length === 0) {
        this.$emit('input', this.value.filter(u => u.id !== manager.id).concat([manager]))
      }
    },
    removeManager (manager) {
      this.$emit('input', this.value.filter(u => u.id !== manager.id))
    },
    focusOn (index) {
      if (index === -1) {
        this.$refs['searchuser'].focus()
      }
      if (this.$refs['userSearchIndex' + index]) {
        this.$refs['userSearchIndex' + index][0].focus()
      }
    }
  }
}
</script>
