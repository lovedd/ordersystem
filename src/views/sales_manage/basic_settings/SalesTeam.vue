<template>
    <div>
        <div v-for="item in list">{{item.name}}</div>
    </div>
</template>
<script>
    import {queryTeamList} from 'api/salesTeam';

    export default{
        data () {
            return {
                list: []
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList (params) {
                queryTeamList().then(response => {
                    this.list = response.data.list;
                });
            }
        }
    };
</script>
