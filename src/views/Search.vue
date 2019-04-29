<template>
    <div>
        <v-layout justify-center>
            <v-flex md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of assets in database
            </v-flex>
        </v-layout>
        <SingleAsset/>
    </div>
</template>

<script>

import SingleAsset from '@/components/cards/AssetsList'

export default {
	name: 'Search',
	components: {
		SingleAsset
	}
}
</script>
