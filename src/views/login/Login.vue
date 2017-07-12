<template>
    <div>{{msg}}</div>
</template>
<script>
    export default{
        data () {
            return {
                msg: ''
            };
        },
        created () {
            this.login();
        },
        methods: {
            login () {
                this.$store.dispatch('login', {
                    qs: {
                        userName: '123'
                    }
                }).then(response => {
                    this.msg = response.data.msg;
                }).catch(response => {
//                    debugger;
//                    console.log(response);
                });
            }
        }
    }
    ;
</script>
