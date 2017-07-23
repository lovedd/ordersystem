/**
* 侧栏导航组件
*/

<template>
    <div class="container">
        <el-menu :default-active="$route.path" :router="true" mode="horizontal">
            <div class='tabs-view-container'>
                <router-link class="tabs-view" v-for="(tag,index) in visitedViews" :to="tag.path" :key="tag.path">
                    <el-tag :type="tag.path == $route.path?'':'gray'" :closable="index==0?false:true"
                            @close='closeViewTabs(tag,index,$event)'>
                        {{tag.name}}
                    </el-tag>
                </router-link>
            </div>
            <!--<el-menu-item index="/campus-manage">地址管理</el-menu-item>-->
            <!--<el-menu-item index="/classroom-manage">销售员管理</el-menu-item>-->
            <!--<el-menu-item index="/role-manage">角色管理</el-menu-item>-->
            <!--<el-menu-item index="/teacher-manage">客户管理</el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                visitedViews: [
                    {name: '欢迎页', path: '/welcome/welcome'}
//        {name: '销售员管理', path: '/classroom-manage'},
//        {name: '角色管理', path: '/role-manage'}
                ]
            };
//    let active = window.sessionStorage.defaultActive || '/campus-manage'
//
//    return {
//      defaultActive: active
//    }
        },
        watch: {
            $route () {
//                debugger;
                this.addViewTabs();
            }
        },
        created () {
            if (this.$store.state.route.name !== '欢迎页') {
                let view = {};
                view.path = this.$store.state.route.path;
                view.name = this.$store.state.route.name;
                this.visitedViews.push(view);
            }
        },
        methods: {
//    onSelected (index) {
//      window.sessionStorage.defaultActive = index
//      this.defaultActive = window.sessionStorage.defaultActive
//    }
            addViewTabs () {
                let view = {};
                view.path = this.$store.state.route.path;
                view.name = this.$store.state.route.name;
                if (this.visitedViews.some(item => item.path === view.path)) {
                    return;
                }
                this.visitedViews.push(view);
            },
            closeViewTabs (view, index, $event) {
                let len = this.visitedViews.length;
//      console.log($index)
//      let index = this.visitedViews.indexOf(view)
//      let index = $index
                this.visitedViews.splice(index, 1);
                console.log(this.$store.state.route.path);
                if (view.path === this.$store.state.route.path) {
                    if (len - 1 === index) {
                        let path = this.visitedViews[index - 1].path;
                        this.$router.push({path: path});
                    } else {
                        let path = this.visitedViews[index].path;
                        this.$router.push({path: path});
                    }
                }
                $event.preventDefault();
            }
        }
    };
</script>

<style scoped>
    .container {
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
    }
</style>
