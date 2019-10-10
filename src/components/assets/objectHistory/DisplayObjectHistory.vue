<template>
    <v-layout wrap style="background-color: #a13d3d4f;">
        <h1 style="color: red;">Object History</h1>
        <v-flex xs12 md12>
            <!--History-->
            <v-layout align-center justify-start row wrap>
                <v-flex md6 class="category-name">
                    <span class="ml"> Data início:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectHistory" md6 class="category-data">
                    <span class="ml">{{asset.ObjectHistory.initial}}</span>
                </v-flex>
                <v-flex md6 class="category-name">
                    <span class="ml"> Data fim:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectHistory" md6 class="category-data">
                    <span class="ml">{{asset.ObjectHistory.end}}</span>
                </v-flex>
                <v-flex md6 class="category-name">
                    <span class="ml"> Local:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectHistory" md6 class="category-data">
                    <span class="ml">{{asset.ObjectHistory.local}}</span>
                </v-flex>
                <v-flex md6 class="category-name">
                    <span class="ml"> Atividade:</span> 
                </v-flex>
                <v-flex v-if="asset.ObjectHistory" md6 class="category-data">
                    <span class="ml">{{asset.ObjectHistory.activity}}</span>
                </v-flex>
                <v-flex v-if="!asset.ObjectHistory" md6 class="category-data"><i class="ml">Esta peça não pertence a nenhuma coleção</i></v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    name: 'DisplayObjectHistory',
    props: ['asset'],
    data() {
        return {

        }
    },
    methods: {

    },
    created() {

    }
}
</script>

<style scoped>

</style>

