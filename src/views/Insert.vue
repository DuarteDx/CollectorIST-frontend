<template>
    <div>
        <InsertSingleAsset/>
		<InsertSingleCollection/>
    </div>
</template>

<script>

import InsertSingleAsset from '@/components/assets/insertion/InsertSingleAsset'
import InsertSingleCollection from '@/components/collections/insertion/InsertSingleCollection'

export default {
	name: 'Insert',
	components: {
		InsertSingleAsset,
		InsertSingleCollection
	}
}
</script>