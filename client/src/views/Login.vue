<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">创新创业能力培养管理系统</span>
            </div>
            <el-form :model="loginUser" :rules="rules" class="loginForm" ref="loginForm" label-width="80px">
                <el-form-item label="电话" prop="telephone">
                    <el-input v-model="loginUser.telephone" type="number"
                              placeholder="请输入电话号码"> </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="选择身份">
                    <el-select v-model="loginUser.identity" placeholder="请选择身份">
                        <el-option label="教师" value="teacher"></el-option>
                        <el-option label="学生" value="student"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  class="submit_btn" @click="submitForm('loginForm')">登 录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>



<script>
    import jwt_decode from 'jwt-decode'

    export default {
        name: "login",
        components: {},
        data(){

            return{
                loginUser: {
                    telephone: "",
                    password: "",
                    identity: "",
                    memberschool: ""
                },
                rules:{
                    telephone: [
                        {min:11, max:11, message:'请输入11位数字号码', required: true, trigger: "blur"}
                    ],
                    password: [
                        { required: true, message: "密码不能为空", trigger: "blur" },
                        { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                    ],
                    identity:[
                        {required:true }
                    ]
                }

            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.$axios
                            .post("/api/users/login", this.loginUser)
                            .then(res => {

                                //console.log(res);
                                // token
                                const token  = res.data.token;
                                //存储到ls
                                localStorage.setItem('eleToken',token);
                                //解析token
                                const decoded = jwt_decode(token);
                                //console.log(decoded);
                                //token存储到vuex
                                this.$store.dispatch('setAutnenticated', !this.isEmpty(decoded));
                                this.$store.dispatch('setUser',decoded);

                                 //this.$router.push('/index');
                                //身份验证
                                 const identity = decoded.identity
                                 if (identity === 'teacher')
                                 { this.$router.push('/Tindex')}
                                else if (identity === 'student')
                                { this.$router.push('/index')}

                            });




                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    };

</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
        background: url(../assets/bj.jpg) no-repeat center center;
        background-size: 100% 100%;
    }
    .form_container {
        width: 370px;
        height: 210px;
        position: absolute;
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }
    .tiparea p a {
        color: #409eff;
    }
</style>