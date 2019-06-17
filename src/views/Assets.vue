<template>
    <div>
        <SearchBar/>
        <AssetsList/>
        <!--<v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of assets in database
            </v-flex>
        </v-layout>-->
    </div>
</template>

<script>

import AssetsList from '@/components/assets/search/AssetsList'
import SearchBar from '@/components/assets/search/SearchBar'

export default {
	name: 'Assets',
	components: {
        AssetsList,
        SearchBar
	}
}
</script>
