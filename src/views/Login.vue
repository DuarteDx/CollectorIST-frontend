<template>
    <AuthComponent/>
</template>

<script>
import LoginComponent from '@/components/users/LoginComponent.vue'
import AuthComponent from '@/components/users/AuthComponent.vue'

export default {
    name: 'Login',
    components: {
        LoginComponent,
        AuthComponent
    }
}
</script>
