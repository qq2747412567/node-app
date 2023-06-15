<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
                    mode="vertical"
                    background-color="#324057"
                    text-color="#fff"
                    active-text-color="#409eff"
                    class="el-menu-vertical-demo">
                <router-link to="/Tinfoshow">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </router-link>


                <router-link to="/Audit">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">立项审核</span>
                    </el-menu-item>
                </router-link>

                <router-link to="/MAudit">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">中期审核</span>
                    </el-menu-item>
                </router-link>

                <router-link to="/EAudit">
                    <el-menu-item index="0">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">结项审核</span>
                    </el-menu-item>
                </router-link>



            </el-menu>
        </el-col>
    </el-row>
</template>
<script>

</script>
<style scoped>
    .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
    }

    .fa-margin {
        margin-right: 5px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }
    .el-menu-vertical-demo {
        width: 35px;
    }
    .el-submenu .el-menu-item {
        min-width: 180px;
    }


    a {
        text-decoration: none;
    }
</style>
