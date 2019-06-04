<template>
    <div>
        <v-layout justify-center>
            <v-flex sm5 md3 style="font-size: 20px; margin: 20px 0 10px 0;">
                List of logs in database
            </v-flex>
        </v-layout>
        <LogsList/>
    </div>
</template>

<script>
import LogsList from '@/components/logs/LogsList.vue'

export default {
    name: 'Logs',
    components: {
        LogsList
    }
}
</script>
