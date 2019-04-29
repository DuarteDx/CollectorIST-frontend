<template>
    <div>
        SEARCH VIEW!
        <SingleAsset/>
    </div>
</template>

<script>

import SingleAsset from '@/components/cards/SingleAsset'

export default {
	name: 'Search',
	components: {
		SingleAsset
	}
}
</script>

<style scoped>

    .card {
        margin: 10px 40px 10px 40px;
    }

</style>
