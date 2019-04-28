<template>
	<div :class="$vuetify.breakpoint.smAndDown ? 'align-items--center display--flex--column' : ''" class=" header--container background--primary display--flex justify-space-between">
		<!--Logo-->
		<router-link :to="logo.path" :class="$vuetify.breakpoint.smAndDown ? 'horizontal-center' : 'ml-5'">
            <img src="@/assets/images/logo-tecnico.svg" alt="LOGO" class="height--60 vertical--center">
        </router-link>

		<!--Items-->
        <ul :class="{'horizontal-center py-3' : $vuetify.breakpoint.smAndDown}" class="text--ar-hel-ss display--flex vertical--center display--no-bullets px-0">
            <router-link v-for="item in navBarItems" :key="item.title" :to="item.path" tag="li" :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'mr-5'" class="pa-0 font--bold text--white text--no-decoration display-cursor--pointer" @click.native="changeUnderlining(item.index)">{{ item.title }}</router-link>
		</ul>
      
	</div>
</template>

<script>
	export default {
        name: 'Navbar',
        props: {
            
        },
        data() {
            return {
                logo: {
                    path: '/',
                    src: ''//'@/assets/images/navLogo.png' --> where?
                },
                navBarItems: [
                    {
                        title: 'COLEÇÕES',
                        path: '/',
                        index: 1
                    },
                    {
                        title: 'OBRAS',
                        path: '/obras',
                        index: 2
                    },
                    {
                        title: 'AUTORES',
                        path: '/autores',
                        index: 3
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