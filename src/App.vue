<template> 
	<div id="app">
		<Navbar/>
		<div class="main-content">
			<router-view/>
		</div>
		<Footer class="footer"/>
	</div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
	name: 'App',
	components: {
		Navbar,
		Footer
	}
}
</script>

<style>

	html, body {
		height: 100%;
	}

	#app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.main-content {
		flex: 1 0 auto;
		padding-bottom: 60px;
	}

	.footer {
		flex-shrink: 0 !important;
		padding: 20px;
		flex: 0 !important;
	}

</style>
