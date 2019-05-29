<template>
    <v-app>
        <AssetGlobal/>
        <AssetSpecific/>
    </v-app>
</template>

<script>
import AssetGlobal from '@/components/asset/AssetGlobal'
import AssetSpecific from '@/components/asset/AssetSpecific'

export default {
    name: 'Asset',
    components: {
        AssetGlobal,
        AssetSpecific
    }
}
</script>
