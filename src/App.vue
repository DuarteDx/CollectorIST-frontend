<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view/>
    </v-content>
	<Footer/>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
	HelloWorld,
	Navbar,
	Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
@import "/assets/styles/index";
</style>

