<template>
    <div>
        <v-card v-for="user in usersList" v-bind:key="user._id" class="single-user">
            <v-layout align-center>
                <v-flex sm11 md11>
                    <v-layout wrap>
                    <template v-for="(value, key) in user">
                        <v-flex sm1 md1 offset-sm1 offset-md1 v-bind:key="key">
                            <p>{{ key }}</p>
                        </v-flex>
                        <v-flex sm10 md10 v-bind:key="value + 1">
                            <p>{{ value }}</p>
                        </v-flex>
                    </template>
                </v-layout>
                </v-flex>

                <v-flex md1 style="font-size: 25px;">
                    <font-awesome-icon @click.stop="deleteUser(user._id)" icon="trash" style="cursor: pointer;"/>
                </v-flex>
            </v-layout>
        </v-card>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
    name: 'UsersList',
    data() {
        return {
            usersList: []
        }
    },
    methods: {
        async fetchListOfUsers() {
            const response = await api().get('/users/all')
            this.usersList = response.data
            console.log(response)
        },
        async deleteUser(userId) {
            if(this.confirmDeletion()){
                console.log(userId)
                const response = await api().delete('/users', {data: {
                    _id: userId
                }})
                console.log(response)
                var deletedIndex = this.usersList.findIndex(x => x._id == userId)
                this.usersList.splice(deletedIndex, 1)
                console.log(deletedIndex)
            }
        },
        confirmDeletion() {
            if (confirm('Tem a certeza que pretende apagar este utilizador?')) {
                    return true
                } else {
                    return false
                }
        }
    },
    created() {
        this.fetchListOfUsers()
    }
}
</script>

<style>

    .single-user {
        margin: 10px 40px 10px 40px;
    }

    .single-user:hover {
        padding: 5px;
    }

</style>
