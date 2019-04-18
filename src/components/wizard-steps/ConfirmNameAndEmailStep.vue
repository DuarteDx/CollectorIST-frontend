<template>
  <div class="confirm-name-and-email-step layout-wizard__inner-container layout-wizard__inner-container--sm">
    <header class="layout-wizard__header">
      <avatar
        :name="profile.name"
        :src="profile.avatar+'?s=250&d=mp'"
      />
      <h1>{{ $t('welcome') }}</h1>
      <p>{{ $t('welcome.description') }}</p>
    </header>
    <form
      action="dsfasdf"
      method="post"
      novalidate="true"
    >
      <fieldset class="f-group">
        <!-- validation type in condition below in :class -->
        <!-- value options -->
        <!-- f-field--danger -->
        <!-- f-field--warning -->
        <!-- f-field--danger -->
        <div
          class="f-field f-field--underline"
        >
          <input
            id="name"
            v-model="name"
            :class="{'f-field__input--is-filled': name}"
            name="name"
            type="text"
            class="f-field__input"
            required=""
            autocomplete="name"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          >
          <label
            for="name"
            class="f-field__label"
          >{{ $t('name') }}</label>
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              The email provided is invalid.
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Email required.
            </p>
          </transition>
        </div>
        <!-- validation type in condition below in :class -->
        <!-- value options -->
        <!-- f-field--danger -->
        <!-- f-field--warning -->
        <!-- f-field--success -->
        <div
          class="f-field f-field--underline"
        >
          <input
            id="email"
            v-model="email"
            :class="{'f-field__input--is-filled': email}"
            name="email"
            type="text"
            class="f-field__input"
            required=""
            autocomplete="email"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          >
          <label
            for="email"
            class="f-field__label"
          >{{ $t('email') }}</label>
          <!-- validation type in condition below in :class -->
          <!-- value options -->
          <!-- f-field--success -->
          <!-- f-field--warning -->
          <!-- f-field--danger -->
          <transition name="validation-fade">
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Your name cannot contain special characters.
            </p>
            <!-- f-field--danger -->
            <p
              v-if="false"
              class="f-field__validation"
            >
              Name required.
            </p>
          </transition>
        </div>
        <!-- add .f-field--danger if error -->
        <div
          :class="{ 'f-field--success': usernameAvailable, 'f-field--danger': usernameAvailable === false, 'f-field--info': usernameAvailable === null }"
          class="f-field f-field--underline"
        >
          <input
            id="username"
            v-model="username"
            :class="{'f-field__input--is-filled': username}"
            name="username"
            type="text"
            class="f-field__input"
            required=""
            autocomplete="username"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            @blur="associateUsername()"
            @keypress.enter.prevent="associateUsername()"
          >
          <label
            for="username"
            class="f-field__label"
          >{{ $t('username') }}</label>
          <!-- validation type in condition below in :class -->
          <!-- value options -->
          <!-- f-field--success -->
          <!-- f-field--warning -->
          <!-- f-field--danger -->
          <transition name="validation-fade">
            <p
              v-if="usernameAvailable === true"
              class="f-field__validation"
            >
              {{ $t('username.is.now.yours') }}
            </p>
            <p
              v-else-if="usernameAvailable === false"
              class="f-field__validation"
            >
              {{ $t('username.unavailable') }}
            </p>
            <p
              v-else
              class="f-field__validation"
            >
              {{ $t('checking.username.availability') }}
            </p>
          </transition>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import UsernamesAPI from '@/api/usernames'
import { mapState, mapActions } from 'vuex'
import Avatar from '@/components/utils/Avatar'

export default {
  components: {
    Avatar
  },
  data () {
    return {
      name: undefined,
      email: undefined,
      username: undefined,
      usernameAvailable: true
    }
  },
  computed: {
    ...mapState({
      'profile': state => state.profile.current,
      'remoteEmails': state => state.profile.emails,
      'primaryEmailId': state => state.profile.primaryEmailId,
      'setupAccount': state => state.setupAccount
    }),
    remoteEmail () {
      if (this.remoteEmails && this.primaryEmailId) {
        return this.remoteEmails.find(e => e.id === this.primaryEmailId).email
      }
      return null
    }
  },
  async created () {
    try {
      await this.fetchEmails()
    } catch (error) {
      // TODO
    }
    if (this.profile) {
      this.name = this.profile.name
      this.username = this.profile.username
    }
    if (this.remoteEmails && this.primaryEmailId) {
      this.email = this.remoteEmail
    }
    this.validateForm()
  },
  beforeDestroy () {
    this.updateName({ name: this.name })
    if (this.email.trim() !== this.remoteEmail) {
      this.updateEmail({ email: this.email })
    }
    this.updateUsername({ username: this.username })
  },
  methods: {
    ...mapActions({
      'fetchEmails': 'profile/fetchEmails',
      'updateName': 'setupAccount/updateName',
      'updateEmail': 'setupAccount/updateEmail',
      'updateCanClickNext': 'setupAccount/updateCanClickNext',
      'updateUsername': 'setupAccount/updateUsername'
    }),
    async associateUsername () {
      this.usernameAvailable = null
      const response = await UsernamesAPI.associateUsername({ username: this.username })
      if (response.ok) {
        this.usernameAvailable = true
        this.validateForm()
      } else {
        this.usernameAvailable = false
      }
    },
    validateForm () {
      this.updateCanClickNext({ canClickNext: true })
    }
  }
}
</script>
<style lang="scss">
.confirm-name-and-email-step{
  .layout-wizard__header{
    .figure{
      width: 9.25rem;
      height: 9.25rem;
    }
  }
}
</style>
