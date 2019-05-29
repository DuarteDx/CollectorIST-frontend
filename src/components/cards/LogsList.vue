<template>
    <div>
        <v-card v-for="log in logsList" v-bind:key="log._id" class="single-log">
                <v-layout align-center>

                    <v-flex sm11 md11>
                        <router-link :to="'logs/' + log._id" class="single-log-link">
                            <v-layout wrap>
                                <template v-for="(value, key) in log">
                                    <v-flex sm1 md1 offset-sm1 offset-md1 v-bind:key="key">
                                        <p>{{ key }}</p>
                                    </v-flex>
                                    <v-flex sm10 md10 v-bind:key="value">
                                        <p>{{ value }}</p>
                                    </v-flex>
                                </template>
                            </v-layout>
                        </router-link>
                    </v-flex>

                </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'LogsList',
    data() {
        return {
            logsList: []
        }
    },
    methods: {
        async fetchListOfLogs() {
            const response = await api().get('/logs')
            response.data.reverse()
            this.logsList = response.data
        },
        async deleteLog(logId) {
            if(this.confirmDeletion()){
                console.log(logId)
                const response = await api().delete('/logs', {data: {
                    id: logId
                }})
                console.log(response)
                var deletedIndex = this.logsList.findIndex(x => x._id == logId)
                this.logsList.splice(deletedIndex, 1)
                console.log(deletedIndex)
            }
        },
        confirmDeletion() {
            if (confirm('Tem a certeza que pretende apagar este log?')) {
                    return true
                } else {
                    return false
                }
            }
    },
    created() {
        this.fetchListOfLogs()
    }
}
</script>

<style>

    .single-log {
        margin: 10px 40px 10px 40px;
    }

    .single-log:hover {
        padding: 5px;
    }

    .single-log-link {
        text-decoration: none;
        color: black;
    }

</style>