<template>
    <div>
        <v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of assets in database
            </v-flex>
        </v-layout>
        <AssetsList/>
    </div>
</template>

<script>

import AssetsList from '@/components/assets/search/AssetsList'

export default {
	name: 'Assets',
	components: {
		AssetsList
	}
}
</script>
