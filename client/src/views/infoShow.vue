<template>
    <div class="infoshow">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span='16'>
                <div class="userinfo">
                    <div class="user-item">
                        <i class="fa fa-user"></i>
                        <span>姓名:{{user.name}}</span>
                    </div>
                    <div class="user-item">
                        <i class="fa fa-user"></i>
                        <span>学院:{{user.memberschool}}</span>
                    </div>

                    <div class="user-item">
                        <i class="fa fa-cog"></i>
                        <span>身份:{{user.identity = 'student' ? '学生' : '教师'}}</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "infoshow",
        computed: {
            user() {
                return this.$store.getters.user;
            }
        }
    };
</script>
<style scoped>
    .infoshow {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        /* padding: 16px; */
    }
    .row-bg {
        width: 100%;
        height: 100%;
    }

    .user img {
        width: 150px;
        border-radius: 50%;
    }
    .user span {
        display: block;
        text-align: center;
        margin-top: 20px;
        font-size: 20px;
        font-weight: bold;
    }
    .userinfo {
        height: 100%;
        background-color: #eee;
    }
    .user-item {
        position: relative;
        top: 30%;
        padding: 26px;
        font-size: 28px;
        color: #333;
    }
</style>
