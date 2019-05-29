<template>
    <div>
        <InsertSingleAsset/>
		<InsertSingleCollection/>
    </div>
</template>

<script>

import InsertSingleAsset from '@/components/forms/InsertSingleAsset'
import InsertSingleCollection from '@/components/forms/InsertSingleCollection'

export default {
	name: 'Insert',
	components: {
		InsertSingleAsset,
		InsertSingleCollection
	}
}
</script>