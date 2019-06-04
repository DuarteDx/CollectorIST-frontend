<template>
    <v-app>
        <AssetGlobal/>
        <AssetSpecific/>
    </v-app>
</template>

<script>
import AssetGlobal from '@/components/assets/singleAsset/AssetGlobal'
import AssetSpecific from '@/components/assets/singleAsset/AssetSpecific'

export default {
    name: 'Asset',
    components: {
        AssetGlobal,
        AssetSpecific
    }
}
</script>
