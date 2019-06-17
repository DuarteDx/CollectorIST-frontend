<template>
    <div>
        <v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of categories in database
            </v-flex>
        </v-layout>
        <CategoriesList/>
    </div>
</template>

<script>
import CategoriesList from '@/components/categories/search/CategoriesList'

export default {
	name: 'Categories',
	components: {
        CategoriesList
	}
}
</script>