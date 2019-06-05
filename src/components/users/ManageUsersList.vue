<template>
    <div>
        <v-card class="single-card">
            <v-container>
                <v-layout>
                    <v-flex md2>
                        <img class="image" src="http://pics3.pof.com/thumbnails/size220/1136/22/57/311935dd6-93d4-46f0-beda-2c9b5a1d1b06.jpg" style="width: 100px;height:100px;">
                    </v-flex>
                    <v-flex md9>
                        <v-layout column>
                            <v-flex class="person-name">
                                Maria Pinto
                            </v-flex>
                            <v-flex class="person-rank">
                                Rank: Administrador
                            </v-flex>
                            <v-flex class="person-id">
                                ist14214
                            </v-flex>
                            <v-flex class="person-collections">
                                Coleções:
                                <span class="single-collection">Pinturas</span>
                                <span class="single-collection">Esculturas</span>
                                <span class="single-collection">Máquinas</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex md1>
                        <v-layout column align-center justify-center>
                            <v-flex md6>
                                <v-icon large>edit</v-icon>
                            </v-flex>
                            <v-flex md6>
                                <v-icon large>delete_forever</v-icon>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ManageUsersList'
}
</script>

<style scoped>

.single-card {
    margin: 10px 40px 10px 40px;
}

.single-card:hover {
    padding: 5px;
}

.image {
    box-shadow:0px 0px 4px -2px #000;
    border-radius: 50%;
}

.person-name {
    font-family: Raleway;
    font-size: 20px;
}

.person-rank {
    font-family: Raleway;
}

.person-id {
    font-family: Raleway;
    font-size: 16px;
}

.person-collections {
    font-family: Raleway;
    margin-top: 10px;
    font-size: 16px;
}

.single-collection {
    margin-left: 8px;
    margin-right: 0;
    background-color: #41a1e6;
    border-radius: 20%;
    padding: 5px;
    font-weight: bold;
}
</style>
