<template>
    <div>
        <!-- MODULE NAME -->
        <v-layout align-center justify-start row fill-height @click="active = !active" class="pointer">
            <v-flex sm2 md2>
                <v-icon v-if="!active" large>keyboard_arrow_right</v-icon>
                <v-icon v-if="active" large>keyboard_arrow_down</v-icon>
            </v-flex>
            <v-flex sm10 md10>
                <span>Localização</span>
            </v-flex>
        </v-layout>
        <!-- MODULE SEARCH INPUTS -->
        <v-layout v-if="active">
            
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'SearchObjectLocation',
    props: ['modules'],
    data() {
        return {
            active: false
        }
    },
    created() {

    }
}
</script>

<style scoped>

    .pointer {
        cursor: pointer;
    }

</style>
