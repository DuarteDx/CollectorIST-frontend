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
                        title: 'COLEÇÕES',
                        path: '/collections',
                        index: 2
                    },
                    {
                        title: 'INSERIR',
                        path: '/insert',
                        index: 3
                    },
                    {
                        title: 'LOGIN',
                        path: '/login',
                        index: 4
                    },
                    {
                        title: 'USERS',
                        path: '/users',
                        index: 5
                    },
                    {
                        title: 'LOGS',
                        path: '/logs',
                        index: 6
                    }
                ],
                currentMenuOnDisplay: 1
            }
        },
        methods: {
            changeUnderlining(newIndex) {
                this.currentMenuOnDisplay = newIndex
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
