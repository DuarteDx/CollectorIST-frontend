<template>
    <div>
        <!--<v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of collections in database
            </v-flex>
        </v-layout>-->
        <SearchBar/>
        <CollectionsList/>
    </div>
</template>

<script>
import CollectionsList from '@/components/collections/search/CollectionsList'
import SearchBar from '@/components/collections/search/SearchBar'

export default {
	name: 'Collections',
	components: {
        CollectionsList,
        SearchBar
	}
}
</script>