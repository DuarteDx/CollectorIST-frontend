<template>
	<v-toolbar app>

        <v-toolbar-title class="headline text-uppercase">
            <router-link :to="navBarItems[0].path" @click.native="currentMenuOnDisplay = 1">
                <img class="logo-ist" src="@/assets/images/logo-tecnico.svg" alt="Logo IST">
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link v-for="navItem in navBarItems" :to="navItem.path" v-bind:key='navItem.index' 
        class="navItem" @click.native="changeUnderlining(navItem.index)" 
        v-bind:class="{ selected: navItem.index == currentMenuOnDisplay }">

            {{ navItem.title}}

        </router-link>
        
    </v-toolbar>
</template>

<script>
import Credentials from '@/assets/scripts/login.js'

	export default {
        name: 'Navbar',
        data() {
            return {
                navBarItems: [
                    {
                        title: 'PEÇAS',
                        path: '/assets',
                        index: 1
                    },
                    {
                        title: 'CONFIGURAR',
                        path: '/config',
                        index: 2
                    },
                    {
                        title: 'UTILIZADORES',
                        path: '/users/manage',
                        index: 3
                    },
                    {
                        title: 'LOGOUT',
                        path: '/logout',
                        index: 4
                    }
                ],
                currentMenuOnDisplay: 1
            }
        },
        methods: {
            changeUnderlining(newIndex) {
                this.currentMenuOnDisplay = newIndex
            },
            sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms))
            }
        },
        async created() {
            // Wait until frontend has token before checking if user is admin
            while(await Credentials.checkIfAdmin() === '403 Forbidden!') {
                await this.sleep(15)
            }
            // Remove admin paths if user is not admin (after waiting for token)
            if(!await Credentials.checkIfAdmin()) {
                this.navBarItems.splice(1, 2)
            }
        }
    }
</script>

<style scoped>

    .logo-ist {
        width: 100px;
        margin-top: 11px;
    }

    .navItem {
        margin-right: 25px;
        text-decoration: none;
        color: black;
    }

    .selected {
        color: grey;
    }

</style>
