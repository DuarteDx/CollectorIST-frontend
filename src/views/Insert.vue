<template>
    <div>
        <InsertSingleAsset/>
		<InsertSingleCollection/>
		<UploadCategoriesFile/>
    </div>
</template>

<script>

import InsertSingleAsset from '@/components/assets/insertion/InsertSingleAsset'
import InsertSingleCollection from '@/components/collections/insertion/InsertSingleCollection'
import UploadCategoriesFile from '@/components/categories/insertion/UploadCategoriesFile'

export default {
	name: 'Insert',
	components: {
		InsertSingleAsset,
		InsertSingleCollection,
		UploadCategoriesFile
	}
}
</script>